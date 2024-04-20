// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PostForm from './components/PostForm';
import Articles from './components/Articles';
import { ApolloProvider } from '@apollo/client';
import { client } from './components/apolloClient'; // Assuming you export the Apollo client instance from a separate file

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Dashboard>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/edit/:id" element={<PostForm />} />
            <Route path="/add-post" element={<PostForm />} />
            {/* ... other routes */}
          </Routes>
        </Dashboard>
      </Router>
    </ApolloProvider>
  );
}

export default App;
