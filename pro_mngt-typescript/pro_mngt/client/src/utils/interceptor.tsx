import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig   => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
