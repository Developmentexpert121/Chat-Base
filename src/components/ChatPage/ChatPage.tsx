import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";

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
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
  {
    chatt: "hello",
    sentByMe: false,
  },
];

const ChatPage = ({ selectedChat }) => {
  const chatRef: any = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMessages, setLoadedMessages] = useState(11);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [selectedChat]);

  const handleScroll = () => {
    const scrollTop = chatRef.current.scrollTop;
    if (scrollTop === 0) {
      // User has scrolled to the top
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setLoadedMessages((prevLoadedMessages) => prevLoadedMessages + 11);
        setIsLoading(false);
      }, 1000); // Adjust this delay as needed
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      {selectedChat ? (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box className="h-[80px] flex justify-between items-center border-b-2 px-6 bg-gray-200">
            <Box className="flex justify-between items-center gap-4 text-2xl font-bold">
              <Avatar />
              {selectedChat ? selectedChat.name : "Header"}
            </Box>
            <IconButton sx={{ color: "black" }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Box
            sx={{ flexGrow: 1, overflowY: "auto" }}
            ref={chatRef}
            onScroll={handleScroll}
          >
            {isLoading && (
              <Box className="flex justify-center items-center">
                <CircularProgress
                  sx={{ m: 2, alignSelf: "center", color: "black" }}
                />
              </Box>
            )}
            {chat.slice(0, loadedMessages).map((chats: any, index: any) => (
              <Box
                key={index}
                className={`mt-4 mx-2 gap-2 ${
                  chats.sentByMe
                    ? "flex justify-end items-end"
                    : "flex justify-start items-end"
                }`}
              >
                {chats.sentByMe !== true && (
                  <Avatar sx={{ width: 24, height: 24 }} />
                )}
                <Box
                  className={`border p-2 ${
                    chats.sentByMe
                      ? "bg-white text-black border-black"
                      : " bg-black text-white border-black"
                  }`}
                  sx={{
                    borderRadius: "10px",
                    borderBottomRightRadius:
                      chats.sentByMe === true ? "2px" : "",
                    borderBottomLeftRadius:
                      chats.sentByMe === true ? "" : "2px",
                  }}
                >
                  {chats.chatt}
                </Box>
                {chats.sentByMe === true && (
                  <Avatar sx={{ width: 24, height: 24 }} />
                )}
              </Box>
            ))}
          </Box>
          <Box className="h-[60px] flex justify-between items-center border-t-2 px-6 py-3 bg-gray-200 gap-4">
            <TextField
              fullWidth
              id="message"
              size="small"
              sx={{
                bgcolor: "white",
                borderRadius: "20px",
              }}
            />
            <Box className="flex justify-end">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Box>
          </Box>
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
