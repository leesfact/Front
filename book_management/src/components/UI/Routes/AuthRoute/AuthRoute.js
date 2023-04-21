import React  from "react";
import { Navigate } from "react-router-dom";
import { authenticatedState } from "../../../../atoms/Auth/AuthAtoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useQuery } from "react-query";
import { getAuthenticated } from "../../../../api/auth/authApi";

const validateToken = async (accessToken) => {
    const response =  await axios.get("http://localhost:8080/auth/authenticated", {params: { accessToken }});
    return response.data;
}

const AuthRoute =  ({ path, element }) => {
    const accessToken = localStorage.getItem("accessToken");
    const [ authenticated, setAuthenticated] = useRecoilState(authenticatedState);
    const {data, isLoading, Error}  = useQuery(()=>getAuthenticated(accessToken));
    setAuthenticated(data);
    const permitAll = ["/login", "/register", "/password/forgot"];

    if(!authenticated){ //토큰이 있으면 이쪽으로 들어 오지 않음
        if(permitAll.includes( path )){
            return element;
        }
        return <Navigate to="/login" />;
    }

    if(permitAll.includes( path )){
        return <Navigate to="/" />;
    }

    return element;
};

export default AuthRoute;
