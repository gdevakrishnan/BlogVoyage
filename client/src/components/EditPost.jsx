import React, { Fragment, useContext, useState } from 'react'
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { updatePost, updateThumbnailAndPost } from '../services/ServiceWorkers';

function EditPost() {
    const { editBlogDetails, setEditBlogDetails, setMsg } = useContext(userContext);
    const [id, setId] = useState(editBlogDetails._id);
    const [blogTitle, setBlogTitle] = useState(editBlogDetails.blogTitle);
    const [blog, setBlog] = useState(editBlogDetails.blog);
    const [prevThumbnail, setPrevThumbnail] = useState(editBlogDetails.thumbnail);
    const [thumbnail, setThumbnail] = useState(null);
    window.speechSynthesis.cancel();


    const nav = useNavigate();
    const updatedBlogDetails = new FormData();

    const backBtn = (e) => {
        e.preventDefault();
        nav('/Posts');
        setEditBlogDetails(null);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (blogTitle.trim() == "" || blog.trim() == "") {
            setMsg("The fields are empty");
            return;
        }

        updatedBlogDetails.append("id", id);
        updatedBlogDetails.append("blog", blog);
        updatedBlogDetails.append("blogTitle", blogTitle);
        updatedBlogDetails.append("thumbnail", thumbnail);
        updatedBlogDetails.append("prevThumbnail", prevThumbnail);

        if (thumbnail) {
            updateThumbnailAndPost(updatedBlogDetails)
                .then((response) => {
                    if (response.message == "Updated Successfully") {
                        setMsg(response.message);
                    }
                })
                .catch((e) => console.log(e.message));
        } else {
            updatePost(updatedBlogDetails)
                .then((response) => {
                    if (response.message == "Updated Successfully") {
                        setMsg(response.message);
                    }
                })
                .catch((e) => console.log(e.message));
        }
    }

    return (
        <Fragment>
            <section className="page form_page" encType="multipart/form-data">
                <div className="btn">
                    <button className="backBtn" onClick={(e) => backBtn(e)}><i className='fa  fa-angle-double-left'></i> Back</button>
                </div>
                <form autoComplete='OFF' onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="form_title">Edit Blog</h1>
                    <div className="form_group">
                        <label htmlFor="blogTitle">Blog Title</label>
                        <input
                            type="text"
                            name="blogTitle"
                            id="blogTitle"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="blog">Blog</label>
                        <textarea
                            name="blog"
                            id="blog"
                            value={blog}
                            onChange={(e) => setBlog(e.target.value)}
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
                        value="Update"
                    />
                </form>
            </section>
        </Fragment>
    )
}

export default EditPost