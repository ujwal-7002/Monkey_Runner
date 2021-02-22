var bananaImage , obstacleImage , obstacleGroup , backImage , score, player_running,backGround,ground,player,playerStop, banana,stone,foodGroup,life,gameover,gameoverImg;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  player_running= loadAnimation ("Monkey_01.png" , "Monkey_02.png" , "Monkey_03.png" , "Monkey_04.png" , "Monkey_05.png" , "Monkey_06.png" , "Monkey_07.png" , "Monkey_08.png" , "Monkey_09.png" , "Monkey_10.png");
  backImage=loadImage("jungle.jpg");
  bananaImage= loadImage ("banana.png");
  obstacleImage=loadImage("stone.png");
  playerStop=loadImage("Monkey_01.png");
  gameoverImg=loadImage("gameOver.png");
}
function setup() {
  createCanvas(400, 400);
  backGround=createSprite(400,400,800,800);
  backGround.addImage("bg",backImage);
  backGround.velocityX=-2;
  backGround.x=backGround.x/2;
  ground=createSprite(400,395,800,10);
  ground.visible=false;
  player=createSprite(100,360,60,100);
  player.addAnimation("player",player_running);
  player.addAnimation("Stop",playerStop);
  score=0;
  obstacleGroup=createGroup();
  stone=createSprite(370,400,20,20);
  obstacleGroup.add(stone);
  foodGroup=createGroup();
  banana=createSprite(400,random(200,220),20,20);
  life=2;
  gameover=createSprite(200,150);
  gameover.addAnimation("over",gameoverImg);
  
}

function draw() {
  player.scale=0.2;
  player.velocityY=0.5;
  player.collide(ground);
  player.depth=banana.depth+1;
  player.velocityY=player.velocityY+2;
  if (gameState=== PLAY ){
  if (keyDown("space")){
      player.velocityY=-14;
  }
  
 if(backGround.x<=0){
   backGround.x=400;
 }
  food();
  obstacles();
 if (foodGroup.isTouching(player)){
   score=score+2;
   foodGroup.destroyEach();
 }
  if (obstacleGroup.isTouching(player)){
    player.scale=0.2;
    life=life-1;
    obstacleGroup.destroyEach();
  }
  if(life===0){
    gameState=END;
  }
  switch(score){
    case 10: player.scale=0.12;
      break;
    case 20: player.scale=0.14; 
      break;
    case 30: player.scale=0.16;
      break;
    case 40: player.scale=0.18;
      break;
    default: break;
  }
gameover.visible=false;
}
  if(gameState===END){
    gameOver();
  }
  drawSprites();
  stroke("white");
  textSize(20);
  fill=("white");
  text("Score:"+score,300,50);
  
}
function food(){
  if (frameCount%80===0){
    var banana=createSprite(450,random(120,200),20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-2;
    banana.scale=0.05;
    banana.lifetime=250;
    foodGroup.add(banana);
  }   
}
function obstacles(){
  if (frameCount%300===0){
    var stone=createSprite(450,370,20,20);
    stone.addImage(obstacleImage);
    stone.scale=0.15;
    stone.velocityX=-2;
   obstacleGroup.add(stone); 
  }
}
function gameOver(){
  player.changeAnimation("Stop",playerStop);
  backGround.velocityX=0;
  player.velocityY=0;
  foodGroup.destroyEach();
  Score=0;
  gameover.visible=true;
}