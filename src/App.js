import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/auth/Login/Login.tsx";
import SignUp from "../src/pages/auth/SignUp/SignUp.tsx";
import Dashboard from "../src/pages/Dashborad/Dashboard.tsx";
import ForgotPassword from "./pages/auth/ForgetPassword/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword.tsx";
import { Toaster } from "react-hot-toast";

const Aunthentication = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace={true} />;
};

function App() {
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
      <Toaster />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <Aunthentication>
              <Dashboard />
            </Aunthentication>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
