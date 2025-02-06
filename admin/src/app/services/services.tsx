import axios from "axios";

const API_BASE_URL = 'http://localhost:8000'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers:{
        'content-type': 'application/json',
    },
})

export const ENDPOINT ={
    getAllUsers:`${API_BASE_URL}/api/cvs/`,
    RegisterUser:`${API_BASE_URL}/api/users/`,
};


export const getAllUsers= async () =>{
    const response = await apiClient.get(ENDPOINT.getAllUsers);
    return response.data;
}

export const RegisterUser = async (formData: any) => {
    const response = await apiClient.post(ENDPOINT.RegisterUser, formData);
    return response.data;
}

export const RegisterPost = async (formData: any, confirmPassword: string) => {
    if (formData.code === confirmPassword) {
        return await RegisterUser(formData);
    } else {
        throw new Error("Code does not match confirmPassword");
    }
}