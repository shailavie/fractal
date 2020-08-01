import {
    getRandomIntInclusive,
    getRandomColor,
    degToRad,
  } from "./utils.js";
  let ctx;
  
  const angleChange = 60;
  const lengthChange = 1.0004;
  const thicknessChange = 0.6;
  const length = 50;
  const thickness = 1;
  const angleTilt = 0.2;
  const depth = 10;
  
  const drawFractal = ({ xOrig, yOrig, lineLength, thickness, angle, depth }) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "gold"; //getRandomColor();
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
  
    drawFractal({
      xOrig: 0,
      yOrig: -lineLength,
      lineLength: lineLength * lengthChange,
      thickness: thickness * thicknessChange,
      angle: angle - angleChange,
      depth: depth - 1,
    });
  
    drawFractal({
      xOrig: 0,
      yOrig: -lineLength,
      lineLength: lineLength * lengthChange,
      thickness: thickness * thicknessChange,
      angle: angle + angleChange,
      depth: depth - 1,
    });
  
    drawFractal({
      xOrig: 0,
      yOrig: lineLength,
      lineLength: lineLength * lengthChange,
      thickness: thickness * thicknessChange,
      angle: angle + angleChange,
      depth: depth - 1,
    });
  
    drawFractal({
      xOrig: 0,
      yOrig: lineLength,
      lineLength: lineLength * lengthChange,
      thickness: thickness * thicknessChange,
      angle: angle - angleChange,
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
      yOrig: innerHeight / 2,
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