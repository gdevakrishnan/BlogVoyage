import React, { Fragment, useContext, useState } from 'react'
import userContext from '../context/userContext';
import { createNewPost } from '../services/ServiceWorkers';
import { useNavigate } from 'react-router-dom';

function NewPost() {
    const blogDetails = new FormData();
    const { userDetails, setMsg } = useContext(userContext)
    const initialState = "";
    const [blogTitle, setBlogTitle] = useState(initialState);
    const [blog, setBlog] = useState(initialState);
    const [thumbnail, setThumbnail] = useState(initialState);
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userDetails.uname.trim() == "" || userDetails.gmail.trim() == "" || blogTitle.trim() == "" || blog.trim() == "" || thumbnail == "") {
            setMsg("Enter all the Fields");
            return;
        }

        blogDetails.append("uname", userDetails.uname);
        blogDetails.append("email", userDetails.gmail);
        blogDetails.append("author", userDetails._id);
        blogDetails.append("blogTitle", blogTitle);
        blogDetails.append("blog", blog);
        blogDetails.append("thumbnail", thumbnail);

        createNewPost(blogDetails)
            .then((response) => {
                setBlogTitle(initialState);
                setBlog(initialState);
                setThumbnail(initialState);
                setMsg(response.message);
                nav('/blogs')
            })
            .catch((e) => console.log(e.message));
    }

    return (
        <Fragment>
            <section className="page form_page" encType="multipart/form-data">
                <form autoComplete='OFF' onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="form_title">Create a Blog</h1>
                    <div className="form_group">
                        <label htmlFor="blogTitle">Blog Title</label>
                        <input
                            type="text"
                            name="blogTitle"
                            id="blogTitle"
                            onChange={(e) => setBlogTitle(e.target.value)}
                            value={blogTitle}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="blog">Blog</label>
                        <textarea
                            name="blog"
                            id="blog"
                            onChange={(e) => setBlog(e.target.value)}
                            value={blog}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="thumbnail">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            id="thumbnail"
                            accept='image/*'
                            onChange={(e) => setThumbnail(e.target.files[0])}
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