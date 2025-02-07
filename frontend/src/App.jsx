import React, { useEffect } from 'react'
import Navbar from './components/Navbar'

import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useAuthstore } from './store/useAuthStore'
import {Loader} from 'lucide-react';
import {Toaster} from 'react-hot-toast';


const App = () => {

  const {authUser , checkAuth , isCheckingAuth} = useAuthstore();

  useEffect(() => {
    checkAuth()
  } , []);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />   
      </div>
    )
  }


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
      </Routes>
      <Toaster position='bottom-center' />
    </div>
  )
}

export default App