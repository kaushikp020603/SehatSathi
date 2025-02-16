import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Important for charts
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Import necessary components
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Line } from "react-chartjs-2";

// Cards component to show stats
function InfoCard({ title, value }) {
  return (
    <div style={cardStyle} className="info-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

function AdminHome() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentTrendsData, setAppointmentTrendsData] = useState(null);

  // Demo data for total patients, doctors, and appointments
  const totalPatients = 250; // Replace with actual data if available
  const totalDoctors = 15; // Replace with actual data if available
  const totalAppointments = 120; // Replace with actual data if available

  const appointmentTrendsContainerStyle = {
    marginTop: "100px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    height: "200px",
  };

  // Dummy data for charts (doctors attendance and appointments)
  const doctorAttendancePerDay = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Doctors Present",
        data: [10, 12, 8, 14, 9],
        backgroundColor: "#4A90E2",
      },
    ],
  };

  const appointmentsPerDay = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Appointments Booked",
        data: [20, 18, 22, 25, 19],
        backgroundColor: "#34B6A7",
      },
    ],
  };

  const appointmentTrends = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Appointments Booked",
        data: [40, 50, 30, 70, 60],
        backgroundColor: "rgba(52, 182, 167, 0.5)",
        borderColor: "#34B6A7",
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  const events = [
    {
      id: 1,
      title: "Weekly Staff Meeting",
      date: "2024-10-10",
      description: "Discussion on patient care strategies.",
    },
    {
      id: 2,
      title: "Health Awareness Camp",
      date: "2024-10-15",
      description: "Free health check-ups for the community.",
    },
  ];

  // Sample locations data for doctors
  const locations = [
    { id: 1, name: "Dr. Smith", position: [34.0522, -118.2437] },
    { id: 2, name: "Dr. John", position: [40.7128, -74.006] },
    { id: 3, name: "Dr. Alice", position: [51.5074, -0.1278] },
  ];

  useEffect(() => {
    async function fetchAttendanceData() {
      try {
        const response = await axios.get(
          "http://localhost:8100/attendance_data"
        );
        setAttendanceData(response.data);
        setDoctorCount(response.data.names.length); // Counting doctors based on attendance
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        // Demo attendance data if the API call fails
        const demoData = {
          names: ["Dr. Smith", "Dr. John", "Dr. Alice"],
          rolls: ["D001", "D002", "D003"],
          times: ["09:00 AM", "09:30 AM", "10:00 AM"],
        };
        setAttendanceData(demoData);
        setDoctorCount(demoData.names.length);
      }
    }
    fetchAttendanceData();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  const mapContainerStyle = {
    width: "100%", // Full width of the container
    height: "200px", // Fixed height for the map
    border: "1px solid #ddd", // Light border for distinction
    borderRadius: "5px", // Rounded corners
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    display: "flex", // Flexbox to center content
    flexDirection: "column", // Vertical layout
    marginBottom: "20px", // Space below the map
  };

  return (
    <Layout>
      <div style={{ marginBottom: "20px" }}>
        {/* Cards to display total stats */}
        <div style={cardContainerStyle}>
          <InfoCard title="Total Patients" value={totalPatients} />
          <InfoCard title="Total Doctors" value={totalDoctors} />
          <InfoCard title="Total Appoint - ments" value={totalAppointments} />
          <InfoCard title="Doctors Present Today" value={doctorCount} />
        </div>

        <div style={contentContainerStyle}>
          {/* Table to show doctor's attendance */}
          {attendanceData && (
            <div style={tableContainerStyle}>
              <h2>Doctor Attendance Today</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.names.map((name, index) => (
                    <tr
                      key={index}
                      style={
                        hoveredRow === index ? hoveredRowStyle : tableRowStyle
                      }
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <td style={tableCellStyle}>{name}</td>
                      <td style={tableCellStyle}>
                        {attendanceData.rolls[index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Charts Section */}
          <div style={chartContainerStyle}>
            <h3>Doctors Attendance per Day</h3>
            <Bar
              data={doctorAttendancePerDay}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: { beginAtZero: true },
                  y: { beginAtZero: true },
                },
              }}
              height={50}
            />
            <h3>Appointments Booked per Day</h3>
            <Bar
              data={appointmentsPerDay}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: { beginAtZero: true },
                  y: { beginAtZero: true },
                },
              }}
              height={50}
            />
          </div>
        </div>
        {/* Events and Announcements Section */}
        <div style={tableContainerStyle}>
          <h2>Events and Announcements</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {events.map((event) => (
              <li
                key={event.id}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <h4>{event.title}</h4>
                <p>{event.date}</p>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* Appointment Trends Section */}
        <div style={appointmentTrendsContainerStyle}>
          <h3>Appointment Trends</h3>
          <Bar
            data={appointmentTrends}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true },
              },
            }}
            height={50}
          />
        </div>
      </div>
    </Layout>
  );
}

// Styles for cards
const cardContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "20px",
};

const cardStyle = {
  backgroundColor: "#E0E9FF",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "20%",
  transition: "transform 0.3s, box-shadow 0.3s",
};

const contentContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const tableContainerStyle = {
  width: "45%",
};

const chartContainerStyle = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "20px", // Add space between the charts
  height: "200px",
};

// Hover effect for cards
const infoCardHoverStyle = {
  transform: "translateY(-10px)",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
};

// Styles for table
const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const tableCellStyle = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const hoveredRowStyle = {
  ...tableRowStyle,
  backgroundColor: "#f5f5f5",
};

// Add hover effect with CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  .info-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`,
  styleSheet.cssRules.length
);

export default AdminHome;
