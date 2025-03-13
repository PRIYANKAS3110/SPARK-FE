import React, { ReactNode } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, InputBase, Badge, useTheme, alpha } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
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
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ 
              position: 'relative',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.black, 0.04),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.black, 0.07),
              },
              width: { xs: '100%', sm: 'auto' },
              mr: 2
            }}>
              <Box sx={{ 
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search jobs, companies..."
                sx={{
                  color: 'inherit',
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create('width'),
                  width: { xs: '100%', sm: '18ch', md: '30ch' },
                  '&:focus': {
                    width: { sm: '24ch', md: '42ch' },
                  },
                }}
              />
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              
              <Avatar 
                sx={{ 
                  width: 38, 
                  height: 38,
                  cursor: 'pointer',
                  border: `2px solid ${theme.palette.primary.main}` 
                }}
              />
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