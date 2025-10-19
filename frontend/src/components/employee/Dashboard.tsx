import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CircularProgress,
  Alert,
  Box,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReportCard from "./ReportCard";
import axios from "axios";
import { GEMINI_API_URL } from "../../config/gemini";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Dashboard() {
  const theme = useTheme();
  const [openUpload, setOpenUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [analysisError, setAnalysisError] = useState("");

  const reports = [
    { id: "r1", title: "CBC Report", date: "2025-10-10", summary: "Hb low, WBC normal" },
    { id: "r2", title: "Lipid Profile", date: "2025-08-01", summary: "LDL slightly high" },
  ];

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);

    if (selected && selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setPreview("");
    }
  };

  const extractPdfText = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += `\n\n--- Page ${pageNum} ---\n${pageText}`;
    }
    return fullText;
  };

  const analyzeWithGemini = async (text, reportType) => {
    try {
      setIsAnalyzing(true);
      setAnalysisError("");

      const prompt = `Analyze this medical report:\nType: ${reportType}\nDate: ${date}\n\n${text}`;
      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      setAnalysisResult(aiText);
    } catch (err) {
      console.error(err);
      setAnalysisError("Failed to analyze report. Check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");
    if (file.type === "application/pdf") {
      const text = await extractPdfText(file);
      if (text.trim()) await analyzeWithGemini(text, type || "Medical Report");
      else setAnalysisError("Couldn't extract text from PDF.");
    } else if (file.type.startsWith("image/")) {
      setAnalysisError("Image analysis not implemented yet.");
    }
  };

  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: isDark
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
          : "linear-gradient(135deg, #fafafa 0%, #fef3c7 100%)",
        transition: "background 0.3s ease",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4"
      >
        <div>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              letterSpacing: "0.5px",
            }}
          >
            Your Reports
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Upload and let Gemini explain your reports ✨
          </Typography>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="contained"
            onClick={() => setOpenUpload(true)}
            sx={{
              background: "linear-gradient(90deg, #f97316, #fb923c)",
              color: "#fff",
              borderRadius: "10px",
              textTransform: "none",
              px: 3,
              py: 1.2,
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(249,115,22,0.4)",
              "&:hover": {
                background: "linear-gradient(90deg,#ea580c,#f97316)",
              },
            }}
          >
            Upload Report
          </Button>
        </motion.div>
      </motion.div>

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {reports.map((r, index) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: isDark
                  ? "0px 10px 25px rgba(255,255,255,0.08)"
                  : "0px 10px 25px rgba(0,0,0,0.1)",
              }}
            >
              <Card
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  backgroundColor: theme.palette.background.paper,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  boxShadow: isDark
                    ? "0 4px 20px rgba(255,255,255,0.05)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <ReportCard report={r} />
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Upload Dialog */}
      <AnimatePresence>
        {openUpload && (
          <Dialog
            open={openUpload}
            onClose={() => setOpenUpload(false)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
              transition: { duration: 0.3 },
              sx: {
                borderRadius: 3,
                bgcolor: theme.palette.background.default,
                boxShadow: isDark
                  ? "0 10px 40px rgba(255,255,255,0.1)"
                  : "0 10px 40px rgba(0,0,0,0.1)",
              },
            }}
          >
            <DialogTitle sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              Upload Report
            </DialogTitle>
            <DialogContent dividers>
              <form onSubmit={handleUpload} className="space-y-4 mt-2">
                <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} />

                {file && (
                  <Card
                    sx={{
                      p: 2,
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                      borderRadius: "12px",
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={preview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: "250px",
                          objectFit: "contain",
                          borderRadius: "10px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          color: theme.palette.primary.main,
                        }}
                      >
                        <PictureAsPdfIcon sx={{ fontSize: 60 }} />
                        <Typography variant="body2">{file.name}</Typography>
                      </div>
                    )}
                  </Card>
                )}

                <TextField
                  type="date"
                  fullWidth
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                  label="Report Type (e.g., CBC, X-Ray)"
                  fullWidth
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </form>

              {isAnalyzing && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                  <CircularProgress size={24} />
                  <Typography>Analyzing your report...</Typography>
                </Box>
              )}

              {analysisError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {analysisError}
                </Alert>
              )}

              {analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mt: 3, mb: 2, color: theme.palette.primary.main }}
                  >
                    📊 AI Analysis Results
                  </Typography>
                  <Card sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                      {analysisResult}
                    </Typography>
                  </Card>
                </motion.div>
              )}
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setOpenUpload(false);
                  setFile(null);
                  setPreview("");
                  setDate("");
                  setType("");
                  setAnalysisResult("");
                  setAnalysisError("");
                }}
                color="inherit"
              >
                {analysisResult ? "Close" : "Cancel"}
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg,#f97316,#fb923c)",
                  "&:hover": { background: "linear-gradient(90deg,#ea580c,#f97316)" },
                }}
                onClick={handleUpload}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Upload & Analyze"}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  );
}
