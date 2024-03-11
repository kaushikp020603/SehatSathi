import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import toast from "react-hot-toast";
import moment from "moment";
function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-status",
        { doctorId: record._id, status, userId: record.userId }, // Include userId here
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error("Error changing doctor status:");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Doctor List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default DoctorList;
