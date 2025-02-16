import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SecondaryFooter from "./SecondaryFooter";

function DiseaseAlerts() {
  // State for storing alerts and loading status
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Flask API when the component mounts
  useEffect(() => {
    fetch("http://localhost:8200/api/latest-health/alerts")
      .then((response) => response.json())
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching disease alerts:", error);
        setLoading(false);
      });
  }, []);

  // Display loading message while fetching data
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <div className="container" style={{ marginTop: "100px" }}>
        <h1
          style={{
            fontSize: "2.5rem", // Font size
            fontWeight: "bold", // Font weight
            color: "#343a40", // Text color
            marginBottom: "1.5rem", // Bottom margin
            textAlign: "center", // Center alignment
            padding: "0.5rem 0", // Padding on top and bottom
            borderBottom: "2px solid #007bff", // Bottom border
            maxWidth: "80%", // Max width
            margin: "0 auto", // Centering
          }}
        >
          Health Alerts
        </h1>

        {/* Check if there are any alerts */}
        {alerts.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No disease alerts available at the moment.
          </div>
        ) : (
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Health Alerts</th>
                <th>Documents</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, index) => (
                <tr key={index}>
                  <td>{alert.title}</td>
                  <td>
                    {alert.documents.map((doc, docIndex) => (
                      <div key={docIndex}>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.text}
                        </a>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
      <SecondaryFooter />
    </div>
  );
}

export default DiseaseAlerts;
