import 'axios';
import axios from 'axios';

const API_URL = '/ehelpdesk/users/';


const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    console.log('response', response);
    console.log('response.message', response.message);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const login = async (loginData) => {
    const response = await axios.post(API_URL + 'login', loginData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService;