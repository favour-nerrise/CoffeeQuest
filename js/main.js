//no click
/* @pjs globalKeyEvents="true"; */

//Establishing some variables
var game;
var girl;
var enemy = [];
var leaf = [];
var coffee = [];
var hp = 100;
var artifact = 0;
var stage = 0;
var meetKing = false;
var kingCon = 0;
var still = false;
var choice = 0;
var textbegone = 0;
var stageClear = 0;

//Movement key variables
var leftKey = false;
var rightKey = false;
var spaceKey = false;

var jumpState = 0;
var jumpY;
var direction = "right";

//Setup (template)
void setup() {
    //size and background
    size(1000, 600);
    background(249, 221, 249);

    //images
    playerR = loadImage("images/Characters/chenWalk1.png");
    playerL = loadImage("images/Characters/chenWalk1l.png");
    stageOne = loadImage("images/stageone.png");
    stageTwo = loadImage("images/stagetwo.png");
    stageThree = loadImage("images/stagethree.png");
    stageFour = loadImage("images/stagefour.png");
    stageFive = loadImage("images/stagefive.png");
    stageSix = loadImage("images/stagesix.png");
    stageSeven = loadImage("images/stageseven.png");
    // gameOver = loadImage("images/gameover.png");
    milk = loadImage("images/Characters/MLK.png");
    shrine = loadImage("images/coffeeShrine.jpg")
    blob1 = loadImage("images/Enemies/miniMon1.png");
    blob2 = loadImage("images/Enemies/miniMon2.png");
    blob3 = loadImage("images/Enemies/miniMon3.png");
    blob4 = loadImage("images/Enemies/miniMon4.png");
    blob5 = loadImage("images/Enemies/miniMon5.png");
    blob6 = loadImage("images/Enemies/miniMon6.png");
    blob7 = loadImage("images/Enemies/miniMon7.png");
    tea = loadImage("images/Enemies/TeaMon1.png");
    coffee1 = loadImage("images/Objects/coffee1.png");
    coffee2 = loadImage("images/Objects/coffee2.png");
    coffee3 = loadImage("images/Objects/coffee3.png");
    coffee4 = loadImage("images/Objects/coffee4.png");
    coffee5 = loadImage("images/Objects/coffee5.png");
    coffee6 = loadImage("images/Objects/coffee6.png");
    coffee7 = loadImage("images/Objects/coffee7.png");
    happy = loadImage("images/HAPPY.png");
    heart = loadImage("images/Objects/heart.png");
    leaf = loadImage("images/Objects/leaf.png");
    girl = new Girl(84, 150, 10, 436);

}

//important stuff
void draw() {
    stageChange();
    girl.jump();
    background(249, 221, 249);

    if (stage == 0) {
        image(shrine, 0, 0);
        image(milk, 700, 410);
    }

    if (stage == 1) {
        image(stageOne, 0, 0);
    }

    if (stage == 2) {
        image(stageTwo, 0, 0);
    }

    if (stage == 3) {
        image(stageThree, 0, 0);
    }

    if (stage == 4) {
        image(stageFour, 0, 0);
    }

    if (stage == 5) {
        image(stageFive, 0, 0);
    }

    if (stage == 6) {
        image(stageSix, 0, 0);
    }

    if (stage == 7) {
        image(stageSeven, 0, 0);
    }

    kingSpeech();

    font = loadFont("Helvetica");
    fill(255, 255, 255);
    textFont(font, 20);
    image(heart, 55, 20) + text(hp, 100, 43);
    text("Artifacts: " + artifact, 500, 43);
    text("Stage: " + stageClear, 900, 43);

    girl.drawGirl();
    if (leftKey != false && still != true) {
        girl.moveLeft();
    }
    if (rightKey != false && still != true) {
        girl.moveRight();
    }

    for (var i = 0; i < enemy.length; i++) {
        enemy[i].drawEnemy();
    }

    for (var i = 0; i < coffee.length; i++) {
        coffee[i].drawCoffee();
        coffee[i].collect();
    }

    if (frameCount % 100 == 0) {
        for (var i = 0; i < enemy.length; i++) {
            leaf.push(new Leaf(10, 10, enemy[i].xPosition + enemy[i].width / 2, enemy[i].yPosition + enemy[i].height / 2));
        }
    }

    for (var i = 0; i < leaf.length; i++) {
        leaf[i].moveLeafLeft();
        leaf[i].drawLeaf();
    }

    if (kingCon == 1) {
        rect(100, textbegone + 100, 800, 150);
        rect(100, textbegone + 50, 200, 50);
        triangle(600, textbegone + 251, 635, textbegone + 251, 645, textbegone + 300);

        font = loadFont("Helvetica");
        fill(0, 0, 0);
        textFont(font, 30);
        text("???", 170, textbegone + 85);
        textFont(font, 20);
        text("Greetings, traveler. I am the ruler of Coffeelandia, also known as the Mocha Latte", 130, textbegone + 140);
        text("King. That is MLK, or Milk, for short.", 130, textbegone + 170);
        textFont(font, 10);
        text("Press SPACE to continue", 720, textbegone + 230);
    }
    if (kingCon == 2) {
        rect(100, textbegone + 100, 800, 150);
        rect(100, textbegone + 50, 200, 50);
        triangle(600, textbegone + 251, 635, textbegone + 251, 645, textbegone + 300);

        font = loadFont("Helvetica");
        fill(0, 0, 0);
        textFont(font, 30);
        text("Milk", 170, textbegone + 85);
        textFont(font, 20);
        text("Unfortunately, our kingdom is experiencing a great crisis. The Seven Great Artifacts", 130, textbegone + 140);
        text("of Coffeelandia have been stolen by the Tea Bandits.", 130, textbegone + 170);
        textFont(font, 10);
        text("Press SPACE to continue", 720, textbegone + 230);
    }
    if (kingCon == 3) {
        rect(100, textbegone + 100, 800, 150);
        rect(100, textbegone + 50, 200, 50);
        triangle(600, textbegone + 251, 635, textbegone + 251, 645, textbegone + 300);
        rect(100, textbegone + 250, 200, 100);

        font = loadFont("Helvetica");
        fill(0, 0, 0);
        textFont(font, 30);
        text("Milk", 170, textbegone + 85);
        textFont(font, 20);
        text("Our backs are against the wall. Will you take the fate of our kingdom into your", 130, textbegone + 140);
        text("hands and retrieve the Artifacts?", 130, textbegone + 170);
        textFont(font, 10);
        text("Press SPACE to continue", 720, textbegone + 230);

        textFont(font, 20);
        if (choice == 0) {
            fill(150, 0, 0);
            text(">>Yes.", 140, textbegone + 290);
            fill(0, 0, 0);
            text(">>No.", 140, textbegone + 320);
        } else if (choice == 1) {
            fill(0, 0, 0);
            text(">>Yes.", 140, textbegone + 290);
            fill(150, 0, 0);
            text(">>No.", 140, textbegone + 320);
        }
    }
    if (kingCon == 4) {
        rect(100, textbegone + 100, 800, 150);
        rect(100, textbegone + 50, 200, 50);
        triangle(600, textbegone + 251, 635, textbegone + 251, 645, textbegone + 300);
        rect(100, textbegone + 250, 200, 100);

        font = loadFont("Helvetica");
        fill(0, 0, 0);
        textFont(font, 30);
        text("Milk", 170, textbegone + 85);
        textFont(font, 20);
        text("We are in your debt. What is your name, traveler?", 130, textbegone + 140);
        textFont(font, 10);
        text("Press SPACE to continue", 720, textbegone + 230);

        textFont(font, 20);
        if (choice == 0) {
            fill(150, 0, 0);
            text(">>Chen Chi-La.", 140, textbegone + 290);
            fill(0, 0, 0);
            text(">>I won't say.", 140, textbegone + 320);
        } else if (choice == 1) {
            fill(0, 0, 0);
            text(">>Chen Chi-La.", 140, textbegone + 290);
            fill(150, 0, 0);
            text(">>I won't say.", 140, textbegone + 320);
        }
    }
    if (kingCon == 5) {
        rect(100, textbegone + 100, 800, 150);
        rect(100, textbegone + 50, 200, 50);
        triangle(600, textbegone + 251, 635, textbegone + 251, 645, textbegone + 300);

        font = loadFont("Helvetica");
        fill(0, 0, 0);
        textFont(font, 30);
        text("Milk", 170, textbegone + 85);
        textFont(font, 20);
        text("Thank you, Chi-La.", 130, textbegone + 140);
        textFont(font, 10);
        text("Press SPACE to continue", 720, textbegone + 230);
        still = false;
    }
    if (kingCon == 6) {
        rect(100, textbegone + 100, 800, 150);
        rect(100, textbegone + 50, 200, 50);
        triangle(600, textbegone + 251, 635, textbegone + 251, 645, textbegone + 300);

        font = loadFont("Helvetica");
        fill(0, 0, 0);
        textFont(font, 30);
        text("Milk", 170, textbegone + 85);
        textFont(font, 20);
        text("Thank you, traveler.", 130, textbegone + 140);
        textFont(font, 10);
        text("Press SPACE to continue", 720, textbegone + 230);
        still = false;
    }
    die();
    gameOver();

    if (game == "over") {
        window.location.href = "GameOver.html";
    }
}

//When a key is pressed
void keyPressed() {
    if (keyCode == 65) {
        direction = "left";
        leftKey = true;
        rightKey = false;
    }
    if (keyCode == 68) {
        direction = "right";
        rightKey = true;
        leftKey = false;
    }
    if (keyCode == 32) {
        spaceKey = true;
    }

    if (keyCode == 87) {
        if (choice > 0) {
            choice -= 1;
        }
    }
    if (keyCode == 83) {
        if (choice < 1) {
            choice++;
        }
    }

    if (keyCode == 32) {
        if (still == true && spaceKey == true && kingCon == 3 && choice == 0) {
            kingCon = 4;
        } else if (still == true && spaceKey == true && kingCon == 3 && choice == 1) {
            game = "over";
        } else if (still == true && spaceKey == true && kingCon == 4 && choice == 0) {
            kingCon = 5;
        } else if (still == true && spaceKey == true && kingCon == 4 && choice == 1) {
            kingCon = 6;
        } else if (spaceKey == true && kingCon == 5 || kingCon == 6) {
            textbegone = 2000;
            kingCon = 2000;
        } else if (still == true && spaceKey == true) {
            kingCon++;
            spaceKey = false;
        } else if (jumpState == 0 && still != true) {
            jumpY = girl.yPosition;
            jumpState = 1;
        }
    }
    if (stage == 9) {
        image(happy, 0, 0);
    }
}

//When key is released
void keyReleased() {
    if (keyCode == 65) {
        leftKey = false;
    }
    if (keyCode == 68) {
        rightKey = false;
    }
}

class Girl {
    var xPosition;
    var yPosition;
    var width;
    var height;

    Girl(w, h, x, y) {
        xPosition = x;
        yPosition = y;
        width = w;
        height = h;
    }

    void drawGirl() {
        if (direction == "right") {
            image(playerR, xPosition, yPosition);
        }
        if (direction == "left") {
            image(playerL, xPosition, yPosition);
        }
    }

    void jump() {
        if (jumpState == 1 && yPosition >= jumpY - 140 && frameCount % 2 == 0) {
            yPosition -= 15;
        } else if (jumpState == 1 && yPosition < jumpY - 140) {
            jumpState = 2;
        }
        if (jumpState == 2 && yPosition < jumpY && frameCount % 2 == 0) {
            yPosition += 15;
        } else if (jumpState == 2 && yPosition == jumpY && jumpState == 2) {
            jumpState = 0;
        }
    }

    void moveLeft() {
        xPosition = xPosition - 4;
    }
    void moveRight() {
        xPosition = xPosition + 4;
    }
}

class Enemy {
    var xPosition;
    var yPosition;
    var width;
    var height;

    Enemy(w, h, x, y) {
        xPosition = x;
        yPosition = y;
        width = w;
        height = h;
    }

    void drawEnemy() {

        /*if (stage==0){
          image(milk,700,410);
        }*/
        if (stage == 1) {
            image(blob1, xPosition, yPosition);
        }
        if (stage == 2) {
            image(blob2, xPosition, yPosition);
        }
        if (stage == 3) {
            image(blob3, xPosition, yPosition);
        }
        if (stage == 4) {
            image(blob4, xPosition, yPosition);
        }
        if (stage == 5) {
            image(blob5, xPosition, yPosition);
        }
        if (stage == 6) {
            image(blob6, xPosition, yPosition);
        }
        if (stage == 7) {
            image(blob7, xPosition, yPosition);
        }
        if (stage == 8) {
            image(tea, 700, yPosition);
        }

        if (xPosition >= girl.xPosition && xPosition <= girl.xPosition + girl.width && girl.yPosition >= yPosition - 100) {
            if (girl.yPosition + girl.height <= yPosition + 60) {
                yPosition = 2000;
                stageClear++;
                if (stageClear == 1) {
                    coffee.push(new Coffee(500, 500));
                }
                if (stageClear == 2) {
                    coffee.push(new Coffee(500, 500));
                }
                if (stageClear == 3) {
                    coffee.push(new Coffee(500, 500));
                }
                if (stageClear == 4) {
                    coffee.push(new Coffee(500, 500));
                }
                if (stageClear == 5) {
                    coffee.push(new Coffee(500, 500));
                }
                if (stageClear == 6) {
                    coffee.push(new Coffee(500, 500));
                }
                if (stageClear == 7) {
                    coffee.push(new Coffee(500, 500));
                }
            } else {
                hp -= 5;
                girl.xPosition = xPosition - 100;
            }
        }
    }
}

function stageChange() {
    if (girl.xPosition >= 946) {
        stage++;
        girl.xPosition = 10;
    }
    if (girl.xPosition <= -10) {
        stage = stage - 1;
        girl.xPosition = 936;
    }
}

class Leaf {
    var xPosition;
    var yPosition;
    var width;
    var height;

    Leaf(w, h, x, y) {
        xPosition = x;
        yPosition = y;
        width = w;
        height = h;
    }

    void drawLeaf() {
        fill(0, 255, 0);
        ellipse(xPosition, yPosition, width, height);
    }

    void moveLeafLeft() {
        if (stage == 1) {
            xPosition = xPosition - 4;
        }
        if (stage == 2) {
            xPosition = xPosition - 8;
        }
        if (stage == 3) {
            xPosition = xPosition - 12;
        }
        if (stage == 4) {
            xPosition = xPosition - 13;
        }
        if (stage == 5) {
            xPosition = xPosition - 14;
        }
        if (stage == 6) {
            xPosition = xPosition - 16;
        }
        if (stage == 7) {
            xPosition = xPosition - 20;
        }
        if (stage == 8) {
            xPosition = xPosition - 30;


        }
        if (xPosition >= girl.xPosition && xPosition <= girl.xPosition + girl.width) {
            if (yPosition >= girl.yPosition && yPosition <= girl.yPosition + girl.height) {
                hp -= 3;
                yPosition = 2000;
            }
        }
    }
}

function die() {
    if (stage == 8 && girl.xPosition >= 679) {
        enemy[0].yPosition = 2000;
        image(happy, 0, 0);
    }

}
class Coffee {
    var xPosition;
    var yPosition;
    var width;
    var height;

    Coffee(x, y) {
        xPosition = x;
        yPosition = y;
        //width = w;
        //height = h;
    }

    void drawCoffee() {
        if (stage == 1 && stageClear == 1) {
            fill(255, 255, 0);
            image(coffee1, xPosition, yPosition);
        }
        if (stage == 2 & stageClear == 2) {
            fill(255, 255, 0);
            image(coffee2, xPosition, yPosition);
        }
        if (stage == 3 & stageClear == 3) {
            fill(255, 255, 0);
            image(coffee3, xPosition, yPosition);
        }
        if (stage == 4 & stageClear == 4) {
            fill(255, 255, 0);
            image(coffee4, xPosition, yPosition);
        }
        if (stage == 5 & stageClear == 5) {
            fill(255, 255, 0);
            image(coffee5, xPosition, yPosition);
        }
        if (stage == 6 & stageClear == 6) {
            fill(255, 255, 0);
            image(coffee6, xPosition, yPosition);
        }
        if (stage == 7 & stageClear == 7) {
            fill(255, 255, 0);
            image(coffee7, xPosition, yPosition);
        }
    }

    void collect() {
        if (xPosition + 50 >= girl.xPosition && xPosition <= girl.xPosition + girl.width && girl.yPosition >= yPosition - 100) {
            coffee = [];
            artifact++;
        }
    }
}

function stageChange() {
    if (girl.xPosition >= 946 && stage == artifact) {
        stage++;
        enemy = [];
        leaf = [];
        if (stage == 1) {
            enemy.push(new Enemy(64, 92, 900, 490));
        }
        if (stage == 2) {
            enemy.push(new Enemy(64, 92, 900, 490));
        }
        if (stage == 3) {
            enemy.push(new Enemy(64, 92, 900, 490));
        }
        if (stage == 4) {
            enemy.push(new Enemy(64, 92, 900, 490));
        }
        if (stage == 5) {
            enemy.push(new Enemy(64, 92, 900, 490));
        }
        if (stage == 6) {
            enemy.push(new Enemy(64, 92, 900, 490));
        }
        if (stage == 7) {
            enemy.push(new Enemy(64, 92, 900, 490));
        }
        if (stage == 8 && artifact >= 7) {
            enemy.push(new Enemy(321, 185, 900, 410));
        }
        girl.xPosition = 10;

    }
    if (girl.xPosition >= 946 && stage != artifact) {
        girl.xPosition = girl.xPosition - 100;
    }
    if (girl.xPosition <= -10) {
        stage -= 1;
        enemy = [];
        leaf = [];
        girl.xPosition = 936;
    }
}

function kingSpeech() {
    if (stage == 0 && girl.xPosition >= 500 && meetKing == false) {
        still = true;
        meetKing = true;
        kingCon = 1;
    }
}

function gameOver() {
    if (hp <= 0) {
        game = "over";
    }
}
