import { getRandomIntInclusive, getRandomColor, degToRad } from "./utils.js";
let ctx;

const angleChange = 7;
const lengthChange = 0.8;
const thicknessChange = 0.75;
const length = 150;
const thickness = 10;
const angleTilt = 0;
const depth = 15;
const randRange = 20;

const drawFractal = ({ xOrig, yOrig, lineLength, thickness, angle, depth }) => {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = depth < 5 ? "green" : "#a4a3a9"; //getRandomColor();
  ctx.lineWidth = thickness;
  ctx.translate(xOrig, yOrig);
  ctx.rotate(degToRad(angle + angleTilt));
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -lineLength);
  ctx.stroke();

  if (depth === 0) {
    ctx.restore();
    return;
  }

  const rand = depth < 5 ? getRandomIntInclusive(-randRange, randRange) : 0;

  drawFractal({
    xOrig: 0,
    yOrig: -lineLength + rand, //, (depth === 3) ? getRandomIntInclusive(-10, 10) : 0,
    lineLength: lineLength * lengthChange,
    thickness: thickness * thicknessChange,
    angle: angle - angleChange,
    depth: depth - 1,
  });

  drawFractal({
    xOrig: 0,
    yOrig: -lineLength + rand, // (depth === 3) ? getRandomIntInclusive(-10, 10) : 0,
    lineLength: lineLength * lengthChange,
    thickness: thickness * thicknessChange,
    angle: angle + angleChange,
    depth: depth - 1,
  });

  ctx.restore();
};

(() => {
  const c = document.getElementById("canvas");
  c.width = document.body.clientWidth;
  c.height = document.body.clientHeight;
  ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  drawFractal({
    xOrig: innerWidth / 2,
    yOrig: innerHeight,
    lineLength: length,
    thickness: thickness,
    angle: 0,
    depth: depth,
  });
})();

export const saveCanvas = (file) => {
  console.log("got file", file);
  window.sessionStorage.setItem("file", JSON.stringify(file));
};
