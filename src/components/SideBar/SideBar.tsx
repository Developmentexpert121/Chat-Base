import { Box, Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
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
    {
      name: "Settings",
      icon: <SettingsApplicationsIcon />,
      navigateTo: "/settings",
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
        width: collapsed ? "64px" : "280px",
        minHeight: "100vh",
        transition: "width 0.3s ease",
      }}
      className="bg-black shadow-right2"
    >
      <div className="flex justify-between px-3 items-center">
        {!collapsed && (
          <div className="flex flex-col justify-center items-center my-4 text-white">
            <div className="text-3xl font-semibold text-nowrap">Chat-Base</div>
            {isAdmin ? (
              <div className="text-lg font-bold underline">Admin</div>
            ) : (
              ""
            )}
          </div>
        )}
        <IconButton
          sx={{ marginY: collapsed ? 2 : "" }}
          onClick={toggleCollapse}
          className="cs-menu-toggle"
        >
          {collapsed ? (
            <MenuIcon className="" />
          ) : (
            <MenuOpenIcon className="text-black" />
          )}
        </IconButton>
      </div>

      
      <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
        {sideBarItems.map((item, index) => {
          const isActive = item.navigateTo === location.pathname;
          return (
            <div
              key={index}
              className={`p-2 mb-2  flex items-center gap-3 rounded-md ${
                isActive
                  ? "bg-gradient-primary text-white bg-gradient-primary-hover hover:text-white "
                  : "text-white hover:cursor-pointer hover:text-white"
              }`}
              onClick={() => redirect(item.navigateTo)}
            >
              {item.icon}
              <span className="text-nowrap">{!collapsed && item.name}</span>
            </div>
          );
        })}
      </Box>
    </div>
  );
};

export default SideBar;
