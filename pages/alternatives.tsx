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
  CircularProgress,
  Chip,
  Divider,
  useTheme,
  alpha,
  InputAdornment
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import LaunchIcon from '@mui/icons-material/Launch';
import Layout from '../components/Layout';

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
  const theme = useTheme();
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!role.trim()) {
      setError('Please enter a job role');
      return;
    }
    
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Box 
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          borderRadius: 2,
          color: 'white',
          p: 4,
          mb: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Find Your Dream Job
        </Typography>
        <Typography variant="h6" paragraph sx={{ opacity: 0.9, mb: 4 }}>
          Search through millions of listings from Google Jobs to discover your next opportunity
        </Typography>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Job Role"
                variant="outlined"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Software Engineer, Marketing Manager..."
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                placeholder="New York, Remote, London..."
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={loading}
                size="large"
                sx={{ 
                  height: '56px', 
                  boxShadow: theme.shadows[4]
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {error && (
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 3, 
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            borderLeft: `4px solid ${theme.palette.error.main}`,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography color="error.main">
            {error}
          </Typography>
        </Paper>
      )}

      {/* Results Section */}
      {jobs.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            {jobs.length} Job Opportunities Found
          </Typography>
          <Divider sx={{ mb: 3 }} />
        </Box>
      )}

      <Grid container spacing={3}>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  },
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardHeader
                  title={
                    <Typography variant="h6" fontWeight="bold" noWrap>{job.title}</Typography>
                  }
                  subheader={
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <BusinessIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                      <Typography variant="subtitle2" noWrap>{job.company}</Typography>
                    </Box>
                  }
                  action={
                    <Chip 
                      icon={<LocationOnIcon fontSize="small" />} 
                      label={job.location} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  }
                  sx={{ pb: 1 }}
                />
                <Divider />
                <CardContent sx={{ flexGrow: 1 }}>
                  {job.posted_date && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                      <Typography variant="body2" color="text.secondary">
                        Posted: {job.posted_date}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', mb: 1.5 }}>
                    <DescriptionIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: theme.palette.text.secondary }} />
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {job.description}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    href={job.job_url}
                    target="_blank"
                    endIcon={<LaunchIcon />}
                  >
                    View Job Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          !loading && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                width: '100%', 
                mt: 4, 
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <WorkIcon sx={{ fontSize: 60, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No job results found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your search terms or location
              </Typography>
            </Box>
          )
        )}
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
            <CircularProgress size={40} />
          </Box>
        )}
      </Grid>
    </Layout>
  );
}