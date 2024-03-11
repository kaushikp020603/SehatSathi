import React, { useState } from "react";
import logo from "../assets/logo10.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-4-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Game",
      path: "/game",
      icon: "ri-puzzle-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-4-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-3-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-id-card-line",
    },
  ];

  console.log("Value of user:", user);
  const doctorMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-home-4-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Attendance",
      path: "/apply-doctor",
      icon: "ri-id-card-fill",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-id-card-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            {collapsed ? (
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "225px",
                  height: "100px",
                  top: "0",
                  left: "0",
                }}
              />
            ) : null}
            <h1 className="role">{role}</h1>

            <div className="menu">
              {menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`d-flex menu-item ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <i className={menu.icon}></i>
                    {collapsed && <Link to={menu.path}>{menu.name}</Link>}
                  </div>
                );
              })}
              <div
                className={`d-flex menu-item`}
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <i className={"ri-logout-box-line"}></i>
                {collapsed && <Link to="/">Logout</Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-close-large-fill header-action-icon"
                onClick={() => setCollapsed(false)} // Expand the sidebar
              ></i>
            ) : (
              <i
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(true)} // Collapse the sidebar
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-3-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-3" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
