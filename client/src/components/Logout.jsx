import React, { Fragment, useContext } from 'react'
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { setUserDetails, setMsg } = useContext(userContext);
    const nav = useNavigate();

    const logoutUser = (e) => {
        e.preventDefault();
        localStorage.clear();
        setMsg("Logout Successfully");
        setUserDetails(null);
        nav('/login');
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
        <Fragment>
            <div className="page logout_page">
                <div className="main">
                    <p className="logoutDesc">Are you wants to Logout?</p>
                    <button onClick={(e) => logoutUser(e)} className='logoutBtn'>Logout</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Logout