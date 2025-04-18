import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test'; 

export const fetchUsers = () => axios.get(`${BASE_URL}/users`);
export const fetchPosts = () => axios.get(`${BASE_URL}/posts`);
export const fetchComments = () => axios.get(`${BASE_URL}/comments`);
