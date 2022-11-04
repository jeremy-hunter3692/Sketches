const canvasSketch = require('canvas-sketch')
// const math = require('canvas-sketch-util/math')
// const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true,

  playbackRate: 'throttle',
  fps: 2,
}
let index = 2
const sketch = () => {
  const colourArray = ['red', 'white', 'green', 'blue', 'black', 'black']
  const lineColourArray = ['blue', 'black', 'green ', 'aqua', 'white', 'white']

  return ({ context, width, height }) => {
    if (Math.random() > 0.9) {
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
          // if (Math.random() > 0.6) {
          //   let off2 = off - 0.5
          //   context.beginPath()
          //   context.lineWidth = 2
          //   context.rect(x + off2 / 4, y + off2 / 4, w - off2, h - off2)
          //   context.strokeStyle = 'red'
          //   context.stroke()
          // }

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

canvasSketch(sketch, settings)
