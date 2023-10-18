
var c; //for the ball AKA charles
var b; // for the beam charles shoots

var d;

var ban; // for banana
var leter; //text font
var lose; //for the lose screen
var w; // for win screen

//var p = 1000; //points
var mm = 0;

var life = -1; //lives for charles
var img; //ground for charles
var muse; //background music

var easy = 0;

//enemies
var circle1 = [];
var song; //banba audio

class Charles {
  //charles is the player/ ball

  constructor() {
    this.x = mouseX;
    this.y = 350;
    this.d = 40;
  }
  showCharles() {
    this.x = mouseX;
    stroke(0);
    strokeWeight(3);
    this.changeFill();
    circle(this.x, this.y, this.d);
  }
  changeFill() {
    if (life == 3) {
      fill("white");
    } else if (life == 2) {
      fill("yellow");
    } else if (life == 1) {
      fill("red");
    }
  }
}

class Beam {
  constructor() {
    this.x = mouseX;
    this.y = 325;
    this.h = 0;
  }
  showBeam() {
    this.x = mouseX;
    strokeWeight(3);
    stroke("red");
    line(this.x, this.y, this.x, this.h);
  }
  laserBeam() {
    //if other object == show beam then object dies
  }
}

class Circle {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  drawCircle() {
    fill("blue");
    circle(this.x, this.y, this.z);
  }
  moveCircle() {
    //this.x = this.x - 1;
    if (this.x > width - 10 || this.x < 0) {
      this.x = random(width);
    }
    this.y = this.y + 1;
    if (this.y > height - 10) {
      this.y = random(0, 280);
    }
  }
}

function preload() {
  img = loadImage("ground.jpg");
  muse = loadSound("Everything.mp4");
  leter = loadFont("NsaiRegular.otf");
  ban = loadModel("Banana.obj");
  lose = loadImage("images.jfif");
  w = loadImage("V.png");
  song = loadSound("Bananas ROTATE.mp3");
}

function setup() {
  createCanvas(600, 400, WEBGL);
  textFont(leter);

  circle1 = [];
  for (var i = 0; i < 10; i = i + 1) {
    circle1[i] = new Circle(random(width), 10, 20);
    //print(circle1[i].x);
  }

  // muse.play();
  slider = createSlider(0, 1, 0.5, 0.01);

  b = new Beam();
  c = new Charles();
}

function draw() {
  // comment out for spice (spicy mode)
  let didIwin;
  if (easy != 2) {
    background(0, 220, 255);
  }

  if (easy == 0) {
    push();
    didIwin = winTime();
    rotata();
    pop();
  } else {
    didIwin = winTime();
    rotata();
  }
  if (didIwin) {
    life = -3;
  }
  translate(-width / 2, -height / 2);

  living();

  if (life > 0) {
    stroke(0);
    // line(0, 374, 400, 374);
    image(img, 0, 374, width);

    //volume adjust
    muse.setVolume(0);
    muse.setVolume(slider.value());
    song.setVolume(0);
    song.setVolume(slider.value());

    pointCount();
    coordInates();
    instruction();

    death();

    balldeath();

    for (var i = 0; i < 10; i = i + 1) {
      circle1[i].drawCircle();
      circle1[i].moveCircle();
    }
    for (var o = 0; o < 8; o = o + 1) {
      circle1[o].drawCircle();
      circle1[o].moveCircle();
    }
    for (var y = 0; y < 10; y = y + 1) {
      circle1[y].drawCircle();
      circle1[y].moveCircle();
    }

    if (mouseIsPressed) {
      if (mouseButton === CENTER) {
        b.showBeam();
      }
    }
  }
  if (life == -1) {
    start();
    startScreen();
  }
  if (life === 0) {
    loseScreen();
  }
}

function startScreen() {
  rectMode(CENTER);
  fill("green");
  //background("green");
  stroke("green");
  square(0, 350, 4000);
  fill("YELLOW");
  //textSize(24);
  text("B A N A N A ROTATO", 150, 200);
  text("Left Click to Start", 150, 220);
  text("L for SPED and B for BABY S for Spicy", 180, 250);
  song.stop();
}

function loseScreen() {
  image(lose, 0, 0, 600, 400);
  fill("red");
  textSize(30);
  textAlign(CENTER);
  text("ROTATO NO MORE", 200, 180);
  textSize(15);
  text("Right Click to Restart", 200, 200);
  song.stop();
}

function coordInates() {
  fill(255);
  stroke(0);
  text(mouseX, 330, 393);
  text(mouseY, 370, 393);
}
function instruction() {
  stroke(0);
  text("Center to Shoot e to mute audio", 150, 390);
}

function start() {
  mm = int(millis());
  circle1 = [i];
  for (var i = 0; i < 10; i = i + 1) {
    circle1[i] = new Circle(random(width), -20, 20);
    //print(circle1[i].x);

    if (life == -1) {
      song.stop();
    } else if (life > 0) {
      song.play();
    }
  }
}
function pointCount() {
  //points counter
  fill(255);
  stroke("green");

  if (life == 3 || life == 2 || life == 1) {
    // text("Score :", 20, 30);
    //text(mm, 20, 30);
  }
  isFinished();
}
function isFinished() {
  let win = int((millis() - mm) / 1000);
  text("Banana Progress : " + win, 90, 15);
  //text(win, 200, 15);
}

function living() {
  if (life == 3 || life == 2 || life == 1) {
    death();
    c.showCharles();
  } else if (life == 0 || life == -1) {
    start();
    //song.play();

    loseScreen();
  } else if (life == -3) {
    winScreen();
  }
}

function death() {
  //dist(A.x,A.y,B.x,B.y)<(A.radius+B.radius)
  for (var i = 0; i < 10; i++) {
    if (
      dist(c.x, c.y, circle1[i].x, circle1[i].y) <
      c.d / 2 + circle1[i].z / 2 + 2
    ) {
      print("x");

      life = life - 1;

      circle1[i] = new Circle(random(width), 10, 20);
      print(life);
      return;
    }
  }
}

function balldeath() {
  for (var i = 0; i < 10; i++) {
    if (
      dist(b.x, b.y, circle1[i].x, circle1[i].y) <
      b.h / 2 + circle1[i].z / 2
    ) {
      print("y");

      circle1[i] = new Circle(random(width), 10, 20);
      return;
    }
  }
}

var rotato = 0;
function rotata() {
  if (life > 0) {
    rotato += 33;
  } else if (life < 0) {
    rotato += 22;
  }
  rotateX(millis() / 100);
  rotateY(millis() / 60);
  stroke(240, 230, 0);
  strokeWeight(2);
  model(ban);
}

function winTime() {
  if (life > 0) {
    let win = int(millis() - mm);
    if (win < 8000) {
      fill("green");
    } else if (win > 8000) {
      fill(0, 255, 0);
    } else if (win < song.duration()) {
      fill(0, 255, 90);
    } else if (win >= song.duration() * 1000) {
      fill("yellow");
    }
    return win > song.duration() * 1000;
  }
}

function winScreen() {
  image(w, 0, 0, 600, 400);
  fill("yellow");
}

//hard mode
//function lemonTime() {
// if (easy === false) {
//   winTime();
//  rotata();
// }
//}

function mousePressed() {
  if (mouseButton === LEFT) {
    life = 3;
    start();
  }
  if (mouseButton === RIGHT) {
    life = -1;
    // start();
  }

  print(life);
}

function keyTyped() {
  if (key === "l") {
    easy = 1;
  } else if (key === "b") {
    easy = 0;
  } else if (key === "s") {
    easy = 2;
  }
  if (key === "e") {
    song.stop();
  } else if (key === "r") {
    song.play();
  }
}
