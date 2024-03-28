import { Avatar } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="px-4"
    >
      <div></div>
      <div className="flex items-center gap-4">
        <NotificationsIcon sx={{ fontSize: 32 }} />
        <Avatar alt="Remy Sharp" src="/assets/bglandscape.jpg" />
      </div>
    </div>
  );
};

export default Header;
