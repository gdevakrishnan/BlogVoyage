import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Fragment>
      <section className="page form_page">
        <form autoComplete='OFF'>
          <h1 className="form_title">Sign in an account</h1>
          <div className="form_group">
            <label htmlFor="uname">User Name</label>
            <input type="text" name="uname" id="uname" />
          </div>
          <div className="form_group">
            <label htmlFor="gmail">Email</label>
            <input type="text" name="gmail" id="gmail" />
          </div>
          <div className="form_group">
            <label htmlFor="pwd">Passord</label>
            <input type="password" name="pwd" id="pwd" />
          </div>
          <input type="submit" value="Login" />
          <p className="request">Don't have an account? <Link to={'/register'}>Register</Link></p>
        </form>
      </section>
    </Fragment>
  )
}

export default Login