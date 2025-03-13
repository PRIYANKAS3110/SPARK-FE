import React from 'react';
import { 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  Avatar,
  alpha
} from '@mui/material';
import { useRouter } from 'next/router';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import FindReplaceRoundedIcon from '@mui/icons-material/FindReplaceRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

const drawerWidth = 280;

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Home', path: '/', icon: <HomeRoundedIcon /> },
    { name: 'Job Validation', path: '/validation', icon: <VerifiedUserRoundedIcon /> },
    { name: 'Alternatives', path: '/alternatives', icon: <FindReplaceRoundedIcon /> },
    { name: 'Insights', path: '/insights', icon: <InsightsRoundedIcon /> },
    { name: 'AI Assistant', path: '/chatbot', icon: <SmartToyRoundedIcon /> },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
          color: 'white',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ 
        p: 4, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        mb: 2
      }}>
        <Avatar
          sx={{
            bgcolor: 'primary.light',
            width: 48,
            height: 48,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
          }}
        >
          <SecurityRoundedIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 0.5 }}>
            JobDefender
          </Typography>
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.7), letterSpacing: 0.5 }}>
            AI Fraud Detection System
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2, mb: 3 }}>
        <Typography variant="overline" sx={{ color: alpha('#fff', 0.6), fontWeight: 500, letterSpacing: 1.2 }}>
          MAIN NAVIGATION
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1, px: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            selected={router.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              py: 1.2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&.Mui-selected': {
                backgroundColor: alpha('#fff', 0.1),
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  backgroundColor: '#22d3ee',
                  borderRadius: '0 4px 4px 0',
                }
              },
              '&.Mui-selected:hover': {
                backgroundColor: alpha('#fff', 0.15),
              },
              '&:hover': {
                backgroundColor: alpha('#fff', 0.07),
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: router.pathname === item.path ? '#22d3ee' : alpha('#fff', 0.7),
                minWidth: '40px'
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{
                fontWeight: router.pathname === item.path ? 600 : 400,
                color: router.pathname === item.path ? '#fff' : alpha('#fff', 0.8),
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ 
        p: 3, 
        borderTop: `1px solid ${alpha('#fff', 0.1)}`,
        backgroundColor: alpha('#000', 0.2),
      }}>
        <Box sx={{ 
          p: 2, 
          borderRadius: 2, 
          backgroundColor: alpha('#fff', 0.05),
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="subtitle2" sx={{ color: alpha('#fff', 0.9), mb: 1 }}>
            Jobseeker Protection
          </Typography>
          <Typography variant="caption" sx={{ color: alpha('#fff', 0.7) }}>
            Our AI-powered system has protected over 50,000 job seekers from fraudulent listings
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;