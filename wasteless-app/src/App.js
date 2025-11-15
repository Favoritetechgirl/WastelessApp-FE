import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddWaste from "./pages/AddWaste";
import Notifications from "./pages/Notifications";
import SplashScreen from "./pages/SplashScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add" element={<AddWaste />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/splashscreen" element={<SplashScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
