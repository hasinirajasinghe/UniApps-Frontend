import { useState } from "react";

const Auth = () => {
    
    let initialLoggedIn = getToken() == null? false: true;
    
    const [ loggedIn, setLoggedIn ] = useState(initialLoggedIn)

    function setToken(token) {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }

    function getToken() {
        let token = localStorage.getItem("token");
        if (token) {
            // Check if expired, remove if it is
            const payload = JSON.parse(atob(token.split(".")[1]));
            // JWT's exp is expressed in seconds, not milliseconds, so convert
            if (payload.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
                token = null;
            }
        }
        return token;
    }

    function removeToken() {
        localStorage.removeItem('token');
    }
    
    return {
        loggedIn,
        setLoggedIn,
        getToken,
        setToken,
        removeToken
    }

}

export default Auth;