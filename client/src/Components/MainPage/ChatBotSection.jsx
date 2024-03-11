import React from "react";
import { Typography, Container, Button } from "@mui/material";

const ChatBotSection = () => {
  const redirectToChatbot = () => {
    window.location.href = "https://chatbot.page/D_586R";
  };

  return (
    <section>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Donate Now
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for considering a donation! Your generosity helps us
          continue our mission and support those in need. Whether it's a
          one-time gift or a monthly contribution, every donation makes a
          difference.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={redirectToChatbot}
          style={{ marginBottom: "2rem" }}
        >
          Donate Now
        </Button>
      </Container>
    </section>
  );
};

export default ChatBotSection;
