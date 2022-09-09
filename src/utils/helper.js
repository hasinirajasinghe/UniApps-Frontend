import axios from "axios";
import {getToken} from './tokenService'

export async function checkUserStillLoggedIn() {
    let token = getToken();
    console.log('token: ' + token);
    try {
        const res = await axios.get('http://localhost:8000/checkToken/', { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 200) {
            console.log('user is still logged in')
            return true;
        } 
    } catch (error) {
        console.log(error)
    }
    console.log('user is not logged in')
    return false;
}