import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Layout from "../components/Layout";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function JobChatbotPage() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume file (PDF) before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: `Uploaded: ${file.name}` }]);
    setFile(null);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/chatbot/upload-resume`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        let parsedRoles = [];

        try {
          // ✅ Ensure JSON response is clean
          const cleanedJson = data.suggested_roles.replace(/```json\n|\n```/g, "");
          const parsedData = JSON.parse(cleanedJson);

          parsedRoles = Array.isArray(parsedData.suggested_roles) ? parsedData.suggested_roles : [];
        } catch (err) {
          console.error("Error parsing job roles:", err);
        }

        if (parsedRoles.length > 0) {
          setMessages((prev) => [
            ...prev,
            { sender: "bot", text: `Here are your recommended job roles:\n\n- ${parsedRoles.join("\n- ")}` },
          ]);
        } else {
          setMessages((prev) => [...prev, { sender: "bot", text: "No job recommendations found." }]);
        }
      } else {
        setError(data.error || "Failed to fetch job recommendations.");
      }
    } catch (err) {
      setLoading(false);
      setError("Error connecting to the backend.");
    }
  };

  return (
    <Layout>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          AI Career Chatbot
        </Typography>
        <Typography variant="body1" paragraph>
          Upload your resume and get AI-generated job recommendations!
        </Typography>
      </Paper>

      <Box sx={{ maxHeight: "50vh", overflowY: "auto", mb: 3 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}
            >
              {msg.sender === "bot" && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#673ab7" }}>
                    <SmartToyIcon />
                  </Avatar>
                </ListItemAvatar>
              )}
              <ListItemText
                primary={msg.text}
                sx={{
                  backgroundColor: msg.sender === "user" ? "#e3f2fd" : "#f3e5f5",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "80%",
                  whiteSpace: "pre-line",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box display="flex" alignItems="center" gap={2} sx={{ flexDirection: "column" }}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="resume-upload"
        />
        <label htmlFor="resume-upload">
          <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
            {file ? file.name : "Choose Resume (PDF)"}
          </Button>
        </label>

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading || !file}
          startIcon={loading ? <CircularProgress size={20} /> : <InsertDriveFileIcon />}
        >
          {loading ? "Uploading..." : "Upload & Get Jobs"}
        </Button>

        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Layout>
  );
}
