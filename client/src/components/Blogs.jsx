import React, { Fragment, useEffect, useState } from 'react'
import { getAllPosts } from '../services/ServiceWorkers'
import PageNotFound from './PageNotFound';
import Loading from './Loading';

function Blogs() {
    const [blogs, setBlogs] = useState(null);

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
                            blogs.map((aBlog, index) => {
                                return (
                                    <div className="blog_container" key={index}>
                                        <div className="img_container">
                                            <img src="https://img.freepik.com/free-photo/notepad-laptop-concept_23-2147982614.jpg?w=740&t=st=1699610326~exp=1699610926~hmac=fa972a306620242a9b79b8c2b28c35aa38cd9e0a5780f0f447a7c5de9df5b0b7" alt={aBlog.post.blogTitle} />
                                        </div>
                                        <div className="content">
                                            <div className="sample">
                                                <h1 className="blogTitle">{aBlog.post.blogTitle}</h1>
                                                <p className='blogAuthor'>Author: { aBlog.uname }</p>
                                                <p className="blog">{aBlog.post.blog.slice(0, 150)}...</p>
                                            </div>
                                            <div className="btn">
                                                <button className="readBtn">Read More</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </section>
                ) : (<Loading />)
            }
        </Fragment>
    )
}

export default Blogs