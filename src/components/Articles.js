// src/components/Articles.js
// src/components/Articles.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import DOMPurify from 'dompurify';
import { GET_ARTICLES } from '../graphql/queries';
import { DELETE_ARTICLE } from '../graphql/mutations';

function Articles() {
    const { data, loading, error, refetch } = useQuery(GET_ARTICLES);
    const [deleteArticle] = useMutation(DELETE_ARTICLE, {
        onCompleted: () => refetch(),
        onError: (error) => {
            console.error("Error during deletion:", error.message);
            alert(`Failed to delete the article: ${error.message}`);
        },
    });

    const handleDelete = (id) => {
        const articleId = parseInt(id, 10);
        if (isNaN(articleId)) {
            console.error(`Error: Invalid article ID - ${id}`);
            return;
        }
        if (window.confirm("Are you sure you want to delete this article?")) {
            deleteArticle({ variables: { id: articleId } });
        }
    };

    if (loading) return <Typography>Loading articles...</Typography>;
    if (error) return <Typography>Error loading articles: {error.message}</Typography>;

    return (
        <div>
            <Typography variant="h4">Articles</Typography>
            {data && data.articles.map((article) => (
                <Box key={article.id} mb={2}>
                    <Typography variant="h5">{article.title}</Typography>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(article.body),
                        }}
                    />
                    <Button
                        component={Link}
                        to={`/edit/${article.id}`}
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '10px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(article.id)}
                        variant="contained"
                        color="secondary"
                    >
                        Delete
                    </Button>
                </Box>
            ))}
        </div>
    );
}

export default Articles;
