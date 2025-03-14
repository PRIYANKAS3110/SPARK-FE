import React, { ReactNode } from 'react';
import { Box, AppBar, Toolbar, Typography, useTheme, alpha } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FlareIcon from '@mui/icons-material/Flare'; 
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const drawerWidth = 280;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />
     
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          overflow: 'auto',
        }}
      >
        {/* App Bar */}
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar sx={{ justifyContent: 'center' }}>
            {/* Mobile menu button - positioned at the start */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ 
                mr: 2, 
                display: { sm: 'none' },
                position: 'absolute',
                left: theme.spacing(2)
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* SPARK Logo and Name - centered */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FlareIcon 
                sx={{ 
                  color: theme.palette.primary.main, 
                  fontSize: 28, 
                  mr: 1 
                }} 
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700, 
                  letterSpacing: 1,
                  color: theme.palette.primary.main 
                }}
              >
                SPARK - Smart Prediction & Analysis for Recruitment Knowledge
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
       
        {/* Toolbar spacer */}
        <Toolbar />
       
        {/* Page content */}
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;