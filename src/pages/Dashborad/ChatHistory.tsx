import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import ChatPage from "../../components/ChatPage/ChatPage.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getUsersConversation } from "../../services/slices/auth/users-conversation.tsx";
import FilteredChat from "./filteredChat.tsx";
import Header from "../../components/Header/Header.tsx";

const ChatHistory = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [currentChatId, setCurrentChatId] = useState<any>(null);
  const dispatch: any = useDispatch<any>();
  useEffect(() => {
    const chatbotId = localStorage.getItem("chatbotId");
    const data = {
      chatbotId: chatbotId,
      startDate: "2024-03-12",
      endDate: "2024-12-12",
      page: 1,
      size: 20,
    };
    dispatch(getUsersConversation(data));
  }, [dispatch]);

  const conversationData = useSelector(
    (state: any) => state.usersConversation.data
  );
  const handleChatSelect = (id: any) => {
    const filteredChat = conversationData?.data?.filter((item: any) => {
      return item.id === id;
    });
    setSelectedChat(filteredChat);
    setCurrentChatId(id);
  };

  const chat = conversationData?.data
    ? conversationData?.data.map((item: any) => ({
        name:
          item?.form_submission === null
            ? "Customer"
            : item?.form_submission?.email,
        id: item?.id,
      }))
    : null;

  return (
    <Box sx={{ px: 4, py: 4 }} className="content-height">
      <Grid container spacing={3} className="mb-3 mx-0 header-flex cs-shadow">
        <Grid item xs={6} className="header-col-left">
          <Typography
            variant="h2"
            gutterBottom
            className="heading-h2 font-bold mb-0"
          >
            Chat History
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }} className="header-col-right">
          <Button
            variant="outlined"
            className="btn-primary"
            onClick={() => setOpen(true)}
            sx={{ color: "grey", borderColor: "1px solid black" }}
          >
            Pick Date
          </Button>
          <div className="ms-3">
            <Header />
          </div>
        </Grid>
      </Grid>

      <Card
        className="cs-shadow"
        sx={{
          borderColor: "grey",
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          height: "calc(100% - 103px)",
        }}
      >
        <Box
          sx={{
            flex: "30%",
            overflowX: "auto",
            height: "100%",
          }}
        >
          <Table>
            <TableBody>
              {chat &&
                chat.map((notification: any, index: any) => (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => handleChatSelect(notification?.id)}
                    className={currentChatId === notification.id ? 'activeChat' : 'commonChat'}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <div className="p-1 heading">{notification.name}</div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ flex: "70%" }}>
          <ChatPage selectedChat={selectedChat} />
        </Box>
      </Card>
      <FilteredChat open={open} setOpen={setOpen} />
    </Box>
  );
};

export default ChatHistory;
