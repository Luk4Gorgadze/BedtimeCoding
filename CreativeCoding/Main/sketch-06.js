const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math')
const tweakpane = require('tweakpane')
const settings = {
  dimensions: [2080, 1080],
  animate: true,
};

const params = {
  centerMass: 5000,
  agentNum: 10,
}

const sketch = ({ context, width, height }) => {
  const AgentAmount = 200;
  const G = -.00001;
  const agents = []
  for (let i = 0; i < AgentAmount - 1; i++) {
    let x = random.range(0, width);
    let y = random.range(0, height);
    currAgent = new Agent(x, y, true);
    agents.push(currAgent);
  }

  let centerAgent = new Agent(width / 2, height / 2, false, 500);
  agents.push(centerAgent)

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillStyle = 'rgba(255,255,255,0.3)'
    context.fillStyle = 'rgba(255,80,80,0.3)'
    context.fillRect(0, 0, width, height);

    // F = G * m1m2 / r^2
    // F = ma
    for (let i = 0; i < AgentAmount; i++) {
      const agent = agents[i];
      for (let j = 0; j < AgentAmount; j++) {
        if (i == j) continue;
        const otherAgent = agents[j];
        let difference = agent.pos.sub(otherAgent.pos);
        let r = difference.magnitude()
        let force;
        if (r > 0.001) {
          force = (G * agent.mass * otherAgent.mass) / r;
        }

        let dir = difference.div(r);
        dir = dir.mult(force)
        agent.force = agent.force.add(dir)

      }
    }


    centerAgent.updateParams(params.centerMass);
    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
    })

  };
};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;

  }
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(newVec) {
    return new Vector(this.x + newVec.x, this.y + newVec.y)
  }

  sub(newVec) {
    return new Vector(this.x - newVec.x, this.y - newVec.y)
  }

  mult(scalar) {
    return new Vector(this.x * scalar, this.y * scalar)
  }

  div(scalar) {
    return new Vector(this.x / scalar, this.y / scalar)
  }
}

class Agent {
  constructor(x, y, mover, mass) {
    this.pos = new Vector(x, y);
    this.mass = mass ? mass : random.range(100, 200);
    this.radius = this.mass / 20;
    this.velocity = new Vector(0, 0);
    this.force = new Vector(random.range(-2, 2), random.range(-2, 2));
    this.color = 'rgb(' + random.range(0, 255) + ',' + random.range(0, 255) + ',' + random.range(0, 255) + ')';
    this.mover = mover;

    if (random.range(0,1) > .5) {
      this.color = 'black'
    }
    else {
      this.color = 'white'
    }

    if(!this.mover){
      this.color = 'black'
    }
  }
  // F = G * m1m2 / r^2
  // F = ma
  update() {
    if (this.mover) {
      this.velocity = this.force
      this.pos = this.pos.add(this.velocity)
    }

    // console.log(this.pos)
  }

  updateParams(mass) {
    this.mass = mass;
    this.radius = this.mass / 200;
    console.log(this.mass)
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = .2;

    context.beginPath();
    // context.moveTo(this.pos.x,this.pos.y)
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.strokeStyle = 'black';
    context.fillStyle = this.color
    
    context.fill();
    context.stroke();
    context.restore();
  }

}

const createPane = () => {
  const pane = new tweakpane.Pane();
  let folder;
  folder = pane.addFolder({ title: "Mass" })
  folder.addInput(params, 'centerMass', { min: 2, max: 100000, step: 2 })

}
createPane();

canvasSketch(sketch, settings);
