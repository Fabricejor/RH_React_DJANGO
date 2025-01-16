import axios from "axios";

const API_BASE_URL = 'http://localhost:8000'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'content-type': 'application/json',
    },
})

export const ENDPOINT ={
    getAllUsers:`${API_BASE_URL}/api/cvs/`
};


export const getAllUsers= async () =>{
    const response = await apiClient.get(ENDPOINT.getAllUsers);
    return response.data;
}