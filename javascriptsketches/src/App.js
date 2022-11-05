import React, { useState } from 'react'
import Container from './Container'
import Warning from './Warning'
import './App.css'

const sketchesSelector = [
  // 'sketch5',
  'circles',
  'sketch4',
  'sketch1',
  'sketch2',
  'sketch3',
  'sketch6',
]

function App() {
  const [index, setIndex] = useState(0)
  const [warning, setWarning] = useState(true)

  return (
    <>
      <div className="app">
        {warning ? (
          <div>
            <Warning />{' '}
            <button
              onClick={() => {
                setWarning(false)
              }}
            >
              Continue?
            </button>
          </div>
        ) : (
          <div>
            {' '}
            <Container state={sketchesSelector[index]} />
            <button
              onClick={() => {
                setIndex(index + 1)
                console.log('click', index, sketchesSelector[index])
              }}
            >
              Change
            </button>{' '}
          </div>
        )}
      </div>
    </>
  )
}

export default App
