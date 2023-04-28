import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { refreshState } from "../../../../atoms/Auth/AuthAtoms";
import { useRecoilState } from "recoil";

const AuthRouteReactQuery = ({ path, element }) => {
    const [refresh, setRefresh] = useRecoilState(refreshState);
    const [{ data: authenticated },{ data: principal }] = useQueries([
        {
          queryKey: ["authenticated"],
          queryFn: async () => {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:8080/auth/authenticated", {
              params: { accessToken },
            });
            return response;
          },
          suspense: true
        },
        {
          queryKey: ["principal"],
          queryFn: async () => {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:8080/auth/principal", {
              params: { accessToken },
            });
            return response;
          },
          suspense: true
        },
      ]);
      

    // const { data, isLoading } = useQuery(
    //     ["authenticated"],
    //     async () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     const response = await axios.get("http://localhost:8080/auth/authenticated", {
    //         params: { accessToken },
    //     });
    //     return response;
    //     },
    //     {
    //     enabled: refresh,
    //     }
    // );

    // const principal = useQuery(
    //     ["principal"],
    //     async () => {
    //     const accessToken = localStorage.getItem("accessToken");
    //     const response = await axios.get("http://localhost:8080/auth/principal", {
    //         params: { accessToken },
    //     });
    //     return response;
    //     },
    //     {
    //     enabled: !!localStorage.getItem("accessToken"), // true 일때만 get 요청
    //     }
    // );

    useEffect(() => {
        if (!refresh) {
        setRefresh(true);
        }
    }, [refresh]);

    // 경고 메시지 표시 상태 추가
    const [displayedAlert, setDisplayedAlert] = useState(false);

    if (authenticated.isLoading) {
        return <div>로딩중...</div>;
    }

    if (principal.data !== undefined ) {
        const roles = principal.data.data.authorities.split(",");
        const hasAdminPath = path.startsWith("/admin");
        if (hasAdminPath && !roles.includes("ROLE_ADMIN") && !displayedAlert) {
        alert("접근 권한이 없습니다.");
        setDisplayedAlert(true); // 경고 메시지가 표시되었음을 표시
        
        }
    }

    if (!authenticated.isLoading) {
        const permitAll = ["/login", "/register", "/password/forgot"];

        if (!authenticated.data.data) {
        if (permitAll.includes(path)) {
            return element;
        }
        return <Navigate to="/login" />;
        }
        if (permitAll.includes(path)) {
        return <Navigate to="/" />;
        }
        return element;
    }
};

export default AuthRouteReactQuery;
