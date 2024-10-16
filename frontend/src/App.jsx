import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import SubmissionForm from './components/SubmissionForm'
import AdminLoginForm from './components/AdminLoginForm'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
   <Routes>
    <Route path='/' element={<AdminLoginForm/>}/>
    <Route path='/dashboard' element={<AdminDashboard/>}/>
    <Route path='/userform' element={<SubmissionForm/>}/>
    </Routes>
    </BrowserRouter></>
  )
}

export default App

