import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import QueryBuilderSharpIcon from "@mui/icons-material/QueryBuilderSharp";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";

function Attendance() {
  const [names, setNames] = useState([]);
  const [rolls, setRolls] = useState([]);
  const [times, setTimes] = useState([]);
  const [totalReg, setTotalReg] = useState(0);
  const [mess, setMess] = useState("");
  const { user } = useSelector((state) => state.user);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8100/api/attendance")
      .then((response) => response.json())
      .then((data) => {
        setNames(data.names);
        setRolls(data.rolls);
        setTimes(data.times);
        setTotalReg(data.totalReg);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("http://localhost:8100/api/add-user", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setMess(data.message);
        // Optionally, update state or perform other actions based on response
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  const handleTakeAttendance = () => {
    fetch("http://localhost:8100/api/start-attendance", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setNames(data.names);
        setRolls(data.rolls);
        setTimes(data.times);
        setTotalReg(data.totalReg);
        setMess(""); // Clear any previous error message
      })
      .catch((error) => {
        console.error("Error taking attendance:", error);
        setMess("Error taking attendance. Please try again.");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://i.makeagif.com/media/9-14-2021/3XxbIh.gif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "-1",
      }}
    >
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ fontSize: "18px", color: "#333", margin: "0" }}>
            <QueryBuilderSharpIcon style={{ marginRight: "5px" }} />
            Current Time:
            <span style={{ fontWeight: "bold" }}>
              {time.toLocaleTimeString()}
            </span>
          </p>
        </div>

        <div className="App">
          {mess && (
            <p
              className="text-center"
              style={{ color: "red", fontSize: "20px" }}
            >
              {mess}
            </p>
          )}

          <div
            className="row text-center"
            style={{ padding: "20px", margin: "20px" }}
          >
            <div
              className="col"
              style={{
                borderRadius: "20px",
                padding: "0px",
                backgroundColor: "rgba(211,211,211,0.5)",
                margin: "0px 10px 10px 10px",
                minHeight: "400px",
              }}
            >
              <h2
                style={{
                  borderRadius: "20px 20px 0px 0px",
                  backgroundColor: "#0b4c61",
                  color: "white",
                  padding: "10px",
                }}
              >
                Register Your Face{" "}
                <FaceRetouchingNaturalOutlinedIcon
                  style={{ fontSize: "35px" }}
                />
              </h2>
              <form onSubmit={handleAddUser} encType="multipart/form-data">
                <label style={{ fontSize: "20px" }}>
                  <b>Your User Name*</b>
                </label>
                <br />
                <input
                  type="text"
                  id="newusername"
                  name="newusername"
                  value={user?.name}
                  style={{
                    fontSize: "20px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    cursor: "not-allowed",
                  }}
                  required
                  readOnly
                />
                <br />
                <label style={{ fontSize: "20px" }}>
                  <b>Your User Id*</b>
                </label>
                <br />
                <input
                  type="text"
                  id="newuserid"
                  name="newuserid"
                  value={user?._id}
                  style={{
                    fontSize: "20px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    cursor: "not-allowed",
                  }}
                  readOnly
                  required
                />
                <br />
                <button
                  style={{
                    width: "232px",
                    marginTop: "20px",
                    fontSize: "20px",
                  }}
                  type="submit"
                  className="btn btn-dark"
                >
                  Register
                </button>
              </form>
            </div>

            <div
              className="col"
              style={{
                borderRadius: "20px",
                padding: "0px",
                backgroundColor: "rgba(211,211,211,0.5)",
                margin: "0px 10px 10px 10px",
                height: "400px",
              }}
            >
              <h2
                style={{
                  borderRadius: "20px 20px 0px 0px",
                  backgroundColor: "#0b4c61",
                  color: "white",
                  padding: "10px",
                }}
              >
                Attendance{" "}
                <EventAvailableOutlinedIcon style={{ fontSize: "35px" }} />
              </h2>

              <img
                src="https://cdn.sanity.io/images/4y5gb0f2/production/99ce546807fcf13b7a8dca6621510b136e41c79c-600x338.gif"
                alt="GIF"
                height="200px"
                width="400px"
              />
              <hr />

              <button
                style={{
                  width: "340px",
                  marginTop: "20px",
                  fontSize: "20px",
                }}
                type="button"
                className="btn btn-primary"
                onClick={handleTakeAttendance}
              >
                Take Attendance
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Attendance;
