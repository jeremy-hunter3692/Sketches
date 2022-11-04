import React, { useState } from 'react'
import Container from './Container'
import Warning from './Warning'
import './App.css'

function App() {
  const [bool, setBool] = useState(true)
  const [index, setIndex] = useState(false)
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
            <Container index={index} />
            <button
              onClick={() => {
                setIndex(!index)
                console.log('click', index)
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
