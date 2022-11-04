import React, { useState } from 'react'
import Sketch1 from './Sketch1.jsx'
import Sketch2 from './Sketch2.jsx'

// const thing = sketch1()
// console.log(thing)
// const array = ['./sketchogfile', './sketch-02']

function Container({ index }) {
  return <div className="display">{index ? <Sketch2 /> : <Sketch1 />}</div>
}

export default Container
