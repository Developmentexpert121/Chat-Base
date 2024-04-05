import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { SignOut as SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { collapsedSideBar } from "../../services/slices/activity/activitySlice.tsx";

const Header = ({ setAuthUser }) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = useSelector((state: any) => state.login.isAdmin);
  const toggleCollapse = () => {
    console.log("hiiii");
    dispatch(collapsedSideBar(true));
    setCollapsed(!collapsed);
  };

  const userData: any = useSelector((state: any) => state.login.userData);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    //setAuthUser(false);
  };

  return (
    <div
      style={{
        height: "42px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      // className="px-6 py-4 shadow-right bg-white"
    >
      <div className="menu-ham-header">
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
      <div className="flex items-center gap-4">
        <IconButton onClick={handleClick}>
          <Avatar
            alt="Remy Sharp"
            src="/assets/bglandscape.jpg"
            style={{ border: "2px solid white", borderRadius: "50%" }}
          />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={{ p: "16px 20px " }}>
            <Typography variant="subtitle1">
              {userData?.user?.firstName + " " + userData?.user?.lastName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {userData?.user?.email}
            </Typography>
          </Box>
          <Divider />
          <MenuList
            disablePadding
            sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
          >
            {/* <MenuItem>
              <ListItemIcon>
                <UserIcon fontSize="var(--icon-fontSize-md)" />
              </ListItemIcon>
              Profile
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <SignOutIcon fontSize="var(--icon-fontSize-md)" />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </MenuList>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
