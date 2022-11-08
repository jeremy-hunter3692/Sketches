import React from 'react'
import Sketch1 from './Sketch1.jsx'
import Sketch2 from './Sketch2.jsx'
import Sketch3 from './Sketch3.jsx'
import Circles from './Circles.jsx'
import Sketch4 from './Sketch4.jsx'
import SketchGrid from './Sketchgrid.jsx'
import Sketch5 from './Sketch5.jsx'
import Sketch7 from './Sketch7.jsx'

const display = {
  sketch1: <Sketch1 />,
  sketch2: <Sketch2 />,
  sketch3: <Sketch3 />,
  circles: <Circles />,
  sketch4: <Sketch4 />,
  sketch7: <Sketch7 />,
  sketch5: <Sketch5 />,
  sketch6: <SketchGrid />,
}

function Container({ state }) {
  return <div className="display">{display[state]}</div>
}

export default Container
