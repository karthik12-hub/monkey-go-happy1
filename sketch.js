var PLAY=1
var END =0
var gameState = PLAY

var survivalTime


var monkey , monkey_running,monkeyImage
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground,path

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1
  
  path = createSprite(400,350,900,10)
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  survivalTime=0
}


function draw() {
background(255) 
    text("survival Time:"+ survivalTime,100,50)
   monkey.collide(path)
 
  
 
  if(gameState === PLAY){
     path.velocityX = -4
    
    
 survivalTime = survivalTime +Math.round(getFrameRate()/60)  
    
    
      if(path.x<0){
     path.x = path.width/2
  }
    
    
  if(keyDown("space")&& monkey.y >= 250){
    monkey.velocityY=-12;
  }
    
    
    
  monkey.velocityY=monkey.velocityY+0.8
  
    
     spawnObstacles();
  spawnBananas();
     
 if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach()
  survivalTime =survivalTime+5
 }
    
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
   else if(gameState === END){
    
 
     
     monkey.velocityY=0
     path.velocityX=0
     
     FoodGroup.setLifetimeEach(-1)
     obstacleGroup.setLifetimeEach(-1)
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
   }

    

 
  
 
 
  drawSprites();
}

function spawnObstacles(){
  if(frameCount %100 === 0){
    obstacle = createSprite(400,325,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.1
    obstacle.velocityX=-4
    obstacle.lifetime=100
    
    obstacleGroup.add(obstacle)
      }
}

function spawnBananas(){
  if(frameCount %140 === 0){
    banana = createSprite(400,200,20,20)
    banana.addImage(bananaImage)
    banana.scale =0.1
    banana.velocityX=-3
    banana.y=Math.round(random(190,280))
    banana.lifetime=130
 
 
    FoodGroup.add(banana)
  }
  
  
  
  
}


