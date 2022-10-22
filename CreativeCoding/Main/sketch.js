const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048, 2048],
  animate: false,
  // Set loop duration to 3
  duration: 10,
  fps: 30
  // Use a small size for better GIF file size
};

const sketch = () => {
 
  generate = () => {
    
  }
  let timeToChange = false
  let ran = false
  const timer = setInterval(() => {
    ran = !ran
    console.log('Tick!');
  },1000);

  const onClick = () => {
    console.log('Screen clicked!');
  };
  window.addEventListener('click', onClick);


  return {
    render({ context, width, height, frame }) {
      ran = ran
      context.fillStyle = "blue";
      context.lineWidth = 4;
      // context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.fillStyle = "#ecf0f1";
      context.fillRect(0, 0, width, height);
      context.fill();

      const w = width / 7;
      const h = height / 7;
      const gap = 25;
      let x, y;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          context.lineWidth = Math.random() * 10 + 0.5;
          x = 250 + (w + gap) * i;
          y = 250 + (h + gap) * j;

          context.beginPath();
          context.rect(x, y, w, h);
          context.strokeStyle = '#e74c3c';
          context.stroke();

          if (Math.random() > 0.8) {
            context.lineWidth = Math.random() * 2 + 0.5;
            context.beginPath();
            context.fillStyle = "#e74c3c";
            context.fillRect(x + 40, y + 40, w - 80, h - 80);
            context.fill();
            context.rect(x + 40, y + 40, w - 80, h - 80);
            context.strokeStyle = '#e74c3c';
            context.stroke();
          }
        }
      }

    },
    unload () {
      clearInterval(timer);
      window.removeEventListener('click', onClick);
    }
  }
};




canvasSketch(sketch, settings);
