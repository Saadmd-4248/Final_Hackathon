import React from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Grid,
} from "@mui/material";

const ProfilePage = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          opacity: 0,
          animation: "fadeIn 0.8s ease forwards",
        }}
      >
        <Typography variant="h6">No profile data available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 6,
        px: 2,
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          transition: "all 0.4s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          },
          animation: "fadeIn 0.8s ease forwards",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Avatar & Name Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
              animation: "fadeIn 1s ease forwards",
            }}
          >
            <Avatar
              alt={user.name}
              src={user.avatar || "/static/images/avatar/1.jpg"}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                fontSize: "3.5rem",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.08)" },
              }}
            />
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.role || "User"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Profile Details */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Department
              </Typography>
              <Typography variant="body1">
                {user.department || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Status
              </Typography>
              <Typography variant="body1">
                {user.status || "Active"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
