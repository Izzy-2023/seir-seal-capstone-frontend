// src/graphql/mutations.js

import { gql } from '@apollo/client';

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $body: String!) {
    createArticle(title: $title, body: $body) {
      article {
        id
        title
      }
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: Int!, $title: String!, $body: String!) {
    updateArticle(id: $id, title: $title, body: $body) {
      article {
        id
        title
        body
        publishedDate
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      success
    }
  }
`;

