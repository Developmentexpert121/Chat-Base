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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from "@mui/icons-material/Send";

const ChatPage = ({ selectedChat, closeTab, setCloseTab, width }:any) => {
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
          <Box className="py-3 flex justify-between items-center border-b-2 px-6 bg-white shadow">
            <Box className="flex justify-between items-center gap-4 text-2xl font-bold">
              {closeTab && width<900 && <button onClick={()=>setCloseTab(false)}><ArrowBackIcon /> back</button>}
              <Avatar />
              {selectedChat ? selectedChat?.name : "Header"}
              
            </Box>
            <IconButton sx={{ color: "black" }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Box
            sx={{ flexGrow: 1, overflowY: "auto" }}
            ref={chatRef}
            onScroll={handleScroll}
            className="bg-gray-100 p-4 chat-bg"
          >
            {isLoading && (
              <Box className="flex justify-center items-center">
                <CircularProgress
                  sx={{ m: 2, alignSelf: "center", color: "black" }}
                />
              </Box>
            )}
            {selectedChat?.[0].messages
              .slice(0, loadedMessages)
              .map((chats: any, index: any) => (
                <Box
                  key={index}
                  className={`mt-4 mx-2 gap-2 max-w-75p ${
                    chats.role === "user"
                      ? "flex justify-end items-end ml-auto"
                      : "flex justify-start items-end"
                  }`}
                >
                  {chats.role !== "user" && (
                    <Avatar sx={{ width: 32, height: 32 }} />
                  )}
                  <Box
                    className={`border p-2 ${
                      chats.role === "user"
                        ? "bg-gradient-primary text-white border-white"
                        : " bg-white text-black border-white"
                    }`}
                    sx={{
                      borderRadius: "10px",
                      borderBottomRightRadius:
                        chats.role === "user" ? "2px" : "",
                      borderBottomLeftRadius:
                        chats.role === "user" ? "" : "2px",
                    }}
                  >
                    {chats?.content}
                  </Box>
                  {chats.role === "user" && (
                    <Avatar sx={{ width: 32, height: 32 }} />
                  )}
                </Box>
              ))}
          </Box>
          <Box className="h-[70px] flex justify-between items-center border-t-2 px-6 py-4 bg-white gap-4">
            <TextField
              fullWidth
              id="message"
              size="small"
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                outline: 'none',
                border: 'none'
              }}
            />
            <Box className="flex justify-end">
              <Button
              className="btn-primary"
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
