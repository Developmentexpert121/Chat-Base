import { Box, Card, Input } from "@mui/material";
import React from "react";
import "./styles.css";

const InviteUsers = () => {
  return (
    <Box sx={{ flexGrow: 1, px: 8, py: 1 }}>
      <div className="text-5xl font-bold mb-6">Invite Users</div>

      <Card
        sx={{
          padding: 4,
          paddingY: 3,
          boxShadow: 2,
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        <Box className="text-lg">
          Enter the information about the user you want invite. The user will
          recieve an invite on the provided Email.
        </Box>
        <Box className="flex flex-col justify-between items-center gap-y-4 p-8">
          <Box className="flex justify-around items-center gap-4">
            <Box className="w-[120px] text-xl font-bold">First Name</Box>
            <Box className="text-xl font-bold">:</Box>
            <Box>
              <Input className="w-[280px]" />
            </Box>
          </Box>
          <Box className="flex justify-around items-center  gap-4">
            <Box className="w-[120px] text-xl font-bold">Last Name</Box>
            <Box className="text-xl font-bold">:</Box>
            <Box>
              <Input className="w-[280px]" />
            </Box>
          </Box>
          <Box className="flex justify-around items-center  gap-4">
            <Box className="w-[120px] text-xl font-bold">Email</Box>
            <Box className="text-xl font-bold">:</Box>
            <Box>
              <Input className="w-[280px]" />
            </Box>
          </Box>
          <Box className="flex justify-around items-center  gap-4">
            <Box className="w-[120px] text-xl font-bold">Chatbot Id</Box>
            <Box className="text-xl font-bold">:</Box>
            <Box>
              <Input className="w-[280px]" />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default InviteUsers;
