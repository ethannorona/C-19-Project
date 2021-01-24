var bird, birdImg;

var pipe1, pipe2, pipeImg1, pipeImg2;

var invisible;

var invpoint;

var back, backImg;

var score = 0;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload(){

  birdImg = loadImage("bird.png");
  pipeImg1 = loadImage("pipe1.png");
  pipeImg2 = loadImage("pipe2.png");
  backImg = loadImage("background.png");
  
}

function setup() {
 createCanvas(600, 600);
  
  back = createSprite(300, 300);
  back.addImage(backImg);
  back.velocityX = -(3 + score/5);
  back.scale = 1.3;
  back.depth = back.depth - 3;
  
  bird = createSprite(300, 200);
  bird.addImage(birdImg);
  bird.velocityY = 6;
  bird.scale = 0.3;
  bird.setCollider("circle", 0, -90, 32);
  
  invisible = createSprite(300, 645, 600, 1);
  invisible.visible = false;
  
  pipesG = new Group();
  invpointG = new Group();
}

function draw() {
 background("lightBlue");
  
  //bird.debug = true;
  
  if(gameState === PLAY){
    if(frameCount % 100 === 0){
      pipes();
      invpoints();
    }

    if(bird.isTouching(invpointG)){
      score = score + 1;
    }
    
    if(back.x < 200){
      back.x = back.width/2;
    }
    
    if(bird.collide(invisible)){
     gameState = END;
    }
    
    if(bird.isTouching(pipesG)){
      gameState = END;
    }
    
    if(keyDown("space")){
      bird.y = bird.y - 25;
    }
  }
  
  if(gameState === END){
    bird.velocityY = 0;
    back.velocityX = 0;
    pipesG.setVelocityXEach(0);
    invpointG.setVelocityXEach(0);
    invpointG.setLifetimeEach(-1);
    pipesG.setLifetimeEach(-1);
    
    if(keyDown("r")){
      reset();
    }
  }
  
  drawSprites();
  
  if(gameState === END){
    textSize(20);
    fill("black");
    text("Game Over", 250, 280);
    text("Press R to Restart", 210, 320);
  }
  
  fill("black");
  textSize(20);
  text("Score " + score, 270,100);
}

function pipes(){
  pipe1 = createSprite(600, Math.round(random(421, 600)));
  pipe1.addImage(pipeImg1);
  pipe1.scale = 0.7;
  pipe1.velocityX = -(3 + score/5);
  pipe1.lifetime = 400;
  
  pipe2 = createSprite(600, pipe1.y - 490);
  pipe2.addImage(pipeImg2);
  pipe2.scale = 0.7;
  pipe2.velocityX = -(3 + score/5);
  pipe2.lifetime = 400;
  
  pipe2.depth = pipe1;
  bird.depth = pipe1;
  bird.depth = bird.depth + 1;
  
  pipesG.add(pipe1);
  pipesG.add(pipe2);
}

function invpoints(){
  invpoint = createSprite(600, Math.round(random(421, 600)) - 180, 0.01, 100000);
  invpoint.velocityX = -(3 + score/5);
  invpoint.lifetime = 400;
  
  invpointG.add(invpoint);
}

function reset(){
  pipesG.destroyEach();
  invpointG.destroyEach();
  bird.y = 300;
  bird.velocityY = 6;
  score = 0;
  back.velocityX = -(3 + score/5);
  invpointG.setVelocityEach(-(3 + score/5));
  pipesG.setVelocityXEach(-(3 + score/5));
  pipesG.setLifetimeEach(400);
  gameState = PLAY;
}