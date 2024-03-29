import { Box } from "@mui/material";
import React from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = true;

  const redirect = (item: string) => {
    navigate(item);
  };

  let sideBarItems = [
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

  if (isAdmin) {
    sideBarItems = [
      {
        name: "User",
        icon: <PersonIcon />,
        navigateTo: "/admin/user",
      },
      {
        name: "Invite User",
        icon: <AddIcon />,
        navigateTo: "/admin/invite-user",
      },
    ];
  }

  return (
    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        borderRight: "4px solid",
      }}
      className="bg-white"
    >
      <div className="flex flex-col justify-center items-center my-4 ">
        <div className="text-4xl font-bold text-black">Chat-Base</div>
        {isAdmin && (
          <div className="text-lg font-bold text-black underline">Admin</div>
        )}
      </div>

      <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
        {sideBarItems.map((item, index) => {
          const isActive = item.navigateTo === location.pathname;
          return (
            <div
              key={index}
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
