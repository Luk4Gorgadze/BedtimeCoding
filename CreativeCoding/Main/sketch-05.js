const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')
const tweakpane = require('tweakpane')
const settings = {
  dimensions: [1080, 1080],
  animate:true
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin:1,
  scaleMax:1
}

const sketch = () => {
  return ({ context, width, height,frame }) => {
    context.fillStyle = 'rgb(200,60,60)';
    context.fillRect(0, 0, width, height);

    const rows = params.cols;
    const cols = params.rows;
    const numCells = cols * rows;
    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;

      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const n = random.noise2D(x + frame * 20, y, 0.001);
      const angle = n * Math.PI * 0.3
      const scale = math.mapRange(n,-1,1,params.scaleMin,params.scaleMax)

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      context.rotate(angle);

      // context.lineWidth = 4;


      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.lineWidth = scale;
      context.strokeStyle = 'white';

      context.stroke();

      context.restore();

    }

  };
};

const createPane = () => {
  const pane = new tweakpane.Pane();
  let folder;
  folder = pane.addFolder({title:"Grid"})
  folder.addInput(params,'cols',{min:2,max:50,step:1})
  folder.addInput(params,'rows',{min:2,max:50,step:1})
  folder.addInput(params,'scaleMin',{min:1,max:100})
  folder.addInput(params,'scaleMax',{min:1,max:100})
}
createPane();
canvasSketch(sketch, settings);
