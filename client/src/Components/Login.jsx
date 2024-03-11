import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import videobg1 from "../assets/5.mp4";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null);

  const onChange = (token) => {
    // Set the CAPTCHA token when it changes
    setCaptchaToken(token);
  };

  const onFinish = async (values) => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification.");
      return;
    }

    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Dashboard");
        localStorage.setItem("token", response.data.data);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="video">
      <video src={videobg1} autoPlay loop muted className="videobg1" />
      <div className="authentication">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Welcome back to SehatSathi</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email." }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password." },
              ]}
            >
              <Input placeholder="Password" type="password" />
            </Form.Item>
            <Form.Item>
              <ReCAPTCHA
                sitekey="6Le0q4IpAAAAAJJDr40HV9RMmzCe8jbin3CtVUnQ"
                onChange={onChange}
              />
            </Form.Item>
            <div className="d-flex  flex-column ">
              <Button
                className="primary-button my-2 full-width-button"
                htmlType="submit"
              >
                Login
              </Button>
              <br></br>
              <Link to="/register" className="anchor mt-2">
                CLICK HERE TO Register
              </Link>
            </div>
          </Form>
          {/* Homepage Button */}
          <div style={{ marginTop: 20 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
