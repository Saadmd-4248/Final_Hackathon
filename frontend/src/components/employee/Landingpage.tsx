import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InsightsIcon from "@mui/icons-material/Insights";
import logoImg from "../../assets/images/logo.png";

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        overflowX: "hidden",
        animation: "fadeIn 1s ease forwards",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* 🌟 Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1.5, px: { xs: 2, md: 6 } }}>
          {/* Left: Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src={logoImg}
              alt="HealthMate Logo"
              sx={{ width: 42, height: 42, borderRadius: "10px" }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              HealthMate
            </Typography>
          </Box>

          {/* Right: Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 2.8,
                py: 0.9,
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 💡 Hero Section */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 8, md: 14 },
          textAlign: { xs: "center", md: "left" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "slideUp 1s ease forwards",
          "@keyframes slideUp": {
            from: { opacity: 0, transform: "translateY(40px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Grid container spacing={6} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              HealthMate —{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Sehat ka Smart Dost
              </Box>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Aapka AI-powered health companion — jo medical reports samjhaaye,
              vitals track kare, aur aapko simple Roman Urdu mein health tips
              de.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.2,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/learn-more"
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.2,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
              alt="HealthMate Illustration"
              sx={{
                width: "100%",
                maxWidth: 400,
                animation: "float 3s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-12px)" },
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* 🚀 Features Section */}
      <Box
        sx={{
          py: 12,
          bgcolor: "background.paper",
          animation: "fadeIn 1.2s ease forwards",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 8,
            }}
          >
            Why Choose HealthMate?
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
          >
            {[
              {
                icon: <HealthAndSafetyIcon sx={{ fontSize: 44, color: "primary.main" }} />,
                title: "Understand Your Reports",
                desc: "Upload reports aur AI se simple explanation hasil karein — English aur Roman Urdu dono mein.",
              },
              {
                icon: <InsightsIcon sx={{ fontSize: 44, color: "primary.main" }} />,
                title: "Track Vitals Easily",
                desc: "Apni BP, sugar, aur weight jaisi readings track karein aur unka visual trend dekhein.",
              },
              {
                icon: <FavoriteIcon sx={{ fontSize: 44, color: "primary.main" }} />,
                title: "Stay Healthy with Insights",
                desc: "AI se daily health tips aur lifestyle improvements ke liye suggestions hasil karein.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: "16px",
                    textAlign: "center",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent>
                    {feature.icon}
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        lineHeight: 1.6,
                        maxWidth: 280,
                        mx: "auto",
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ⚙️ Footer */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider",
          animation: "fadeIn 1.5s ease forwards",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} <strong>HealthMate</strong> — Sehat ka Smart Dost
        </Typography>
      </Box>
    </Box>
  );
}
