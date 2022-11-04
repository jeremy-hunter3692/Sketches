import React from 'react'
import Sketch1 from './Sketch1.jsx'
import Sketch2 from './Sketch2.jsx'
import Sketch3 from './Sketch3.jsx'
import Circles from './Circles.jsx'
// const thing = sketch1()
// console.log(thing)
// const array = ['./sketchogfile', './sketch-02']
const display = {
  sketch1: <Sketch1 />,
  sketch2: <Sketch2 />,
  sketch3: <Sketch3 />,
  circles: <Circles />,
}

function Container({ state }) {
 
  return <div className="display">{display[state]}</div>
}

export default Container
