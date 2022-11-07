import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')

let text = 'END'
let fontSize
let fontFamily = 'serif'

let lineArray = []

const sketch = ({ context, width, height }) => {
  const cell = 1
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const numCells = cols * rows

  typeCanvas.width = cols
  typeCanvas.height = rows

  const agents = []

  for (let i = 0; i < 5520; i++) {
    const x = random.range(0, width)
    const y = random.range(0, height)

    agents.push(new Agent(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    fontSize = cols / 4
    //typeContext.fillStyle = '#dadada';
    typeContext.font = `${fontSize}px ${fontFamily}`
    typeContext.textBaseline = 'top'

    //For text interaction
    const metrics = typeContext.measureText(text)
    const mx = metrics.actualBoundingBoxLeft * -1
    const my = metrics.actualBoundingBoxAscent * -1
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

    const tx = (cols - mw) * 0.5 - mx
    const ty = (rows - mh) * 0.5 - my

    typeContext.fillStyle = 'white'
    typeContext.fillRect(0, 0, cols, rows)

    typeContext.save()
    typeContext.translate(tx, ty)

    typeContext.beginPath()
    //typeContext.rect(mx, my, mw, mh );
    typeContext.stroke()
    typeContext.fillStyle = 'black'
    typeContext.fillText(text, 0, 0)
    typeContext.restore()

    context.drawImage(typeCanvas, 0, 0)

    agents.forEach((agent) => {
      agent.update()
      agent.draw(context)
      // agent.bounce(width, height)
    })
  }
}

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Agent {
  constructor(x, y, colour) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-10, 10), random.range(-10, 10))
    this.radius = random.range(4, 12) //radius/size of dots
    // below if for grey background cricles
    /*if (this.radius >= 10) {this.colour = 'black'}
      if (this.radius < 10 && this.radius >= 6) {this.colour = '#202020'}
      if (this.radius < 6 && this.radius > 5) {this.colour = '#505050'}
      if (this.radius <= 5 ) {this.colour = '#808080'}*/
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  //For keeping agents inside canvas boundary
  bounce(width, height) {
    const midW = width * 0.5
    const midH = height * 0.5
    if (this.pos.x <= 20 || this.pos.x >= width - 20) this.vel.x *= -1
    if (this.pos.y <= 20 || this.pos.y >= height - 20) this.vel.y *= -1
    if (this.pos.x <= Math.floor(lineArray[0]) && this.pos.x === midH)
      this.vel.x *= -1
    if (this.pos.y <= Math.floor(lineArray[0]) && this.pos.y === midW)
      this.vel.y *= -1
  }

  draw(context) {
    context.save()
    context.translate(this.pos.x, this.pos.y)

    context.lineWidth = 4
    context.beginPath()
    //context.fillRect(0, 0, 9, 9 )
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.strokeStyle = this.colour //colourArray[randomColourVar];
    context.stroke()
    context.fillStyle = this.colour
    context.fill()
    context.restore()
  }
}

const Sketch7 = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default Sketch7
