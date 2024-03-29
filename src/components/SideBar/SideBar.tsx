import { Box } from "@mui/material";
import React from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useLocation, useNavigate } from "react-router-dom";

const sideBarItems = [
  {
    name: "Dashboard",
    icon: <SpaceDashboardIcon />,
    navigateTo: "/dashboard",
  },
  { name: "Lead", icon: <TableChartIcon />, navigateTo: "/lead" },
  {
    name: "Chat History",
    icon: <ChatBubbleIcon />,
    navigateTo: "/chat-history",
  },
];

const SideBar = () => {
  const location = useLocation();
  console.log("paramsssss", location);
  const navigate = useNavigate();

  const redirect = (item: string) => {
    navigate(item);
  };
  return (
    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        borderRight: "4px solid",
      }}
      className="bg-white"
    >
      <div className="flex justify-center items-center text-4xl font-bold my-4 text-black">
        Chat-Base
      </div>
      {/* <Divider sx={{ borderColor: "black", border: 1 }} /> */}
      <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
        {sideBarItems.map((item) => {
          const isActive = item.navigateTo === location.pathname;
          return (
            <div
              className={`p-2 mb-2 text-black flex items-center gap-2 ${
                isActive ? "bg-black text-white rounded-md" : "text-black"
              }`}
              onClick={() => redirect(item.navigateTo)}
            >
              {item.icon}
              {item.name}
            </div>
          );
        })}
      </Box>
    </div>
  );
};

export default SideBar;
