import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [menuBtn, setMenuBtn] = useState(true);
    const changeBtn = (e) => {
        e.preventDefault();
        setMenuBtn(!menuBtn);
    }
    return (
        <Fragment>
            <header>
                <nav>
                    <input type="checkbox" name="menu" id="menu" />
                    <h1 className='logo'>Blog Voyage</h1>
                    <label htmlFor="menu">
                        <i className={(menuBtn) ? "fa fa-bars menu" : "fa fa-close menu"} onClick={(e) => changeBtn(e)}></i>
                    </label>
                    <ul style={(menuBtn) ? {right: "-100%"} : {right: "0px"}}>
                        <li>
                            <Link to={'/'} >Home</Link>
                        </li>
                        <li>
                            <Link to={'/register'} >Register</Link>
                        </li>
                        <li>
                            <Link to={'/login'} >Login</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default Navbar