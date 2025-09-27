import { useState } from 'react'
import './App.css'
import MyMap from './Maps'
import Footer from './Footer' 

function App() {


  return (
    <>
    <header className="header">
    <h1>Rent Me</h1>
    </header>
    <MyMap/>
    <Footer/>
    </>
  )
}

export default App
