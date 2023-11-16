import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../context/userContext';

function Navbar() {
    const [menuBtn, setMenuBtn] = useState(true);
    const changeBtn = (e) => {
        e.preventDefault();
        setMenuBtn(!menuBtn);
    }
    const { userDetails } = useContext(userContext);

    return (
        <Fragment>
            <header>
                <nav>
                    <input type="checkbox" name="menu" id="menu" />
                    <h1 className='logo'>Blog Voyage</h1>
                    <label htmlFor="menu">
                        <i className={(menuBtn) ? "fa fa-bars menu" : "fa fa-close menu"} onClick={(e) => changeBtn(e)}></i>
                    </label>
                    <ul style={(menuBtn) ? { right: "-100%" } : { right: "0px" }}>
                        <li>
                            <Link to={'/'} >Home</Link>
                        </li>
                        {
                            (userDetails) ? (
                                <Fragment>
                                    <li>
                                        <Link to={'/blogs'} >Blogs</Link>
                                    </li>
                                    <li>
                                        <Link to={'/posts'} >Your Posts</Link>
                                    </li>
                                    <li>
                                        <Link to={'/new_post'} >New Post</Link>
                                    </li>
                                    <li>
                                        <Link to={'/logout'} >Logout</Link>
                                    </li>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <li>
                                        <Link to={'/register'} >Register</Link>
                                    </li>
                                    <li>
                                        <Link to={'/login'} >Login</Link>
                                    </li>
                                </Fragment>
                            )
                        }
                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default Navbar