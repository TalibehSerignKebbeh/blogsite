import axios from "axios"


export const apiUrl = 'http://localhost:6002/api/v1'
export const ImageUrl = 'http://localhost:6002'


export const AxiosInstance = axios.create({ baseURL: apiUrl })

        const token = localStorage.getItem('authToken')

AxiosInstance.interceptors.request.use(
    (req) => {
         req.headers["authorization"] = `Bearer ${token}`;
        return req
    },
    (err) => {
        return Promise.reject(err)
    }
)