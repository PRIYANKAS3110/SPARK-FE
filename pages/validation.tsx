import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import Layout from "../components/Layout";

export default function DetectJob() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleDetectJob = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
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

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Fake Job Detection
        </Typography>
        <Typography variant="body1" paragraph>
          Enter a job posting description to analyze whether it is fraudulent or legitimate.
        </Typography>
      </Paper>

      <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center" }}>
        <TextField
          fullWidth
          multiline
          rows={5}
          variant="outlined"
          label="Enter Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleDetectJob}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Analyze Job"}
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {result && (
          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6">Detection Result:</Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: result.status.includes("⚠️") ? "red" : "green" }}>
                {result.status}
              </Typography>

              {result.role_name && (
                <>
                  <Typography variant="h6" sx={{ mt: 2 }}>Suggested Role:</Typography>
                  <Typography variant="body1">{result.role_name}</Typography>
                </>
              )}

              {result.roadmap && (
                <>
                  <Typography variant="h6" sx={{ mt: 2 }}>Career Roadmap:</Typography>
                  <Paper sx={{ p: 2, mt: 1, backgroundColor: "#f5f5f5" }}>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: "pre-wrap" }}>
                      {result.roadmap}
                    </Typography>
                  </Paper>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Layout>
  );
}
