import React, { Fragment, useContext } from 'react'
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { updatePost } from '../services/ServiceWorkers';

function EditPost() {
    const { editBlogDetails, setEditBlogDetails, setMsg } = useContext(userContext);
    const nav = useNavigate();

    const backBtn = (e) => {
        e.preventDefault();
        nav('/Posts');
        setEditBlogDetails(null);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const handleEdit = (e) => {
        setEditBlogDetails({ ...editBlogDetails, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editBlogDetails.blogTitle.trim() == "" || editBlogDetails.blog.trim() == "") {
            setMsg("The fields are empty");
            return;
        }

        updatePost(editBlogDetails)
            .then((response) => {
                if (response.message == "Updated Successfully") {
                    setMsg(response.message);
                }
            })
            .catch((e) => console.log(e.message));
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
                            value={editBlogDetails.blogTitle}
                            onChange={(e) => handleEdit(e)}
                        />
                    </div>

                    <div className="form_group">
                        <label htmlFor="blog">Blog</label>
                        <textarea
                            name="blog"
                            id="blog"
                            value={editBlogDetails.blog}
                            onChange={(e) => handleEdit(e)}
                        />
                    </div>

                    {/* <div className="form_group">
                        <label htmlFor="thumbnail">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            id="thumbnail"
                            accept='image/*'
                        />
                    </div> */}

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