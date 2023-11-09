import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function Register() {
  return (
    <Fragment>
      <section className="page form_page">
        <form autoComplete='OFF'>
          <h1 className="form_title">Sign up an account</h1>
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
          <div className="form_group">
            <label htmlFor="cpwd">Re-Passord</label>
            <input type="password" name="cpwd" id="cpwd" />
          </div>
          <input type="submit" value="Register" />
          <p className="request">Already have an account? <Link to={'/login'}>Login</Link></p>
        </form>
      </section>
    </Fragment>
  )
}

export default Register