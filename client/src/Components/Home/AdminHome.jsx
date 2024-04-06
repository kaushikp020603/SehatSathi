// AdminHome.js
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";

function AdminHome() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    async function fetchAttendanceData() {
      try {
        const response = await axios.get(
          "http://localhost:8100/attendance_data"
        );
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
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

  return (
    <Layout>
      <div>
        {attendanceData && (
          <div>
            <h2>Doctor Attendance today</h2>
            <table style={{ width: "50%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Name</th>
                  <th style={tableHeaderStyle}>ID</th>
                  <th style={tableHeaderStyle}>Time</th>
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
                    <td style={tableCellStyle}>
                      {attendanceData.times[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

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

export default AdminHome;
