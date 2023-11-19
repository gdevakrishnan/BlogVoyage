import React, { Fragment, useContext, useEffect, useState } from 'react'
import { deletePost, getAUserPosts } from '../services/ServiceWorkers'
import Loading from './Loading';
import userContext from '../context/userContext';
import NoDataFound from './NoDataFound';
import { useNavigate } from 'react-router-dom';

function Posts() {
    const { userDetails, setMsg, editBlogDetails, setEditBlogDetails } = useContext(userContext);
    const { _id } = userDetails;
    const [blogs, setBlogs] = useState(null);
    const BASE_URL = "http://localhost:5000/public/thumbnails/";
    const nav = useNavigate();

    useEffect(() => {
        getAUserPosts({ _id })
            .then((response) => {
                setBlogs(response);
            })
            .catch((e) => console.log(e.message));
    })

    const handleDelete = (blogDetails) => {
        deletePost(blogDetails)
            .then((response) => {
                if (response.message === "Deleted Successfully") {
                    setMsg(response.message);
                }
            })
            .catch((e) => console.log(e.message));
    }

    const handleEditBtn = (blogDetails) => {
        setEditBlogDetails(blogDetails);
        nav('/edit');
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

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
                                                    <p className='blogAuthor'>Author: {aBlog.uname}</p>
                                                    <p className="blog">{aBlog.blog.slice(0, 150)}...</p>
                                                </div>
                                                <div className="btn">
                                                    <button className="editBtn" onClick={() => handleEditBtn(aBlog)}><i className='fa fa-pencil'></i></button>
                                                    <button className="readBtn" onClick={() => handleDelete(aBlog)}>DELETE <i className='fa fa-bitbucket'></i></button>
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

export default Posts