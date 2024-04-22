// src/components/Articles.js

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import DOMPurify from 'dompurify';
import { format } from 'date-fns'; // Import the format function from date-fns
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
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2, 
            backgroundColor: '#ecf542', // Background color for the page
            padding: '20px' // Add padding for better spacing
        }}>
            <Typography variant="h4" mb={4} color="primary">Articles</Typography>
            {data && data.articles.map((article) => (
                <Card 
                    key={article.id} 
                    sx={{ 
                        width: '100%', 
                        maxWidth: 600, 
                        mb: 2,
                        backgroundColor: '#42f5c5', // Background color for the card
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // Add shadow for depth
                    }} 
                    variant="outlined"
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color="primary">
                            {article.title}
                        </Typography>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(article.body),
                            }}
                        />
                        <Typography color="textSecondary" mt={1}>
                            Published on: {article.publishedDate ? format(new Date(article.publishedDate), 'PPP, p') : 'Unknown'}
                        </Typography>
                        <Typography color="textSecondary" mb={1}>
                            Last updated: {article.updatedDate ? format(new Date(article.updatedDate), 'PPP, p') : 'Unknown'}
                        </Typography>
                    </CardContent>
                    <CardActions>
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
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}

export default Articles;
