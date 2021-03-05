var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var cactus, cactusGroup
var score = 0


var newImage;

var end = 0
var play = 1
var gameState = play

var gmeover, restart


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  cactusI = loadImage("obstacle1.png")
  cactusI2 = loadImage("obstacle2.png")
  cactusI3 = loadImage("obstacle3.png")
  cactusI4 = loadImage("obstacle4.png")
  cactusI5 = loadImage("obstacle5.png")
  cactusI6 = loadImage("obstacle6.png")

  gmeoverI = loadImage("gameOver.png")
  restartI = loadImage("restart.png")

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;


  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cactusGroup = createGroup()
  cloudsGroup = new Group()


  trex.setCollider("rectangle", 0, 0, 85, 100)

  restart = createSprite(300, 150, 20, 20)
  gmeover = createSprite(300, 100, 20, 20)
  restart.addImage(restartI)
  gmeover.addImage(gmeoverI)
  gmeover.scale = 0.80
  restart.scale = 0.75


}

function draw() {
  background(180);







  fill("black")
  text("Score " + score, 50, 35)



  trex.collide(invisibleGround);

  if (gameState === play) {
    spawnClouds();
    spawnCacti()
    score = score + round(getFrameRate() / 60)
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -15;
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -4;

    if (cactusGroup.isTouching(trex)) {
      gameState = end
    }
    gmeover.visible = false
    restart.visible = false

  } else if (gameState === end) {
    trex.changeAnimation("collided", trex_collided)
    ground.velocityX = 0;
    trex.velocityY = 0;
    cactusGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cactusGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    gmeover.visible = true
    restart.visible = true
    if (mousePressedOver(restart)) {
      reset()
    }
  }





  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;


    //assigning lifetime to the variable
    cloud.lifetime = 200

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud)
  }
}

function spawnCacti() {
  if (frameCount % 60 === 0) {
    cactus = createSprite(600, 170, 20, 20)
    cactus.velocityX = -3
    cactinum = round(random(1, 6))
    cactus.scale = 0.48
    switch (cactinum) {
      case 1:
        cactus.addImage(cactusI)
        break;
      case 2:
        cactus.addImage(cactusI2)
        break;
      case 3:
        cactus.addImage(cactusI3)
        break;
      case 4:
        cactus.addImage(cactusI4)
        break;
      case 5:
        cactus.addImage(cactusI5)
        break;
      case 6:
        cactus.addImage(cactusI6)
        break;
      default:
        break
    }
    cactus.lifetime = 200
    cactusGroup.add(cactus)

  }
}

function reset() {
  gameState = play
  cactusGroup.destroyEach()
  cloudsGroup.destroyEach()
  score = 0
  trex.changeAnimation("running", trex_running)
}