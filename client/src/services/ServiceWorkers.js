import Axios from 'axios';

const BASE_URL = "http://localhost:5000/blogvoyage";

// REGISTER
export const createUserDetails = async (userDetails) => {
    const task = await Axios.post(`${BASE_URL}/register`, userDetails);
    const response = task.data;
    return response;
}

// LOGIN
export const getUserDetails = async (userDetails) => {
    const task = await Axios.post(`${BASE_URL}/login`, userDetails);
    const response = task.data;
    return response;
}

// TOKEN VERIFICATION
export const userVerify = async (userDetails) => {
    const task = await Axios.post(`${BASE_URL}/user_verify`, userDetails);
    const response = task.data;
    return response;
}

// NEW POST
export const createNewPost = async (blogDetails) => {
    const task = await Axios.post(`${BASE_URL}/post/new_post`, blogDetails);
    const response = task.data;
    return response;
}

// GET ALL POSTS
export const getAllPosts = async (blogDetails) => {
    const task = await Axios.get(`${BASE_URL}/post`, blogDetails);
    const response = task.data.task;
    return response;
}

// GET A USER POSTS
export const getAUserPosts = async (userDetails) => {
    const task = await Axios.post(`${BASE_URL}/post/user_posts`, userDetails);
    const response = task.data.task;
    return response;
}

// DELETE A USER POST
export const deletePost = async (blogDetails) => {
    const task = await Axios.delete(`${BASE_URL}/post/delete_post/${blogDetails._id}`);
    const response = task.data;
    return response;
}

// UPDATE POST
export const updatePost = async (updatedBlogDetails) => {
    const _id = updatedBlogDetails.get("id");
    const blogTitle = updatedBlogDetails.get("blogTitle");
    const blog = updatedBlogDetails.get("blog");
    
    const task = await Axios.put(`${BASE_URL}/post/update_post/${_id}`, {blogTitle, blog});
    const response = task.data;
    return response;
}

// UPDATE THUMBNAIL AND POST
export const updateThumbnailAndPost = async (updatedBlogDetails) => {
    const _id = updatedBlogDetails.get("id");
    const task = await Axios.put(`${BASE_URL}/post/update_post_thumbnail/${_id}`, updatedBlogDetails);
    const response = task.data;
    return response;
}
