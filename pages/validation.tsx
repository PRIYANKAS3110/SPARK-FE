import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Container,
  Divider,
  Chip,
  Fade,
  useTheme,
  Tooltip,
  IconButton
} from "@mui/material";
import Layout from "../components/Layout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SecurityIcon from "@mui/icons-material/Security";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import { alpha } from "@mui/material/styles";

export default function DetectJob() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const theme = useTheme();
  
  const handleDetectJob = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description to analyze.");
      return;
    }
   
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/jobs/detect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_description: jobDescription }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!result) return theme.palette.grey[500];
    return result.status.includes("⚠️") ? theme.palette.error.main : theme.palette.success.main;
  };

  const placeholderText = `Example: 
REMOTE POSITION - Customer Service Representative
Work from home! Flexible hours and great pay. Only 2-3 hours per day required.
$35/hr starting pay. No experience needed, training provided. 
Contact us at jobs@example-company.net with your bank details for direct deposit setup.`;

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.dark, 0.05)})`,
            backdropFilter: "blur(8px)",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <SecurityIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
              Fake Job Detection
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            Protect yourself from job scams. Our AI-powered system analyzes job listings to detect potential fraud and helps you make informed career decisions.
          </Typography>
          <Box sx={{ display: "flex", mt: 2 }}>
            <Chip 
              icon={<InfoOutlinedIcon />} 
              label="AI-Powered Analysis" 
              size="small" 
              color="primary" 
              variant="outlined" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              icon={<SecurityIcon />} 
              label="Fraud Detection" 
              size="small" 
              color="primary" 
              variant="outlined" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              icon={<WorkOutlineIcon />} 
              label="Career Guidance" 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
        </Paper>

        <Card 
          elevation={3} 
          sx={{ 
            borderRadius: 2, 
            overflow: "visible",
            mb: 4,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">
                Enter Job Description
              </Typography>
              <Tooltip title="Paste the complete job posting text including job title, description, requirements, and contact information">
                <IconButton size="small" sx={{ ml: 1 }}>
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              placeholder={placeholderText}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  backgroundColor: theme.palette.background.paper,
                }
              }}
            />
            
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleDetectJob}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AnalyticsOutlinedIcon />}
                sx={{ 
                  px: 4, 
                  py: 1, 
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold"
                }}
              >
                {loading ? "Analyzing..." : "Analyze Job Posting"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {error && (
          <Fade in={!!error}>
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Fade>
        )}

        {result && (
          <Fade in={!!result}>
            <Card 
              elevation={3} 
              sx={{ 
                borderRadius: 2,
                mb: 3,
                border: `1px solid ${alpha(getStatusColor(), 0.3)}`,
                boxShadow: `0 4px 20px ${alpha(getStatusColor(), 0.15)}`
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Typography variant="h5" fontWeight="bold">
                    Analysis Results
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    backgroundColor: alpha(getStatusColor(), 0.05),
                    border: `1px solid ${alpha(getStatusColor(), 0.2)}`,
                    mb: 3
                  }}
                >
                  <Typography variant="h6" fontWeight="medium" sx={{ color: getStatusColor(), display: "flex", alignItems: "center" }}>
                    <SecurityIcon sx={{ mr: 1 }} />
                    Status:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1, fontSize: "1.1rem" }}>
                    {result.status}
                  </Typography>
                </Box>

                {result.role_name && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight="medium" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <WorkOutlineIcon sx={{ mr: 1 }} />
                      Suggested Role:
                    </Typography>
                    <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
                      <Typography variant="body1">{result.role_name}</Typography>
                    </Paper>
                  </Box>
                )}

                {result.roadmap && (
                  <Box>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" fontWeight="medium" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <RouteOutlinedIcon sx={{ mr: 1 }} />
                      Career Roadmap:
                    </Typography>
                    <Paper sx={{ 
                      p: 3, 
                      backgroundColor: alpha(theme.palette.background.default, 0.7),
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`
                    }}>
                      <Typography variant="body2" component="pre" sx={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                        {result.roadmap}
                      </Typography>
                    </Paper>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Fade>
        )}
      </Container>
    </Layout>
  );
}