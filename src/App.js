import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/auth/Login/Login.tsx";
import LoginAdmin from "../src/pages/Admin/Login.tsx";
import AdminDashboard from "../src/pages/Admin/AdminDashboard.tsx";
import SignUp from "../src/pages/auth/SignUp/SignUp.tsx";
import ForgotPassword from "./pages/auth/ForgetPassword/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword.tsx";
import { Toaster } from "react-hot-toast";
import Layout from "../src/layout/Layout.tsx";
import Dashboard from "../src/pages/Dashborad/Dashboard.tsx";
import Lead from "../src/pages/Dashborad/Lead.tsx";
import ChatHistory from "./pages/Dashborad/ChatHistory.tsx";
import SettingsSidebar from "./pages/Dashborad/SettingsSidebar.tsx";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import Spinner from "./services/loader/spinner.tsx";
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

const App = () => {
  const Aunthentication = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" replace={true} />;
  };

  const activityLoader = useSelector((state) => state.activityLoader.loading);
  return (
    <div>
      {activityLoader ? (
        <Spinner />
      ) : (
        <ThemeProvider theme={theme}>
          <Toaster />
          <Layout>
            <Routes>
              <Route path="/signup/:token" element={<SignUp />} />
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/admin/login" element={<LoginAdmin />} />
            </Routes>

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
              <Route
                path="/settings"
                element={
                  <Aunthentication>
                    <SettingsSidebar />
                  </Aunthentication>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <Aunthentication>
                    <AdminDashboard />
                  </Aunthentication>
                }
              />
            </Routes>
          </Layout>
        </ThemeProvider>
      )}
    </div>
  );
};

export default App;
