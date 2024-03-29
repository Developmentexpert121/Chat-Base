import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/auth/Login/Login.tsx";
import SignUp from "../src/pages/auth/SignUp/SignUp.tsx";
import ForgotPassword from "./pages/auth/ForgetPassword/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword.tsx";
import { Toaster } from "react-hot-toast";
import Layout from "../src/layout/Layout.tsx";
import Dashboard from "../src/pages/Dashborad/Dashboard.tsx";
import Lead from "../src/pages/Dashborad/Lead.tsx";
import ChatHistory from "./pages/Dashborad/ChatHistory.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 9, // Adjust the value as needed
        },
      },
    },
  },
});

function App() {
  const Aunthentication = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" replace={true} />;
  };
  return (
    <div
      style={
        {
          // backgroundImage: `url('./assets/bglandscape.jpg')`,
          // backgroundSize: "cover",
          // minHeight: "100vh",
        }
      }
    >
      <ThemeProvider theme={theme}>
        <Toaster />

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Layout>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Aunthentication>
                  <Dashboard />
                </Aunthentication>
              }
            />
            <Route
              path="/lead"
              element={
                <Aunthentication>
                  <Lead />
                </Aunthentication>
              }
            />
            <Route
              path="/chat-history"
              element={
                <Aunthentication>
                  <ChatHistory />
                </Aunthentication>
              }
            />
          </Routes>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
