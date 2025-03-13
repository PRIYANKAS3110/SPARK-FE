import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import Layout from '../components/Layout';

export default function RoadmapPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [error, setError] = useState('');
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setError('');
    setRoadmap(null);

    try {
      const response = await fetch(`${BACKEND_URL}/insight/generate-roadmap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_title: jobTitle, available_time: availableTime }),
      });

      const data = await response.json();
      if (response.ok) {
        setRoadmap(data.roadmap);
      } else {
        setError(data.error || 'Failed to generate roadmap.');
      }
    } catch (err) {
      setError('Error connecting to the backend.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          AI-Generated Career Roadmap
        </Typography>
        <Typography variant="body1" paragraph>
          Enter your job title and available preparation time to generate a structured roadmap.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Available Time (e.g., 2 weeks, 3 months)"
              variant="outlined"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleGenerateRoadmap}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {roadmap && (
        <Paper elevation={3} sx={{ p: 3, mt: 3, whiteSpace: 'pre-line' }}>
          <Typography variant="h5" fontWeight="bold">
            Career Roadmap:
          </Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: roadmap.replace(/\n/g, '<br/>') }} />
        </Paper>
      )}
    </Layout>
  );
}
