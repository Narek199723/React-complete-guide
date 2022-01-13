import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/store/authContext";

const PrivateRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);
    console.log(isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
