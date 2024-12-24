import { api } from "./api-client";

const getRefreshToken = async ({refresh_token}) => {  
    // const refresh_token = JSON.parse(localStorage.getItem('authTokens'))['refresh'];
    return await api.post('/refresh/', {refresh: refresh_token}); 
    }

export default getRefreshToken;