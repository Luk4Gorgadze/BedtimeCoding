const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const settings = {
  dimensions: [1080, 1080]
};

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#ee5253";
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black'

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.1;
    const h = height * 0.005;

    let x, y;

    const num = random.range(1, 100);
    const radius = width * 0.3

    context.beginPath();
    context.arc(cx, cy, random.range(0, radius / 2), 0, math.degToRad(360));
    context.fill()
    context.beginPath();
    context.arc(cx, cy, random.range(0, radius / 2), 0, math.degToRad(360));
    context.stroke()

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num)
      const angle = slice * i;

      x = cx + radius * Math.cos(angle)
      y = cy + radius * Math.sin(angle)

      context.save();
      context.translate(x, y)
      context.rotate(angle)
      context.scale(random.range(.2, 4), random.range(.2, 0.5))

      context.beginPath();
      context.rect(-w / 2, random.range(0, -h * .5), w, random.range(2, 30));
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.lineWidth = random.range(5, 20);
      context.arc(0, 0, radius * random.range(.7, 1.3), 0, slice * random.range(1, -4), slice * random.range(1, 2));
      context.stroke();
      context.restore();

    }



    // context.beginPath();
    // context.arc(0, 0, 50,0, Math.PI * 2);
    // context.fill();




  };
};

canvasSketch(sketch, settings);
