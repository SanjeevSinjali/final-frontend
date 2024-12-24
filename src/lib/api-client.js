// import Axios from 'axios';
// import { toast } from 'react-toastify';
 

// const authRequestInterceptor = (config) => {
// if (config.header){
//     config.header.Accept = "application/json";
// }
//   return config;
// }

// export const api = Axios.create({
//     baseURL: "http://127.0.0.1:8000/api"
// });


// api.interceptors.request.use(authRequestInterceptor);
// api.interceptors.response.use(
//     (response) => response.data,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401) {
//             const errorMessage = error.response.data.code;
//             // const errorDetail = "token_not_valid";
//             console.log(errorMessage)
//             if (errorMessage == "token_not_valid" & !originalRequest._retry) {
//             originalRequest._retry = true;

//             try{
//                 const refreshToken = JSON.parse(localStorage.getItem("authTokens")).refresh;
//                 console.log(refreshToken)

//                 const getRefreshToken = await api.get("/token/refresh/",
//                    { refresh: refreshToken},
//                    {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                    })
//                 const newAccessToken = await getRefreshToken;
//                 localStorage.setItem("authTokens", JSON.stringify(newAccessToken));

//                 originalRequest.headers["Authorization"] = `Bearer ${newAccessToken.access}`;
//                 return api(originalRequest);
                
//             } catch(refreshError){
//                 console.log(refreshError)
//                 console.log("Refresh token is expired")
//                 toast.error("Unauthorized");
//                 window.location.href = "/login";
//             }
//             toast.error("Unauthorized");
//         }
//         return Promise.reject(error);
//     }
// )


import Axios from "axios";
import { toast } from "react-toastify";

const authRequestInterceptor = (config) => {
    if (config.headers) {
        config.headers.Accept = "application/json";
    }
    return config;
};

export const api = Axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            const errorMessage = error.response.data.code;

            if (errorMessage === "token_not_valid" && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = JSON.parse(localStorage.getItem("authTokens")).refresh;

                    const getRefreshToken = await api.post(
                        "/token/refresh/",
                        { refresh: refreshToken },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const newAccessToken = getRefreshToken;
                    localStorage.setItem("authTokens", JSON.stringify(newAccessToken));

                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken.access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Refresh token is expired or invalid", refreshError);
                    toast.error("Session expired. Please log in again.");
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);
