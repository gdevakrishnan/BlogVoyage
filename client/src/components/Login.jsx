import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
  const initialState = {uname: "", gmail: "", pwd: ""};
  const [userDetails, setUserDetails] = useState(initialState);

  const handleEdit = (e) => {
    e.preventDefault();
    setUserDetails({...userDetails, [e.target.id]: e.target.value});
  }

  return (
    <Fragment>
      <section className="page form_page">
        <form autoComplete='OFF'>
          <h1 className="form_title">Sign in an account</h1>
          <div className="form_group">
            <label htmlFor="uname">User Name</label>
            <input
              type="text" 
              name="uname"
              id="uname" 
              onChange={(e) => handleEdit(e)}
              />
          </div>

          <div className="form_group">
            <label htmlFor="gmail">Email</label>
            <input
              type="text" 
              name="gmail"
              id="gmail" 
              onChange={(e) => handleEdit(e)}
              />
          </div>
          
          <div className="form_group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password" 
              name="pwd"
              id="pwd" 
              onChange={(e) => handleEdit(e)}
              />
          </div>
          
          <input 
            type="submit"
            value="Login" 
            />
          <p className="request">Don't have an account? <Link to={'/register'}>Register</Link></p>
        </form>
      </section>
    </Fragment>
  )
}

export default Login