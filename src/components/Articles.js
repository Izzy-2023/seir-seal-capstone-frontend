// src/components/Articles.js
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Card, CardContent, CardActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import { GET_ARTICLES } from '../graphql/queries';
import { DELETE_ARTICLE } from '../graphql/mutations';

function Articles() {
    const { data, loading, error } = useQuery(GET_ARTICLES);
    const [deleteArticle] = useMutation(DELETE_ARTICLE);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterDay, setFilterDay] = useState('');

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

    const handleFilter = () => {
        return data.articles.filter(article => {
            const titleMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
            const yearMatch = filterYear === '' || new Date(article.publishedDate).getFullYear().toString() === filterYear.toString();
            const monthMatch = filterMonth === '' || (new Date(article.publishedDate).getMonth() + 1).toString() === filterMonth.toString();
            const dayMatch = filterDay === '' || new Date(article.publishedDate).getDate().toString() === filterDay.toString();
            return titleMatch && yearMatch && monthMatch && dayMatch;
        });
    };

    if (loading) return <Typography>Loading articles...</Typography>;
    if (error) return <Typography>Error loading articles: {error.message}</Typography>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                backgroundColor: '#f0f0f0',
                padding: '20px',
                marginTop: -12,
                marginLeft: -5,
                marginRight: -5,
                marginBottom: -5,
                minHeight: '100vh', // Ensure gray background extends to bottom of viewport
            }}
        >
            <Typography variant="h4" color="primary">
                Articles
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    maxWidth: 800,
                }}
            >
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ flex: 1 }}
                />
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Year</InputLabel>
                    <Select
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                        label="Year"
                    >
                        <MenuItem value="">All</MenuItem>
                        {data.articles.map(article => new Date(article.publishedDate).getFullYear()).filter((value, index, self) => self.indexOf(value) === index).map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Month</InputLabel>
                    <Select
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                        label="Month"
                    >
                        <MenuItem value="">All</MenuItem>
                        {data.articles.map(article => new Date(article.publishedDate).getMonth() + 1).filter((value, index, self) => self.indexOf(value) === index).map(month => (
                            <MenuItem key={month} value={month}>{month}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                    <InputLabel>Day</InputLabel>
                    <Select
                        value={filterDay}
                        onChange={(e) => setFilterDay(e.target.value)}
                        label="Day"
                    >
                        <MenuItem value="">All</MenuItem>
                        {data.articles.map(article => new Date(article.publishedDate).getDate()).filter((value, index, self) => self.indexOf(value) === index).map(day => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ width: '100%', maxWidth: 800 }}>
                {handleFilter().map((article) => (
                    <Card
                        key={article.id}
                        sx={{
                            width: '100%',
                            mb: 2,
                        }}
                        variant="outlined"
                    >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" color="primary">
                                {article.title}
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.body) }} />
                            <Typography color="textSecondary" mt={1}>
                                Published on: {article.publishedDate ? format(new Date(article.publishedDate), 'PPP, p') : 'Unknown'}
                            </Typography>
                            <Typography color="textSecondary" mb={1}>
                                Last updated: {article.updatedDate ? format(new Date(article.updatedDate), 'PPP, p') : 'Unknown'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button component={Link} to={`/edit/${article.id}`} variant="contained" color="primary">
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(article.id)} variant="contained" color="secondary">
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default Articles;

