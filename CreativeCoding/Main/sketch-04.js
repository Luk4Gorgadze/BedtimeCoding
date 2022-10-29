const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math')
const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  for (let i = 0; i < 50; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);


    agents.push(new Agent(x, y))
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);
        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 5., .1)
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = other.color;

        context.stroke();

      }

    }


    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height)
    })


  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;

  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.radius = random.range(7, 20);
    this.vel = new Vector(random.range(-3, 3), random.range(-3, 3));
    // this.color = 'rgb(' + random.range(0, 255) + ',' + random.range(0, 255) + ',' + random.range(0, 255) + ')';
    this.color = 'black'
  }



  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= width) this.vel.y *= -1;
  }

  draw(context) {

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 2;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.strokeStyle = 'red';
    context.fill();
    context.stroke();

    context.restore();


  }
}