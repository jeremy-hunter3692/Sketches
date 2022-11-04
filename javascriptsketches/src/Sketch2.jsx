import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  playbackRate: 'throttle',
  fps: 6,
}

const sketch = () => {
  let black = true
  return ({ context, width, height }) => {
    if (Math.random() > 0.9) {
      black = !black
      // console.log('random', black)
    }
    context.fillStyle = black ? 'white' : 'black'
    context.fillRect(0, 0, width, height)

    function randNo(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    //console.log(rNo);
    //context.lineWidth = (width * rNo)/1000;
    //console.log((600 * rNo)/1000);
    context.strokeStyle = black ? 'black' : 'white'

    const w = width * 0.05
    const h = height * 0.05
    const gap = width * 0.03
    const ix = width * 0.05
    const iy = height * 0.05

    const off = width * 0.1
    let x, y

    let rNo = randNo(0.01, 1)

    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        x = ix + (w + gap) * i
        y = iy + (h + gap) * j

        context.beginPath()
        context.fillStyle = black ? 'white' : 'black'
        context.fillRect(x, y, w, h)
        context.stroke()

        if (Math.random() > 0.3) {
          context.lineWidth = rNo
          //context.strokeStyle = 'white';
          context.beginPath()
          context.fillStyle = black ? 'black' : 'white'
          context.fillRect(x + off / 2, y + off / 2, w - off, h - off)
          context.stroke()
        }
      }
    }
  }
}

const Sketch2 = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default Sketch2
