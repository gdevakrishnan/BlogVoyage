import React, { Fragment, useContext, useState } from 'react'
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';
import { createUserDetails } from '../services/ServiceWorkers';
import userContext from '../context/userContext';

function Register() {
  const initialState = { uname: "", gmail: "", pwd: "", cpwd: "" };
  const [userDetails, setUserDetails] = useState(initialState);
  const { setMsg } = useContext(userContext)
  const nav = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails.uname.trim() == "" || userDetails.gmail.trim() == "" || userDetails.pwd.trim() == "" || userDetails.cpwd.trim() == "") {
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
    
    if (!(userDetails.pwd.trim() === userDetails.cpwd.trim())) {
      setMsg("Password Mismatch");
      return;
    }

    createUserDetails({ uname: userDetails.uname, gmail: userDetails.gmail, pwd: userDetails.pwd })
      .then((response) => {
        setMsg(response.message);
        if (response.message === "Registered Successfully") {
          nav('/login');
          setUserDetails(initialState);
        }
      })
      .catch((e) => console.log(e.message));
  }

  return (
    <Fragment>
      <section className="page form_page">
        <form autoComplete='OFF' onSubmit={(e) => handleSubmit(e)}>
          <h1 className="form_title">Sign up an account</h1>
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
              type="text"
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

          <div className="form_group">
            <label htmlFor="cpwd">Re-Password</label>
            <input
              type="password"
              name="cpwd"
              id="cpwd"
              onChange={(e) => handleEdit(e)}
              value={userDetails.cpwd}
            />
          </div>

          <input
            type="submit"
            value="Register"
          />
          <p className="request">Already have an account? <Link to={'/login'}>Login</Link></p>
        </form>
      </section>
    </Fragment>
  )
}

export default Register