import React from "react";
import SideBar from "../components/SideBar/SideBar.tsx";
import Header from "../components/Header/Header.tsx";
// import Footer from "../components/Footer/Footer.tsx";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
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
        <SideBar />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
          }}
        >
          <Header />
          {children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
