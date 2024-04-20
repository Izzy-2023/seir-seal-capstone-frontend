// src/graphql/queries.js

import { gql } from '@apollo/client';

export const GET_ARTICLES = gql`
{
  articles {
    id
    title
    body
    publishedDate
  }
}
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: Int!) {
    article(id: $id) {
      id
      title
      body
      publishedDate
    }
  }
`;