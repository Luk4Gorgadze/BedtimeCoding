const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const settings = {
  dimensions: [1080, 1080],
  animate: false,
  duration: .1,
  fps: 20
};

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min
}

const sketch = () => {
  let num =  parseInt(random.range(2,4) * 2 - 1);

  // setInterval(() => {
  //   num = 12
  //   // console.log()
  // }, 1000);
 
  return {
    render({ context, width, height, frame }) {
      context.fillStyle = "#f5f6fa";
      context.fillRect(0, 0, width, height);
      context.lineCap = 'round';
      // num += .1;
      

      

      context.fillStyle = 'black'

      const cx = width * 0.5;
      const cy = height * 0.5;

      let x, y;
      context.fillStyle = "##f5f6fa";
      // context.restore();
      // r = 12cos(3theta)
      let lx,ly = 0
      context.strokeStyle='#e84118';
      for (let q = 0; q < 360; q++) {
        
        const angle = math.degToRad(q)
        context.save();
        context.translate(cx, cy)
        // context.rotate(angle);
        // x = rcosq = 12cos(3theta)*cosq
        // x = rsinq = 12cos(3theta)*sinq
        context.lineWidth=5;

        context.moveTo(x, y);
        r = 500 * Math.cos(num * angle)
        x = r * Math.cos(angle)
        y = r * Math.sin(angle)
        lx = x;
        ly = y;
        
        // context.strokeStyle='#e84118';
        context.lineTo(x, y);
        context.stroke();
        context.restore();  
      }
      
      // context.strokeStyle='black';
      for (let q = 0; q < 360; q++) {
        
        const angle = math.degToRad(q)
        context.save();
        context.translate(cx, cy)
        // context.moveTo(lx,ly)
        // context.rotate(angle);
        // x = rcosq = 12cos(3theta)*cosq
        // x = rsinq = 12cos(3theta)*sinq
        context.lineWidth=5;

        r = 400 * Math.cos(num * angle)
        x = r * Math.cos(angle)
        y = r * Math.sin(angle)
        context.moveTo(x, y);
        
        // context.strokeStyle='black';
        context.lineTo(x, y);
        context.stroke();
        context.restore();  
      }





    },
    unload () {
      clearInterval(timer);
      window.removeEventListener('click', onClick);
    }
  }
};

canvasSketch(sketch, settings);
