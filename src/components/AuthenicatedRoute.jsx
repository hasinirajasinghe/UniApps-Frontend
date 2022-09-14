import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../utils/UserContext";

export const AuthenticatedRoute = ({ children }) => {
    const {loggedIn} = useContext(UserContext);
  if (!loggedIn) {
    return <Navigate to='/login'></Navigate>;
  }
  return children
};


export default AuthenticatedRoute;