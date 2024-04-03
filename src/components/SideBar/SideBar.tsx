import { Box, Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = useSelector((state: any) => state.login.isAdmin);
  console.log("ADMINNNNNNN", isAdmin);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

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
        navigateTo: "/admin/dashboard",
      },
    ];
  }

  return (
    <div
      style={{
        width: collapsed ? "72px" : "280px",
        minHeight: "100vh",
        borderRight: "4px solid",
        transition: "width 0.3s ease",
      }}
      className="bg-white shadow-lg"
    >
      <div className="flex justify-center items-center">
        {!collapsed && (
          <div className="flex flex-col justify-center items-center my-4 ">
            <div className="text-4xl font-bold ">Chat-Base</div>
            {isAdmin ? (
              <div className="text-lg font-bold  underline">Admin</div>
            ) : (
              ""
            )}
          </div>
        )}
        <IconButton
          sx={{ marginY: collapsed ? 2 : "" }}
          onClick={toggleCollapse}
        >
          {collapsed ? (
            <MenuIcon className="" />
          ) : (
            <MenuOpenIcon className="text-white" />
          )}
        </IconButton>
      </div>

      <Divider sx={{ borderWidth: 1, borderColor: "gray" }} />
      <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
        {sideBarItems.map((item, index) => {
          const isActive = item.navigateTo === location.pathname;
          return (
            <div
              key={index}
              className={`p-2 mb-2  flex items-center gap-3 rounded-md ${
                isActive
                  ? "bg-[#E16349] text-white hover:bg-[#da745f] hover:text-white "
                  : "text-black hover:cursor-pointer hover:bg-[#ee7e68] hover:text-white"
              }`}
              onClick={() => redirect(item.navigateTo)}
            >
              {item.icon}
              {!collapsed && item.name}
            </div>
          );
        })}
      </Box>
    </div>
  );
};

export default SideBar;
