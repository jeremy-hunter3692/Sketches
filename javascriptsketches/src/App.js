import React, { useState } from 'react'
import Container from './Container'
import Warning from './Warning'
import './App.css'

const sketchesSelector = [
  'sketch4',
  'sketch6',
  'sketch5',
  'sketch3',
  'circles',
  'sketch1',
  'sketch2',
  'sketch7',
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
            <br></br>
            <button
              onClick={() => {
                if (index === 8) {
                  setIndex(0)
                } else {
                  setIndex(index + 1)
                }
                console.log('click', index, sketchesSelector[index])
              }}
            >
              Next
            </button>{' '}
          </div>
        )}
      </div>
    </>
  )
}

export default App
