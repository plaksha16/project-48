
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0

function preload() {
  enemyImg = loadImage("enemy_ship.png")
  spaceCraftImg = loadImage("spacecraft.png")
  spaceCraft1Img = loadImage("spacecraft1.png")
  bgImg = loadImage("bg.png")
  bg2Img = loadImage("bg2.png")
  gameOverImg = loadImage("gameover.png")
  restartImg = loadImage("restart.png")
  coinImg = loadImage("coin.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  spaceCraft1 = createSprite(700, 450, 50, 50);
  spaceCraft1.addImage("spaceCraft1", spaceCraft1Img)

  gameOver = createSprite(width / 2, height / 3, 10, 10)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false


  restart = createSprite(width / 2, 400, 10, 10)
  restart.addImage(restartImg)
  restart.visible = false
  restart.scale = 0.1

  coinGroup = new Group
  enemyGroup = new Group
}

function draw() {
  background("#00002B");

  if (gamestate == PLAY) {
    if (keyIsDown(RIGHT_ARROW)) {
      spaceCraft1.x += 5
    }

    if (keyIsDown(LEFT_ARROW)) {
      spaceCraft1.x -= 5
    }

    if (spaceCraft1.isTouching(coinGroup)) {
      score = score + 1
    }
    if (spaceCraft1.isTouching(enemyGroup)) {
      gamestate = END
    }
  }

  if (gamestate == END) {
    gameOver.visible = true;
    restart.visible = true;
    enemyGroup.setVelocityYEach(0)
    enemyGroup.destroyEach()
    coinGroup.destroyEach()
      
    if (mousePressedOver(restart)) {
      gamestate = PLAY
      gameOver.visible = false
      restart.visible = false
      score = 0
    }
  }

  obstacles();
  coins();

  drawSprites();
  text("score:" + score, 100, 20)
}

function obstacles() {
  if (frameCount % 160 == 0) {
    var enemy = createSprite(random(100, 1000), 10, 10, 10)
    enemy.addImage("enemy", enemyImg)
    enemy.scale = 0.2
    enemy.velocityY = 2
    enemyGroup.add(enemy)
  }
}

function coins() {
  if (frameCount % 180 == 0) {
    var coin = createSprite(random(200, 700), 10, 5, 5)
    coin.addImage("coin", coinImg)
    coin.scale = 0.05
    coin.velocityY = 1
    coinGroup.add(coin)
  }
}