import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_ARTICLES = gql`
  {
    articles {
      id
      title
      body
      publishedDate
    }
  }
`;

const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $body: String!) {
    createArticle(title: $title, body: $body) {
      article {
        id
        title
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ARTICLES);
  const [createArticle] = useMutation(CREATE_ARTICLE);

  const handleCreateArticle = () => {
    const title = prompt("Enter article title:");
    const body = prompt("Enter article content:");
    if (title && body) {
      createArticle({ variables: { title, body } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Articles</h1>
      {data.articles.map(({ id, title, body }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ))}
      <button onClick={handleCreateArticle}>Add Article</button>
    </div>
  );
}

export default App;
