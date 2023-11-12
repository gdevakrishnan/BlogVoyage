import React, { Fragment, useContext } from 'react'
import userContext from '../context/userContext'
import PageNotFound from './PageNotFound';
import { useNavigate } from 'react-router-dom';

function Blog() {
    const { aBlogDetails, setABlogDetails } = useContext(userContext);
    const nav = useNavigate();
    const backBtn = (e) => {
        e.preventDefault();
        nav('/blogs');
        setABlogDetails(null);
    }

    return (
        <Fragment>
            {
                (aBlogDetails) ? (
                    <section className='page Ablog_page'>
                        <div className="main">
                            <div className="btn">
                                <button className="backBtn" onClick={(e) => backBtn(e)}>Back</button>
                            </div>
                            <div className="content">
                                <h1 className='blogTitle'>{aBlogDetails.blogTitle}</h1>
                                <p className='blogAuthor'>Author: {aBlogDetails.uname}</p>
                                <p className='blog'>
                                    {aBlogDetails.blog}
                                </p>
                            </div>
                        </div>
                    </section>
                ) : (
                    <PageNotFound />
                )
            }
        </Fragment>
    )
}

export default Blog