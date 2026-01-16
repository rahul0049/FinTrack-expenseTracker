import axios from "axios"
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
    headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
    },
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}),
    (error) => Promise.reject(error)

api.interceptors.response.use(
    (respose) => respose,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("user");
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)
export default api;