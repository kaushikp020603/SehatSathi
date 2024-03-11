import Layout from "./Layout";
import gif from "../assets/gif.gif";

import React, { useEffect, useState } from "react";

import DoctorForm from "./Doctor/DoctorForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";

function BookAppointment() {
  const [isAvailable, setisAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const { user } = useSelector((state) => state.user);
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setisAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          date: date,
          doctorInfo: doctor,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error Booking Appointment");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setisAvailable(true);
      } else {
        toast.error("Appointment  is not available on this day and time.");
      }
    } catch (error) {
      toast.error("Error Booking Appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []); // Only user is needed as a dependency

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={12} sm={24} xs={24} lg={8}>
              <img
                src={gif}
                alt="Doctor saying book now"
                width="100%"
                height="400"
              />
            </Col>
            <Col span={12} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings: </b>
                {doctor.timings[0]} -{doctor.timings[1]}
              </h1>
              <p>
                <b>Phone Number:</b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address:</b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Fee Per visit:</b>
                {doctor.feePerConsultation}
              </p>
              <p>
                <b>Specialization:</b>
                {doctor.specialization}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setisAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setisAvailable(false);
                    setTime(value && value.format("HH:mm"));
                  }}
                  disabledHours={() => {
                    if (!doctor) return [];
                    const [startHour, endHour] = doctor.timings.map((time) =>
                      parseInt(time.split(":")[0])
                    );
                    const allHours = Array.from(
                      { length: 24 },
                      (_, index) => index
                    );
                    return allHours.filter(
                      (hour) => hour < startHour || hour > endHour
                    );
                  }}
                />

                <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>
                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
