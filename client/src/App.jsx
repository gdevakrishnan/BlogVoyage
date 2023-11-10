import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import userContext from './context/userContext'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import Footer from './components/Footer'
import Message from './components/Message';

function App() {
  const [msg, setMsg] = useState(null);  
  const context = {
    msg,
    setMsg
  }

  return (
    <Fragment>
      <userContext.Provider value={ context }>
      <Router>
        <Navbar />
        <Message />
        <Routes>
          <Route path={'/'} index element={ <Dashboard /> } />
          <Route path={'/register'} element={ <Register /> } />
          <Route path={'/login'} element={ <Login /> } />
        </Routes>
        <Outlet />
        <Footer />
      </Router>
      </userContext.Provider>
    </Fragment>
  )
}

export default App