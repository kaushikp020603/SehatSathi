import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { TextField, Button, Typography } from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";

const ContactSection = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_dki4hck", "template_nmf9qdn", form.current, {
        publicKey: "6C6jv1P-v5hQYC1Ia",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          // Reset form fields after successful send
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <StyledContactSection id="contact-information">
      {" "}
      {/* Added id here */}
      <div className="contact-info">
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <div className="contact-item">
          <Phone />
          <Typography>+91 9372551438/7738195857</Typography>
        </div>
        <div className="contact-item">
          <Email />
          <Typography>sehatsathi@gmail.com</Typography>
        </div>
        <div className="contact-item">
          <LocationOn />
          <Typography>
            AP Shah Insitute of Technology,Kasarvadavli,Thane
          </Typography>
        </div>
      </div>
      <div className="contact-form">
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <form ref={form} onSubmit={sendEmail}>
          <TextField
            label="Name"
            name="from_name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="from_email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "100%" }}
          >
            Send
          </Button>
        </form>
      </div>
    </StyledContactSection>
  );
};

export default ContactSection;

// Styles
const StyledContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .contact-info {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f0f0f0;
    text-align: center;
    animation: slideIn 0.5s forwards;

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;

      svg {
        margin-right: 0.5rem;
        color: #007bff;
      }
    }
  }

  .contact-form {
    max-width: 400px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
`;
