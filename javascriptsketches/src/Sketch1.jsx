import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'

// const math = require('canvas-sketch-util/math')
// const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true,

  playbackRate: 'throttle',
  fps: 3,
}
let index = 2
const sketch = () => {
  const colourArray = ['red', 'white', 'white', 'blue', 'black', 'black']
  const lineColourArray = ['blue', 'black', 'black', 'aqua', 'white', 'white']

  return ({ context, width, height }) => {
    if (Math.random() > 0.95) {
      index > 4 ? (index = 0) : (index = index + 1)
    }

    context.fillStyle = colourArray[index]
    context.fillRect(0, 0, width, height)

    const w = width * 0.1
    const h = height * 0.1
    const gap = width * 0.03
    const ix = width * 0.17
    const iy = height * 0.17

    const off = width * 0.02

    let x, y

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i
        y = iy + (h + gap) * j

        context.beginPath()
        context.rect(x, y, w, h)
        context.strokeStyle = lineColourArray[index]
        context.stroke()

        if (Math.random() > 0.5) {
          context.beginPath()
          context.lineWidth = 4
          context.rect(x + off / 2, y + off / 2, w - off, h - off)
          context.strokeStyle = lineColourArray[index]

          context.stroke()
          context.lineWidth = 1
        }
      }
    }
  }
}

const Sketch1 = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default Sketch1
