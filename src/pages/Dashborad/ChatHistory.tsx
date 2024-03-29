import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import ChatPage from "../../components/ChatPage/ChatPage.tsx";

const chat = [
  {
    name: "ChatGpt",
    message: "Hello World",
  },
  {
    name: "Devin",
    message: "Hiiis",
  },
  {
    name: "Gemini",
    message: "Maagads",
  },
  {
    name: "Gork",
    message: "Oyugadskj",
  },
  {
    name: "Bard",
    message: "Oyugadskj",
  },
];

const ChatHistory = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const handleChatSelect = (index: any) => {
    setSelectedChat(chat[index]);
  };

  return (
    <Box sx={{ px: 8, py: 1, height: "90vh" }}>
      <Box className="text-5xl font-bold mb-6">Chat History</Box>
      <Card
        sx={{
          boxShadow: 2,
          borderColor: "grey",
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          height: "90%",
        }}
      >
        <Box
          sx={{
            flex: "20%",
            overflowX: "auto",
            borderRight: 3,
            borderRightColor: "lightgrey",
            height: "100%",
          }}
        >
          <Table>
            <TableBody>
              {chat.map((notification, index) => (
                <TableRow
                  hover
                  key={index}
                  onClick={() => handleChatSelect(index)}
                >
                  <TableCell
                  // sx={{ borderBottom: index === chat.length - 1 ? 0 : "" }}
                  >
                    <div className="p-1 heading">{notification.name}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ flex: "80%" }}>
          <ChatPage selectedChat={selectedChat} />
        </Box>
      </Card>
    </Box>
  );
};

export default ChatHistory;
