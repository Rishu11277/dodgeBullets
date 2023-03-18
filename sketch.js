var human;
var tech, bullets, road, coins;
var score, gameState, equipment, amounts;
var botSound, playerImg, roadImg, coinImg, bulletImg, standingImg, techImg2;
var bulletGroup, techGroup, coinGroup;
var bullet, techs;

function preload() {
    playerImg = loadAnimation("Runner-1.png", "Runner-2.png")
    roadImg = loadImage("Road.png")
    bulletImg = loadImage("bullet.png")
    standingImg = loadImage("Runner-1.png")
    techImg2 = loadImage("tech2.png")
    coinImg = loadImage("bitcoin.png")
}


function setup() {
    createCanvas(windowWidth, windowHeight)

    console.log(windowHeight, windowWidth)

    road = createSprite(width / 2, height / 2)
    road.addImage("ground", roadImg)


    human = createSprite(width / 2, 638)
    human.addAnimation("standing", standingImg)
    human.addAnimation("running", playerImg)
    human.scale = 0.1

    coinGroup = createGroup()

    bulletGroup = createGroup()

    score = 5
    gameState = "Serve"
    equipment = 0
    amounts = 0

    techGroup = createGroup()
}

function draw() {
    //background("white")
    console.log(gameState)
    textFont("Monospace")
    textSize(30)
    

    if (gameState == "Serve") {
        if (keyIsDown(32)) {
            gameState = "Play"
        }
    }



    if (gameState == "Play") {
        human.changeAnimation("running", playerImg)
        human.x = World.mouseX
        road.velocityY = 7
        spawnBullets()
        spawnTech()
        spawnCoins()
        
        if (road.y > 868) {
            road.y = 686    
        }


        if (bulletGroup.isTouching(human)) {
            
            
            for (let i = 0; i < bulletGroup.length; i++) {
                let sprite = bulletGroup.get(i)
                
                if (sprite.isTouching(human)) {
                    sprite.velocityY = 0
                    sprite.destroy()
                    score -= 1
                }
            }
        } 
        

        if (coinGroup.isTouching(human)) {
            
        
            for (let i = 0; i < coinGroup.length; i++) {
                let sprite = coinGroup.get(i)
                
                if (sprite.isTouching(human)) {
                    sprite.velocityY = 0
                    sprite.destroy()
                    amounts += 1
                }
            }

        }



            if (techGroup.isTouching(human)) {
                
        
                for (let i = 0; i < techGroup.length; i++) {
                    let sprite = techGroup.get(i)
                    
                    if (sprite.isTouching(human)) {
                        sprite.velocityY = 0
                        sprite.destroy()
                        equipment += 1
                    }
                }
            
        }

        if (score <= 0) {
            gameState = "Over"
        }

        console.log(gameState)
        if (gameState == "Over") {
            human.visible = false
            techGroup.destroyEach()
            coinGroup.destroyEach()
            bulletGroup.destroyEach()
            road.destroy()
            background("red")
            fill("purple")
            textFont('monospace')
            textSize(50)
            text("You have lost!", width / 4, height / 2)
        }
        
        if (equipment == 50) {
            equipment
            amounts += 5
        }
    
        if (amounts >= 30) {
            score += 2
            amounts = 0
        }

    }

   



    drawSprites()

    textFont("Monospace")
    textSize(20)
    fill("white")
    text("Lives: " + score, 20, 20)
    text("Tech: " + equipment, 20, 40)
    text("Coins: " + amounts , 20, 60)
}

function spawnBullets() {
    if (World.frameCount % Math.round(random(100, 200)) == 0) {
        bullets = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        bullets.addImage("shooting", bulletImg)
        bullets.scale = 0.2
        bullets.velocityY = 6
        bulletGroup.add(bullets)
    }
}

function spawnTech() {
    if (World.frameCount % Math.round(random(100, 200)) == 0) {
        tech = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        tech.scale = 0.2
        tech.velocityY = 6
        techGroup.add(tech)
        tech.addImage("floating", techImg2)
    }
}

function spawnCoins() {
    if (World.frameCount % Math.round(random(100, 200)) == 0) {
        coins = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
        coins.scale = 0.2
        coins.velocityY = 6
        coinGroup.add(coins)
        coins.addImage("falling", coinImg)    
    }
}

