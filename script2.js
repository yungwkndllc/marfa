// Download
const urlParams = new URLSearchParams(window.location.search);
const downloadParam = urlParams.get("download");
const metadataParam = urlParams.get("metadata");
const hashParam = urlParams.get("h");

let resolution = 200000;
let baseSwitchHeight;

let sunRight = true;
let isDay = true;

let allColors = ["#c68a5b", "#cf8b6a", "#7a6d5d", "#e4e0ca", "#d39976"];
let cloudColors = ["#26C6F8", "#A3E8FD", "#FAF2EF"];
let nightCloudColors = ["#131862", "#2e4482", "#546bab"];
let cactusColors = ["#2B4D1B", "#59772F", "#899F4A", "#AFA77B"];
let nightCactusColors = ["#14452f", "#18392b", "#1d2e28", "#212224", "#0f5132"];
let sunColors = ["#ff8100", "#ff9a00", "#ffc100", "#ffdb00", "#ffe700"];
let moonColors = ["#e5e5e5", "#dcdcdc", "#c9c9c9"];
let rockColors = ["#1e0707", "#4f0404", "#581c09"];

// Total bricks for each...
let divideW = 20 * 0.8;
let divideH = 30 * 0.8;

function getPalette(xBrick, yBrick) {
  let rowToSwitch = random(baseSwitchHeight - 1, baseSwitchHeight + 1);

  if (
    yBrick > rowToSwitch + 0.25 * divideH &&
    yBrick < rowToSwitch + 0.29 * divideH &&
    ((xBrick > 0.375 * divideW && xBrick < 0.45 * divideW) ||
      (xBrick > 0.45 * divideW && xBrick < 0.525 * divideW))
  ) {
    return isDay ? rockColors : allColors;
  } else if (
    yBrick > rowToSwitch + 0.21 * divideH &&
    yBrick < rowToSwitch + 0.25 * divideH &&
    xBrick > 0.425 * divideW &&
    xBrick < 0.5 * divideW
  ) {
    return isDay ? rockColors : allColors;
  } else if (yBrick > rowToSwitch) {
    return isDay ? allColors : rockColors;
  } else if (
    yBrick > rowToSwitch - 0.08 * divideH &&
    (sunRight
      ? xBrick > 0.25 * divideW && xBrick < 0.325 * divideW
      : xBrick > 0.675 * divideW && xBrick < 0.75 * divideW)
  ) {
    return isDay ? cactusColors : nightCactusColors;
  } else if (
    yBrick > 0.08 * divideH &&
    yBrick < 0.16 * divideH &&
    (sunRight
      ? xBrick > 0.75 * divideW && xBrick < 0.875 * divideW
      : xBrick > 0.125 * divideW && xBrick < 0.25 * divideW)
  ) {
    return isDay ? sunColors : moonColors;
  } else {
    return isDay ? cloudColors : nightCloudColors;
  }
}

function setup() {
  heightScaled = windowHeight;
  widthScaled = (windowHeight / 3) * 2;

  console.log("total to make....", (divideH * divideW) / 2);
  console.log(`${divideH / 2} rows of ${divideW}`);

  // Get the days until November 1st
  let today = new Date(2024, 8, 1);
  let november = new Date(today.getFullYear(), 10, 1);
  let diff = november - today;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  console.log("Days until November 1st: ", days);

  // How many I have to make per day
  let total = (divideH * divideW) / 2;
  let perDay = total / days;
  console.log("Total to make per day: ", perDay);

  // Traits
  baseSwitchHeight = random(0.25 * divideH, 0.58 * divideH);
  sunRight = random() > 0.5;
  isDay = random() > 0.5;

  c = createCanvas(widthScaled, heightScaled);

  noStroke();

  let brickSizeW = widthScaled / divideW;
  let brickSizeH = heightScaled / divideH;

  for (let bricksWide = 0; bricksWide < divideW; bricksWide++) {
    push();

    translate(brickSizeW * bricksWide, 0);

    for (let bricksHigh = 0; bricksHigh < divideH; bricksHigh++) {
      translate(0, brickSizeH * bricksHigh);

      let col = random(getPalette(bricksWide, bricksHigh));

      makeBrick(brickSizeW, brickSizeH, col);
      translate(0, -brickSizeH * bricksHigh);
    }
    pop();
  }

  divideH = divideH / 2;
  brickSizeH = heightScaled / divideH;

  for (let bricksWide = 0; bricksWide < divideW; bricksWide++) {
    push();

    translate(brickSizeW * bricksWide, 0);

    for (let bricksHigh = 0; bricksHigh < divideH; bricksHigh++) {
      translate(0, brickSizeH * bricksHigh);

      let col = random(getPalette(bricksWide, bricksHigh));

      noFill();
      //   stroke("red");
      rect(0, 0, brickSizeW, brickSizeH);

      translate(0, -brickSizeH * bricksHigh);
    }
    pop();
  }

  if (downloadParam) {
    saveCanvas(c, hashParam, "png");
  }
}

function makeBrick(brickSizeW, brickSizeH, color) {
  for (let x = 0; x < brickSizeW; x += resolution) {
    for (let y = 0; y < brickSizeH; y += resolution) {
      let noiseVal = noise(x * 0.01, y * 0.01, resolution);

      let mappedNoise = Math.floor(map(noiseVal, 0, 1, 5, 69));
      let noiseToAdd = hex(mappedNoise, 2);

      fill(color + noiseToAdd);
      rect(x, y, resolution, resolution);
    }
  }
}
