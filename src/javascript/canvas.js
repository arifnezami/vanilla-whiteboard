

import Tool from './toolEvents'

let Canvas = (() => { // Canvas app for handling canvas controls

  let context = document.getElementById('canvas-0').getContext('2d'),
    current = {},
    drawing = false;
  
  function registerCanvasEvents() {  // register on canvas mouse handlers
    document.getElementById("mainDiv").addEventListener('mousedown', onMouseDown);
    document.getElementById("mainDiv").addEventListener('mousemove', onMouseMove);
    document.getElementById("mainDiv").addEventListener('mouseout', onMouseUp);
    document.getElementById("mainDiv").addEventListener('mouseup', onMouseUp);
  }

  function setContext(ctx) { // setting context
    context = ctx
  }

  function getContext() { // getting context
    return context
  }

  function drawLine(x0, y0, x1, y1, emit) {  
    context.strokeStyle = Tool.getPenColor();
    context.lineWidth = Tool.getPenSize();
    context.lineCap = "round";
    context.beginPath();
    if (Tool.getToolType() === 'pen') {
      context.globalCompositeOperation = "source-over";
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.stroke();
    } else {
      context.globalCompositeOperation = "destination-out";
      context.arc(x0, y0, 15, 0, Math.PI * 2, false);
      context.fill();
    }
    context.closePath();
    if (!emit) return;
  }


  function onMouseMove(e) {
    if (!drawing) return;
    drawLine(current.x, current.y, e.clientX, e.clientY, true);
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onMouseUp(e) {
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX, e.clientY, true);
  }

  function onMouseDown(e) {
    drawing = true;
    current.x = parseInt(e.clientX);
    current.y = parseInt(e.clientY);
  }

  return {
    registerCanvasEvents: registerCanvasEvents,
    setContext: setContext,
    getContext: getContext
  }

})()

export default Canvas