// src/components/Dashboard.js

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenuToggle}
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CMS Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={menuOpen}
        onClose={handleMenuToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          display: { xs: 'block', sm: 'none' }
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItem>
          <ListItem button component={Link} to="/add-post">
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Add Post" />
          </ListItem>
          {/* ... other navigation items */}
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, display: { xs: 'none', sm: 'block' } }
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItem>
          <ListItem button component={Link} to="/add-post">
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Add Post" />
          </ListItem>
          {/* ... other navigation items */}
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default Dashboard;


