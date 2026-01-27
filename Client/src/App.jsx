import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./Utils/useAuth";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useThemeStore } from "./Utils/useThemeStore";


const App = () => {
  const { checkAuth,onlineUsers } = useAuth();
const {theme} =   useThemeStore()
useEffect(() => {
  checkAuth();
}, [checkAuth]);


console.log(onlineUsers);

  return (
    <div data-theme={theme} >
      <Navbar />

      <Routes>
        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />

        {/* 🔓 Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
