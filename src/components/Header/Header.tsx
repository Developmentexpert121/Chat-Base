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
import React from "react";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { SignOut as SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { useNavigate } from "react-router-dom";

const Header = ({ setAuthUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
    setAuthUser(false);
  };

  return (
    <div
      style={{
        height: "74px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="px-6 py-4 shadow-lg bg-white"
    >
      <div></div>
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
            <Typography variant="subtitle1">Henry</Typography>
            <Typography color="text.secondary" variant="body2">
              henry@chatbase.com
            </Typography>
          </Box>
          <Divider />
          <MenuList
            disablePadding
            sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
          >
            <MenuItem>
              <ListItemIcon>
                <GearSixIcon fontSize="var(--icon-fontSize-md)" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <UserIcon fontSize="var(--icon-fontSize-md)" />
              </ListItemIcon>
              Profile
            </MenuItem>
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
