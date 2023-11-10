import React, { Fragment, useContext, useState } from 'react'
import userContext from '../context/userContext';
import { createNewPost } from '../services/ServiceWorkers';

function NewPost() {
    const { userDetails, setMsg } = useContext(userContext)
    const initialState = { uname: userDetails.uname, gmail: userDetails.gmail, blogTitle: "", blog: "" };
    const [blogDetails, setBlogDetails] = useState(initialState);

    const handleEdit = (e) => {
        e.preventDefault();
        setBlogDetails({ ...blogDetails, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (blogDetails.uname.trim() == "" || blogDetails.gmail.trim() == "" || blogDetails.blogTitle.trim() == "" || blogDetails.blog.trim() == "") {
            setMsg("Enter all the Fields");
            return;
          }

        createNewPost(blogDetails)
            .then((response) => {
                setMsg(response.message);
                setBlogDetails(initialState);
            })
            .catch((e) => console.log(e.message));
    }

    return (
        <Fragment>
            <section className="page form_page">
                <form autoComplete='OFF' onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="form_title">Create a Blog</h1>
                    <div className="form_group">
                        <label htmlFor="blogTitle">Blog Title</label>
                        <input
                            type="text"
                            name="blogTitle"
                            id="blogTitle"
                            onChange={(e) => handleEdit(e)}
                            value={blogDetails.blogTitle}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="blog">Blog</label>
                        <textarea
                            name="blog"
                            id="blog"
                            onChange={(e) => handleEdit(e)}
                            value={blogDetails.blog}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Publish"
                    />
                </form>
            </section>
        </Fragment>
    )
}

export default NewPost