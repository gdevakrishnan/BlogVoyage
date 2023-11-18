import React, { Fragment, useContext, useEffect, useState } from 'react'
import { getAllPosts } from '../services/ServiceWorkers'
import Loading from './Loading';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import NoDataFound from './NoDataFound';

function Blogs() {
    const { setABlogDetails } = useContext(userContext);
    const [blogs, setBlogs] = useState(null);
    const BASE_URL = "http://localhost:5000/public/thumbnails/";
    const nav = useNavigate();

    const viewBlog = (aBlog) => {
        setABlogDetails(aBlog);
        nav('/blog');
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        getAllPosts()
            .then((response) => setBlogs(response))
            .catch((e) => console.log(e.message));
    })

    return (
        <Fragment>
            {
                (blogs) ? (
                    <section className='page blog_page'>
                        {
                            (blogs.length >= 1) ? (
                                blogs.map((aBlog, index) => {
                                    return (
                                        <div className="blog_container" key={index}>
                                            <div className="img_container">
                                                <img src={`${BASE_URL}${aBlog.thumbnail}`} alt={aBlog.blogTitle} />
                                            </div>
                                            <div className="content">
                                                <div className="sample">
                                                    <h1 className="blogTitle">{aBlog.blogTitle}</h1>
                                                    <p className='blogAuthor'>Author: { aBlog.uname }</p>
                                                    <p className="blog">{aBlog.blog.slice(0, 150)}...</p>
                                                </div>
                                                <div className="btn">
                                                    <button className="readBtn" onClick={() => viewBlog(aBlog)}>Read More</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (<NoDataFound />)
                        }
                    </section>
                ) : (<Loading />)
            }
        </Fragment>
    )
}

export default Blogs