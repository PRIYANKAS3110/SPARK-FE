import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import Layout from '../components/Layout';

// ✅ Define the job listing type
interface Job {
  title: string;
  company: string;
  location: string;
  posted_date?: string;
  description: string;
  job_url: string;
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GoogleJobsSearch() {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]); // ✅ Use Job[] instead of never[]
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setJobs([]);

    try {
      const response = await fetch(`${BACKEND_URL}/alternatives/search-google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, location }),
      });

      const data = await response.json();
      if (response.ok) {
        setJobs(data);
      } else {
        setError(data.error || 'Failed to fetch jobs.');
      }
    } catch (err) {
      setError('Error fetching jobs. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Google Jobs Search
        </Typography>
        <Typography variant="body1" paragraph>
          Enter a job role and location to find job postings from Google Jobs.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Job Role"
              variant="outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%', backgroundColor: '#e0f7fa' }}>
                <CardHeader
                  avatar={<WorkIcon color="primary" />}
                  title={job.title} // ✅ Fixed
                  subheader={job.company} // ✅ Fixed
                />
                <CardContent>
                  <Typography variant="body2">
                    <strong>Location:</strong> {job.location} // ✅ Fixed
                  </Typography>
                  <Typography variant="body2">
                    <strong>Posted:</strong> {job.posted_date || 'Unknown'} // ✅ Fixed
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {job.description} // ✅ Fixed
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    href={job.job_url} // ✅ Fixed
                    target="_blank"
                  >
                    View Job
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          !loading && (
            <Typography sx={{ textAlign: 'center', width: '100%', mt: 2 }}>
              No job results found.
            </Typography>
          )
        )}
      </Grid>
    </Layout>
  );
}
