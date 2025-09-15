import { useState } from 'react'
import './index.css'
import { Login } from './auth/login'
import { useUser } from './context/userProvider';
import { Home } from './pages/home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Register } from './auth/register';
import { AddProject } from './project/addproject';
import { PublicProject } from './project/publicproject';
import { PrivateProject } from './project/privateproject';
import { Navbar } from './pages/navbar';
import { Projects } from './pages/projects';
import { Profile } from './pages/profile';
import ErrorPage from './pages/404';
import { Toaster } from 'react-hot-toast';

function App() {
  const {authuser} = useUser();

  return (
    <>
    <BrowserRouter>
    <Toaster position="top-center font-medium" reverseOrder={false} />
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={authuser ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="/login" element={authuser ? <Navigate to='/' /> : <Login />}/>
        <Route path="/register" element={authuser ? <Navigate to='/' /> : <Register />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/privateprojects" element={authuser ? <PrivateProject /> : <Navigate to="/login" />}/>
        <Route path="/publicprojects" element={<PublicProject/>}/>
        <Route path="/addproject" element={authuser ? <AddProject /> : <Navigate to="/login" />}/>
        <Route path="*" element={<ErrorPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;