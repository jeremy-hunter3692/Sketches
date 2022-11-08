import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    const cols = 20
    const rows = 20
    const numCells = cols * rows

    const gridWidth = width * 0.8
    const gridHeight = height * 0.8
    const cellWidth = gridWidth / cols
    const cellHeight = gridHeight / rows

    const margx = (width - gridWidth) * 0.5
    const margy = (height - gridHeight) * 0.5

    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cellWidth
      const y = row * cellHeight
      const w = cellWidth * 0.5
      const h = cellHeight * 0.5

      const n = random.noise2D(x + frame * 50, y * -1, 0.0003, 0.4)
      const angle = n * Math.PI * -1

      // const scale = ((n + 1) / 2) * 2 //convert noise range to only positive vaules

      context.save()
      context.translate(x, y)
      context.translate(margx, margy)
      context.translate(cellWidth * 0.5, cellHeight * 0.5)
      context.rotate(-angle)
      context.lineWidth = 100
      context.beginPath()
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.5, 0)
      context.strokeStyle = '#eeeeee'
      context.stroke()

      context.restore()
    }
  }
}

const SketchGrid = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default SketchGrid
