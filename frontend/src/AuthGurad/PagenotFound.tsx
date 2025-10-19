// NotFoundPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold", color: "error.main" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: "text.secondary" }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/main")}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
