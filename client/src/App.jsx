import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import Footer from './components/Footer'

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={ <Dashboard /> } />
          <Route path={'/register'} element={ <Register /> } />
          <Route path={'/login'} element={ <Login /> } />
        </Routes>
        <Outlet />
        <Footer />
      </Router>
    </Fragment>
  )
}

export default App