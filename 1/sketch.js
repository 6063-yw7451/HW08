let cnv;
let mySound;
let colors = "2176ae-57b8ff-b66d0d-fbb13c-fe6847-fff-f24-edae49-d1495b-00798c-30638e-003d5b-51e5ff-440381-ec368d-ffa5a5-ffd6c0-0e402d-295135-5a6650-9fcc2e".split("-").map(a => "#" + a);
let beadMaxNum = 1200;
let beads = [];

let themes = [
  "2176ae-57b8ff-b66d0d-fbb13c-fe6847-fff-f24-edae49-d1495b-00798c-30638e-003d5b-51e5ff-440381-ec368d-ffa5a5-ffd6c0-0e402d-295135-5a6650-9fcc2e".split("-").map(a => "#" + a),
  "d72638-3f88c5-f49d37-140f2d-f22b29-fe4a49-fed766-7fbb8f-009fb7-e6e6ea-fff-102a54".split("-").map(a => "#" + a),
  "584d3d-9f956c-cbbf7a-f4e87c-ebf38b-fed766-fff-ffa856-000-e5dede".split("-").map(a => "#" + a),
  "0e131f-38405f-59546c-8b939c-ff0035-2c0735-fff".split("-").map(a => "#" + a),
  "ffc854-000-ffc854-000-fff".split("-").map(a => "#" + a),
  "261447-f1e3f3-c2bbf0-8fb8ed-62bfed-3590f3-fff-FF8680".split("-").map(a => "#" + a),
  "07252F-7c6a0a-babd8d-ffdac6-fa9500-eb6424-FCFBF6".split("-").map(a => "#" + a),
  "e6e1c6-afac96-c0bda5-cc978e-f39c6b-f96a68-ff3864-261447-3a2958-fff".split("-").map(a => "#" + a),
  "0a369d-4472ca-5e7ce2-92b4f4-cfdee7-fff".split("-").map(a => "#" + a),
  "daddd8-c7d59f-b7ce63-8fb339-4b5842-fafafa-daddd8-c7d59f-b7ce63-8fb339-4b5842-fafafa-daddd8-c7d59f-b7ce63-8fb339-4b5842-fafafa-FF715B".split("-").map(a => "#" + a)
];

// DOM
let p1, p2;
let slider1;  // color slider
let slider2;  // scale slider
let showDom = true;

/** This function loads resources that will be used later. */
function preload() {
  // load songs into this sketch
  mySound = loadSound('assets/Resuscitated Hope.mp3');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0);

  p1 = createP('COLOR');
  p1.style('font-size', '18px');
  p1.style('color', 'white');
  p1.position(20, 0);
  slider1 = createSlider(0, themes.length - 1, 0);
  slider1.position(90, 20);
  slider1.style('width', '80px');

  p2 = createP('SCALE');
  p2.style('color', 'white');
  p2.style('font-size', '18px');
  p2.position(20, 40);
  slider2 = createSlider(0, 10, 2);
  slider2.position(90, 60);
  slider2.style('width', '80px');

  // Anyway, this song should be played in the background; 
  // If not automatic, click the mouse or button.
  cnv.mousePressed(loopSong);
}

function draw() {
  colors = themes[int(slider1.value())];

  push();
  drawingContext.filter = "blur(1px)";
  image(cnv, -1, -1, width + 1, height + 1);
  pop();

  if (mySound.isPlaying() && beads.length < beadMaxNum) {
    beads.push(new Bead());
  }

  if (beads.length > 0) {
    // Use its getPeaks() function to obtain samples of the song.
    let peaks = mySound.getPeaks(beads.length);

    fill(255, 0, 0);
    for (let i = 0; i < beads.length; i++) {
      beads[i].show(peaks[i]);
      beads[i].move();
      beads[i].wrap();
    }
  }

  push();
  blendMode(SCREEN);
  drawingContext.globalAlpha = 0.01;
  drawingContext.filter = "blur(5px)";
  image(cnv, 0, 0, width, height);
  drawingContext.filter = "blur(10px)";
  image(cnv, 0, 0, width, height);
  pop();
}

function loopSong() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  if (!mySound.isPlaying()) {
    mySound.loop();
  }
}

function keyPressed() {
  if (key == ' ') {
    showDom = !showDom;

    if (showDom) {
      p1.show();
      p2.show();
      slider1.show();
      slider2.show();
    } else {
      p1.hide();
      p2.hide();
      slider1.hide();
      slider2.hide();
    }
  }
}

//------------------------------
class Bead {
  constructor() {
    this.reset();
  }

  // reset
  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = 2;
    this.col = random([255, random(colors)])
  }

  // show
  show(ratio) {
    fill(this.col);
    circle(this.x, this.y, this.size * (1 + slider2.value() * ratio));
  }

  // move
  move() {
    let n = noise(this.x / 1000, this.y / 1000 + frameCount / 300);
    let pin = n * TWO_PI * 4;
    this.x += cos(pin) * 3;
    this.y += sin(pin) * 3;
    this.col = colors[floor(map(n, 0, 1, 0, colors.length))];
  }

  // respawn
  wrap() {
    if (this.size < 2 || this.x + this.size / 2 < 0 || this.y + this.size / 2 < 0
      || this.x - this.size / 2 > width || this.y - this.size / 2 > height) {
      this.reset();
    }
  }
}


