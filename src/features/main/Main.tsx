import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  function handleAddConsultation(){
    try {
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
        <h1>Main</h1>
        <Outlet />
        <button onClick={handleAddConsultation}>ADD Consultation</button>
        </div>
  )
}

export default Main