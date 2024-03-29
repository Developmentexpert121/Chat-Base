import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar.tsx";
import Header from "../components/Header/Header.tsx";
// import Footer from "../components/Footer/Footer.tsx";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  const [authUser, setAuthUser] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setAuthUser(true);
    }
  }, [token]);
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
        {authUser && <SideBar />}
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }}
        >
          {authUser && <Header setAuthUser={setAuthUser} />}
          {children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
