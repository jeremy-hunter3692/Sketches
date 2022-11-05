const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};




let text = 'DOXA';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');
   
const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols =  Math.floor(width / cell); 
  const rows =  Math.floor(height / cell);
  const numCells = cols * rows; 

  typeCanvas.width = cols;
  typeCanvas.height = rows;

    return ({ context, width, height }) => {
      typeContext.fillStyle = 'black';
      typeContext.fillRect(0, 0, cols, rows);

      fontSize = cols * 0.25; 
      

      typeContext.fillStyle = '#dadada';
      typeContext.font = `${fontSize}px ${fontFamily}`;
      console.log(typeContext.font);
      typeContext.textBaseline = 'top';

      
      const metrics = typeContext.measureText(text);
      const mx = metrics.actualBoundingBoxLeft * -1;
      const my = metrics.actualBoundingBoxAscent * -1;
      const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
      const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      

      const tx = (cols - mw) * 0.5 - mx;
      const ty = (rows - mh) * 0.5 - my;


    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

     


    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
      console.log(typeData);
    
    context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
  

      for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      context.font = `${cell * 0.86}px ${fontFamily}`;

        context.fillStyle = `rgb(${r}, ${g}, ${b}, ${a})`; 

        console.log(`rgb(${r}, ${g}, ${b}, ${a}`);
        context.save();
        context.translate(x, y);
       
        context.translate(cell * 0.5, cell * 0.5)
         //context.fillRect(0,0, cell, cell);
        context.beginPath(); 
        //context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
        context.fill();
        context.fillText(text, 0 ,0);
        context.restore();
      

    }; 
  };
};

/*const onKeyUp = (e) => {
    text = e.key.toUpperCase();
    manager.render();
};

document.addEventListener('keyup', onKeyUp);
*/
const start = async() => {
 manager = await canvasSketch(sketch, settings);  
};

start();

