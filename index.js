window.onload = function() {
  const canvas = document.getElementById('my-canvas');
  const context = canvas.getContext('2d');
  const rectSize = [100, 100];
  context.fillStyle = 'red';
  context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
  context.beginPath();
  context.rect(0.5 * canvas.width, 0.5 * canvas.height, rectSize[0], rectSize[1]);
  context.fill();
  context.translate(0.5 * rectSize[0], 0.5 * rectSize[1]);
};