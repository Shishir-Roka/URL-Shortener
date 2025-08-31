import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        

      </Routes>

      
    </div>
  )
}

export default App
