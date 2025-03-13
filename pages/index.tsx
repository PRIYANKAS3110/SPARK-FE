import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import ChatIcon from '@mui/icons-material/Chat';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Fake Job Detection System
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Fake Job Detection System. This platform helps you validate job listings and identify potentially fraudulent opportunities.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', backgroundColor: '#e0f2fe' }}>
            <CardHeader 
              avatar={<VerifiedIcon color="primary" />}
              title="AI Job Validation"
            />
            <CardContent>
              <Typography variant="body2">
                Upload or enter job details to get an AI analysis of its legitimacy.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', backgroundColor: '#dcfce7' }}>
            <CardHeader 
              avatar={<FindReplaceIcon sx={{ color: 'green' }} />}
              title="Genuine Alternatives"
            />
            <CardContent>
              <Typography variant="body2">
                If a job is flagged as suspicious, we'll suggest legitimate alternatives.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', backgroundColor: '#f3e8ff' }}>
            <CardHeader 
              avatar={<ChatIcon sx={{ color: 'purple' }} />}
              title="AI Chatbot Assistant"
            />
            <CardContent>
              <Typography variant="body2">
                Get real-time help with job verification and advice from our AI assistant.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}