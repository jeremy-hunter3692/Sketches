import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')

let extraThick

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

const sketch = ({ context, width, height }) => {
  const agents = []

  for (let i = 0; i < 30; i++) {
    const x = random.range(25, width - 25)
    const y = random.range(25, height - 25)

    agents.push(new Agent(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < agents.length; i++) {
      if (Math.random() > 0.99) {
        extraThick = 10
      } else {
        extraThick = 1
      }

      let randomMaxLineThickness = random.range(1, extraThick)

      const agent = agents[i]

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j]

        const dist = agent.pos.getDistance(other.pos)
        if (dist < 800 && dist > 400) continue

        context.lineWidth = math.mapRange(
          dist,
          0,
          200,
          randomMaxLineThickness,
          0.1
        )
        context.beginPath()
        context.moveTo(agent.pos.x, agent.pos.y)
        context.lineTo(other.pos.x, other.pos.y)
        context.strokeStyle = 'white'
        context.stroke()
      }
    }

    agents.forEach((agent) => {
      agent.update()
      agent.draw(context)
      agent.bounce(width, height)
    })
  }
}

// canvasSketch(sketch, settings)

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

const veloctiyNo = 0.1
class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(
      random.range(veloctiyNo, -veloctiyNo),
      random.range(veloctiyNo, veloctiyNo)
    )
    this.radius = 0.1 //random.range(1,1);
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

    //context.lineWidth = 1;

    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.fillStyle = 'white'
    context.fill()
    //context.stroke();

    context.restore()
  }
}

const Sketch4 = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default Sketch4
