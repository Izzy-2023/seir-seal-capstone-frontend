// src/components/Dashboard.js

import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            CMS Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth } }}>
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
