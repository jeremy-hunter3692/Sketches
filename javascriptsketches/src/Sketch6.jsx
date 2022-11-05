import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'

const random = require('canvas-sketch-util/random')
// const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

const sketch = ({ context, width, height }) => {
  const agents = []

  for (let i = 0; i < 3500; i++) {
    const x = random.range(25, width - 25)
    const y = random.range(25, height - 25)

    agents.push(new Agent(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i]

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j]
      }
    }

    agents.forEach((agent) => {
      agent.update()

      agent.draw(context)
      agent.bounce(width, height)
    })
  }
}

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

/*c onst animate = () => {
  console.log('beep boop');
  requestAnimationFrame(animate);
}
animate(); */

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(1.5, -1.5), random.range(-1.5, 1.5))
    this.radius = random.range(1, 10)
  }

  bounce(width, height) {
    if (this.pos.x <= 35 || this.pos.x >= width - 35) this.vel.x *= -1
    if (this.pos.y <= 35 || this.pos.y >= height - 35) this.vel.y *= -1
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  draw(context) {
    context.save()
    context.translate(this.pos.x, this.pos.y)

    context.beginPath()

    if (Math.random() < 0.999) {
      context.fillStyle = '#eeeeee'
    } else {
      context.fillStyle = 'black' //'#dadada'
    }
    //contest.stroke = 'grey';

    context.arc(0, 0, this.radius + 6, 0, Math.PI * 2)

    context.fill()

    context.restore()

    context.save()
    context.translate(this.pos.x, this.pos.y)

    context.lineWidth = 0

    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.fillStyle = 'black'
    context.fill()
    //context.stroke();

    context.restore()
  }
}

const Sketch6 = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default Sketch6
