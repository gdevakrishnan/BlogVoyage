import React, { Fragment, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import userContext from '../context/userContext';
import { getUserDetails } from '../services/ServiceWorkers';

function Login() {
  const initialState = { uname: "", gmail: "", pwd: "" };
  const [userDetails, setUserDetails] = useState(initialState);
  const { setMsg } = useContext(userContext);
  const nav = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails.uname.trim() == "" || userDetails.gmail.trim() == "" || userDetails.pwd.trim() == "") {
      setMsg("Enter all the Fields");
      return;
    }

    if (!(validator.isEmail(userDetails.gmail.trim()))) {
      setMsg("Invalid Email");
      return;
    }

    if (userDetails.pwd.trim().length < 8) {
      setMsg("Password needs minimum 8 charachters");
      return;
    }

    getUserDetails(userDetails)
      .then((response) => {
        setMsg(response.message);
        if (response.message === "Login Successfully") {
          localStorage.setItem("token", response.token);
          nav('/');
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
          setUserDetails(initialState);
        }
      });
  }

  return (
    <Fragment>
      <section className="page form_page">
        <form autoComplete='OFF' onSubmit={(e) => handleSubmit(e)}>
          <h1 className="form_title">Sign in an account</h1>
          <div className="form_group">
            <label htmlFor="uname">User Name</label>
            <input
              type="text"
              name="uname"
              id="uname"
              onChange={(e) => handleEdit(e)}
              value={userDetails.uname}
            />
          </div>

          <div className="form_group">
            <label htmlFor="gmail">Email</label>
            <input
              type="email"
              name="gmail"
              id="gmail"
              onChange={(e) => handleEdit(e)}
              value={userDetails.gmail}
            />
          </div>

          <div className="form_group">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              onChange={(e) => handleEdit(e)}
              value={userDetails.pwd}
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