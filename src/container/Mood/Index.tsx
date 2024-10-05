import React from 'react'
import Expresion from '../../view/Expresion'
import { Outlet } from 'react-router-dom'

const Mood:React.FC = () =>{
  return (
    <>
    <div>
        <Expresion/>
        <Outlet/>
    </div>
    </>
  )
}

export default Mood