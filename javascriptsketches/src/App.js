import React, { useState } from 'react'
import Container from './Container'
import './App.css'

function App() {
  const [bool, setBool] = useState(true)
  const [index, setIndex] = useState(false)

  return (
    <>
      <div className="app">
        <Container index={index} />
        <button
          onClick={() => {
            setIndex(!index)
            console.log('click', index)
          }}
        >
          Change
        </button>
      </div>
    </>
  )
}

export default App
