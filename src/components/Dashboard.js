// src/components/Dashboard.js

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
  Box, // Import Box component
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      {/* Add other items as needed */}
      <ListItem button component={Link} to="/">
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>
      <ListItem button component={Link} to="/add-post">
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText primary="Add Post" />
      </ListItem>
    </List>
  );

  const drawer = (
    <Drawer
      variant="permanent"
      sx={{
        display: { sm: 'block' },
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
      open
    >
      <Toolbar />
      {drawerContent}
    </Drawer>
  );

  const mobileDrawer = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        [`& .MuiDrawer-paper`]: { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Toolbar />
      {drawerContent}
    </Drawer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Izzy Blogs
          </Typography>
        </Toolbar>
      </AppBar>
      {isMobile ? mobileDrawer : drawer}
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          padding: theme.spacing(3),
          marginTop: theme.spacing(8), // Adjust the top margin
        }}
      >
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
};

export default Dashboard;
