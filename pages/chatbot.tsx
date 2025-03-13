import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Layout from '../components/Layout';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function JobChatbotPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!jobTitle.trim()) return;

    // Add user message
    const newUserMessage: ChatMessage = { sender: 'user', text: jobTitle };
    setMessages((prev) => [...prev, newUserMessage]);
    setJobTitle('');
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/chatbot/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_title: jobTitle }),
      });

      const data = await res.json();
      if (res.ok) {
        const newBotMessage: ChatMessage = { sender: 'bot', text: data.response };
        setMessages((prev) => [...prev, newBotMessage]);
      } else {
        const errorMessage: ChatMessage = { sender: 'bot', text: data.error || 'Failed to generate response.' };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Error connecting to the backend.' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          AI Career Chatbot
        </Typography>
        <Typography variant="body1" paragraph>
          Ask about a job role and get AI-generated career insights!
        </Typography>
      </Paper>

      <Box sx={{ maxHeight: '50vh', overflowY: 'auto', mb: 3 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.sender === 'bot' && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#673ab7' }}>
                    <SmartToyIcon />
                  </Avatar>
                </ListItemAvatar>
              )}
              <ListItemText
                primary={msg.text}
                sx={{
                  backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f3e5f5',
                  p: 1.5,
                  borderRadius: '10px',
                  maxWidth: '80%',
                  whiteSpace: 'pre-line',
                }}
              />
              {msg.sender === 'user' && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#1976d2' }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          fullWidth
          label="Ask about a job role..."
          variant="outlined"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          disabled={loading}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={loading || !jobTitle.trim()}>
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </Button>
      </Box>
    </Layout>
  );
}
