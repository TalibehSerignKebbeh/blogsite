import axios from "axios"

// export const apiUrl='https://blog-api-hnde.onrender.com/mbyes_api/v1'
// export const ImageUrl='https://blog-api-hnde.onrender.com'
export const apiUrl = 'http://localhost:6002/mbyes_api/v1'
export const ImageUrl = 'http://localhost:6002'


export const AxiosInstance = axios.create({ baseURL: apiUrl })