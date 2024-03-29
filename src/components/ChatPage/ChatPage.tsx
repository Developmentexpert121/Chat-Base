import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

const chat = [
  {
    chatt: "hello",
    sentByMe: true,
  },

  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: true,
  },
  {
    chatt: "hello",
    sentByMe: true,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: true,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: true,
  },
  {
    chatt: "hello",
    sentByMe: true,
  },
];

const ChatPage = ({ selectedChat }) => {
  const chatRef: any = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [selectedChat]);

  return (
    <Box sx={{ height: "100%" }}>
      {selectedChat ? (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box className="h-[80px] border-b-2 bg-gray-200">
            {selectedChat ? selectedChat.name : "Header"}
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: "auto" }} ref={chatRef}>
            {chat.map((chats, index) => (
              <Box key={index}>
                <Box>
                  <text className="border p-2">{chats.chatt}</text>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className="h-[80px] bg-gray-200">Footer</Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="text-4xl font-bold"
        >
          Select a chat!
        </Box>
      )}
    </Box>
  );
};

export default ChatPage;
