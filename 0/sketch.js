let input;
let img;
let bgImg;
let newImg;
let changed = false;

let SIMILARITY_VALUE = 50;
let MONDRIAN_RED;
let MONDRIAN_BLUE;
let MONDRIAN_YELLOW;

/** This function loads resources that will be used later. */
function preload() {
  bgImg = loadImage("red.jpg");
  img = loadImage("Piet_Mondriaan,_1921_-_Composition_en_rouge,_jaune,_bleu_et_noir.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // This allows users to select local files for use in a sketch.
  input = createFileInput(handleFile);
  input.position(width / 2, height / 2);
  input.hide();

  MONDRIAN_RED = { r: 186, g: 64, b: 43 };;
  MONDRIAN_BLUE = { r: 30, g: 61, b: 107 };
  MONDRIAN_YELLOW = { r: 198, g: 164, b: 64 };
}

function draw() {
  background(255);

  if (img) {
    resizeImage(img);
    bgImg.resize(img.width, img.height);
    newImg = createImage(img.width, img.height);

    img.loadPixels();
    bgImg.loadPixels();
    newImg.loadPixels();

    let numPixels = 4 * img.width * img.height;
    for (let i = 0; i < numPixels; i += 4) {
      if (isSimilar(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2],
        MONDRIAN_BLUE.r, MONDRIAN_BLUE.g, MONDRIAN_BLUE.b)) {
        newImg.pixels[i] = 255;
        newImg.pixels[i + 1] = 174;
        newImg.pixels[i + 2] = 200;
        newImg.pixels[i + 3] = 255;
      } else if (isSimilar(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2],
        MONDRIAN_YELLOW.r, MONDRIAN_YELLOW.g, MONDRIAN_YELLOW.b)) {
        newImg.pixels[i] = floor(random(256));
        newImg.pixels[i + 1] = floor(random(256));
        newImg.pixels[i + 2] = floor(random(256));
        newImg.pixels[i + 3] = 255;
      } else if (isSimilar(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2],
        MONDRIAN_RED.r, MONDRIAN_RED.g, MONDRIAN_RED.b)) {
        newImg.pixels[i] = bgImg.pixels[i];
        newImg.pixels[i + 1] = bgImg.pixels[i + 1];
        newImg.pixels[i + 2] = bgImg.pixels[i + 2];
        newImg.pixels[i + 3] = bgImg.pixels[i + 3];
      }
    }

    newImg.updatePixels();

    translate((width - img.width) / 2, 0);
    image(img, 0, 0);
    image(newImg, 0, 0);
  }
}

function keyPressed() {
  if (key == ' ') {
    input.show();
  }
}

/** Resize the image so that the height of the image matches the height of the browser window. */
function resizeImage(_img) {
  let nw = floor(_img.width / _img.height * height);
  _img.resize(nw, height);
}

function handleFile(file) {
  newImg = null;
  if (file.type === 'image') {
    img = loadImage(file.data);
    print(img.height);
    resizeImage(img);
    print(img.height);
    input.hide();
  } else {
    img = null;
  }
}

/** This function accepts two colors and returns true/false based on whether they are similar. */
function isSimilar(redA, greenA, blueA, redB, greenB, blueB) {
  if (abs(redA - redB) < SIMILARITY_VALUE
    && abs(greenA - greenB) < SIMILARITY_VALUE
    && abs(blueA - blueB) < SIMILARITY_VALUE) {
    return true;
  }

  return false;
}