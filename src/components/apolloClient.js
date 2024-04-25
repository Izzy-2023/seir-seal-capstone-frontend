// src/components/apolloClient.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://cms-backend-toox.onrender.com/graphql/',
  cache: new InMemoryCache()
});
