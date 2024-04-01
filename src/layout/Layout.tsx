import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar.tsx";
import Header from "../components/Header/Header.tsx";
// import Footer from "../components/Footer/Footer.tsx";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  const [authUser, setAuthUser] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setAuthUser(true);
    }
  }, [token]);

  const isAllowedRoute = () => {
    const allowedRoutes = ["/signup/:token", "/", "/admin/login"];
    return allowedRoutes.includes(location.pathname);
  };
  return (
    <Box>
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
        >
          {authUser && isAllowedRoute() && <Header setAuthUser={setAuthUser} />}
          {children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
