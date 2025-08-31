import React, { useState } from 'react'
import Login from '../Components/Login'
import Register from '../Components/Register'

function Authuser() {
    const [login,setLogin] = useState(true)
  
  return (
   <>
     {login? <Login state={setLogin}/>:<Register state={setLogin}/> }
   </>
  )
}

export default Authuser
