import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Toaster } from "react-hot-toast";
import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./route_components/ProtectedRoute";
import PublicRoute from "./route_components/PublicRoute";
import MainPage from "./Components/MainPage/MainPage";
import ApplyDoctor from "./Components/ApplyDoctor";
import Notifications from "./Components/Notifications";
import Userlist from "./Components/Admin/Userlist";
import DoctorList from "./Components/Admin/DoctorList";
import Profile from "./Components/Doctor/Profile";
import BookAppointment from "./Components/BookAppointment";
import Appointments from "./Components/Doctor/Appointments";
import DoctorAppointments from "./Components/Doctor/DoctorAppointments";
import Game from "./Components/Home/Game";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/userslist"
            element={
              <ProtectedRoute>
                <Userlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/doctorslist"
            element={
              <ProtectedRoute>
                <DoctorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile/:userid"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-appointment/:doctorId"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
