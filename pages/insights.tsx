import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Alert,
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip
} from '@mui/material';
import Layout from '../components/Layout';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const jobSuggestions = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'Machine Learning Engineer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer'
];

const timeFrames = [
  '1 week',
  '2 weeks',
  '1 month',
  '3 months',
  '6 months'
];

export default function RoadmapPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleGenerateRoadmap = async () => {
    if (!jobTitle || !availableTime) {
      setError('Please fill in all fields');
      return;
    }
    
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
        setTimeout(() => {
          document.getElementById('roadmap-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        setError(data.error || 'Failed to generate roadmap.');
      }
    } catch (err) {
      setError('Error connecting to the backend. Please try again later.');
    }
    
    setLoading(false);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    alert('Sharing functionality would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleJobSuggestion = (job: string) => {
    setJobTitle(job);
  };

  const handleTimeFrameSuggestion = (time: string) => {
    setAvailableTime(time);
  };

  const renderRoadmap = () => {
    if (!roadmap) return null;
    
    const parseRoadmap = (text) => {
      const sections = [];
      const sectionRegex = /###\s+\*\*([\d]+\.\s+[\w\s]+)\*\*/g;
      const contentBlocks = text.split(sectionRegex);
      
      if (contentBlocks[0].trim()) {
        sections.push({
          title: 'Introduction',
          content: contentBlocks[0]
        });
      }
      
      const titles = [];
      let match;
      while ((match = sectionRegex.exec(text)) !== null) {
        titles.push(match[1]);
      }
      
      for (let i = 0; i < titles.length; i++) {
        sections.push({
          title: titles[i],
          content: contentBlocks[i + 1]
        });
      }
      
      return sections;
    };
    
    const sections = parseRoadmap(roadmap);
    
    return (
      <Box>
        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 2 }}>
              ## {section.title}
            </Typography>
            
            <Box sx={{ pl: 2 }}>
              {section.content.split('\n').map((line, lineIndex) => {
                if (!line.trim()) return null;
                
                if (line.trim().startsWith('- ')) {
                  return (
                    <Box key={lineIndex} sx={{ display: 'flex', mt: 1 }}>
                      <Typography sx={{ mr: 1 }}>•</Typography>
                      <Typography dangerouslySetInnerHTML={{ 
                        __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }} />
                    </Box>
                  );
                }
                
                return (
                  <Typography key={lineIndex} sx={{ mt: 1 }} 
                    dangerouslySetInnerHTML={{ 
                      __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }} 
                  />
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ 
          py: 5, 
          textAlign: 'center',
          background: `linear-gradient(120deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}20)`,
          borderRadius: 2,
          mb: 4,
          px: 2
        }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            AI Career Roadmap Builder
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, maxWidth: '800px', mx: 'auto', color: 'text.secondary' }}>
            Generate a personalized career preparation plan tailored to your job goals and available time
          </Typography>
        </Box>

        {/* Input Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkOutlineIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" fontWeight="medium">
                  What position are you targeting?
                </Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="e.g. Software Engineer, Data Scientist"
                variant="outlined"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {jobSuggestions.map((job) => (
                  <Chip 
                    key={job}
                    label={job} 
                    onClick={() => handleJobSuggestion(job)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: theme.palette.primary.light + '30' } 
                    }}
                    variant={jobTitle === job ? "filled" : "outlined"}
                    color={jobTitle === job ? "primary" : "default"}
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" fontWeight="medium">
                  How much time do you have to prepare?
                </Typography>
              </Box>
              <TextField
                fullWidth
                placeholder="e.g. 2 weeks, 3 months"
                variant="outlined"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {timeFrames.map((time) => (
                  <Chip 
                    key={time}
                    label={time} 
                    onClick={() => handleTimeFrameSuggestion(time)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: theme.palette.primary.light + '30' } 
                    }}
                    variant={availableTime === time ? "filled" : "outlined"}
                    color={availableTime === time ? "primary" : "default"}
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGenerateRoadmap}
                disabled={loading}
                endIcon={loading ? null : <NavigateNextIcon />}
                sx={{ 
                  minWidth: 200, 
                  py: 1.5,
                  borderRadius: '28px',
                  fontSize: '1rem',
                  boxShadow: 3
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Generate My Roadmap'
                )}
              </Button>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <InfoOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
                  The more detailed your information, the better your roadmap will be
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Results Section */}
        {roadmap && (
          <Box id="roadmap-results" sx={{ scrollMarginTop: '2rem' }}>
            <Card 
              elevation={3} 
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              {/* Header */}
              <Box 
                sx={{ 
                  py: 2, 
                  px: 3, 
                  bgcolor: theme.palette.primary.main + '10',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Your Career Roadmap
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={saved ? "Saved" : "Save Roadmap"}>
                    <IconButton onClick={handleSave} color={saved ? "primary" : "default"}>
                      <BookmarkIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton onClick={handleShare}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print">
                    <IconButton onClick={handlePrint}>
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              {/* Info Bar */}
              <Box sx={{ 
                p: 2, 
                bgcolor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap'
              }}>
                <Chip 
                  icon={<WorkOutlineIcon />} 
                  label={`Position: ${jobTitle}`} 
                  variant="outlined"
                />
                <Chip 
                  icon={<AccessTimeIcon />} 
                  label={`Preparation Time: ${availableTime}`}
                  variant="outlined"
                />
              </Box>
              
              {/* Roadmap Content */}
              <CardContent sx={{ p: 4 }}>
                {renderRoadmap()}
              </CardContent>
              
              {/* Footer */}
              <Box sx={{ 
                p: 3, 
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.default,
                textAlign: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">
                  This roadmap was generated based on current industry standards and best practices.
                  Review and adjust according to your specific needs.
                </Typography>
              </Box>
            </Card>
          </Box>
        )}
        
        {/* Information Section */}
        {!roadmap && !loading && (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Personalized Guidance
                  </Typography>
                  <Typography variant="body2">
                    Our AI analyzes current market trends and job requirements to 
                    create a customized roadmap for your career journey.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Structured Plan
                  </Typography>
                  <Typography variant="body2">
                    Receive a detailed, step-by-step preparation plan with resources, 
                    practice exercises, and time management recommendations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Industry-Relevant
                  </Typography>
                  <Typography variant="body2">
                    Our roadmaps reflect the latest industry requirements and 
                    best practices to boost your chances of interview success.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}