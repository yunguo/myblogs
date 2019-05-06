const main = () => {
  const canvas = document.createElement('canvas');
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  // 设置画布宽高
  canvas.width = width;
  canvas.height = height;
  canvas.style = 'background: #b6e2e1;';
  document.body.appendChild(canvas);
  const context = canvas.getContext('2d');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
  }
  let r1 = width / 5;
  let r2 = r1 / 3;
  let x1, x2, y1, y2;
  context.translate(r1 * 2.5, r1 * 1.2);

  function loop() {
    for (var i = 0; i <= 5; i++) {
      x1 = r1 * Math.cos((54 + i * 72) / 180 * Math.PI);
      y1 = r1 * Math.sin((54 + i * 72) / 180 * Math.PI);
      x2 = r2 * Math.cos((18 + i * 72) / 180 * Math.PI);
      y2 = r2 * Math.sin((18 + i * 72) / 180 * Math.PI);
      context.strokeStyle = '#ff867b';
      context.lineTo(x2, y2);
      context.lineTo(x1, y1);
      context.stroke();
    }
    context.closePath();
    context.beginPath();
    context.strokeStyle = '#3b7eb3';
    context.arc(0, 0, r1, 40, 0, Math.PI * 2, true);
    context.clip();
    context.stroke();
  }

  requestAnimationFrame(loop);
};
const drawLine = ({context, start, end, fill, strokeStyle}) => {
  context.fillStyle = fill;
  context.strokeStyle = strokeStyle;
  if (start) {
    context.moveTo(...start);
  }
  context.lineTo(...end);
  fill && context.fill();
  strokeStyle && context.stroke();
};
window.onload = () => {
  main();
};
