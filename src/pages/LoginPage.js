import React from 'react'
import Login from '../components/Login'



const LoginPage = ({setLoggedIn}) => {
  return (
    <div>
        <Login setLoggedIn={setLoggedIn} />
    </div>
  )
}

export default LoginPage