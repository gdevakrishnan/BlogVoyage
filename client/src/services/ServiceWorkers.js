import Axios from 'axios';
const BASE_URL = "http://localhost:5000/blogvoyage";

export const createUserDetails = async (userDetails) => {
    const task = await Axios.post(`${BASE_URL}/register`, userDetails);
    const response = task.data;
    return response;
}
