import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar.tsx";
import Header from "../components/Header/Header.tsx";
// import Footer from "../components/Footer/Footer.tsx";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  const [authUser, setAuthUser] = useState(!!localStorage.getItem("token"));

  const location = useLocation();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setAuthUser(true);
    }
  }, [token]);

  const isAllowedRoute = () => {
    const disallowedRoutes = ["/signup/:token", "/", "/admin/login"];
    return (
      !disallowedRoutes.includes(location.pathname) &&
      !location.pathname.startsWith("/signup/")
    );
  };
  return authUser !== null ? (
    <Box className="bg-gray-100 text-black main-outerr">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          height: "full",
        }}
      >
        {authUser && isAllowedRoute() && <SideBar />}
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }}
          className="content-right"
        >
          <div className="header-topbar px-24px">
            <div className="header-topbar-inner cs-shadow">
              {authUser && isAllowedRoute() && <Header setAuthUser={setAuthUser} />}
            </div>
          </div>
          {children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  ) : (
    ""
  );
};

export default Layout;
