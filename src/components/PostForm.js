// src/components/PostForm.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Box, TextField, Typography } from '@mui/material';
import { GET_ARTICLE, GET_ARTICLES } from '../graphql/queries';  // Ensure correct import paths
import { UPDATE_ARTICLE, CREATE_ARTICLE } from '../graphql/mutations';  // Ensure correct import paths

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parsedId = parseInt(id, 10); // Ensure `id` is parsed as an integer
  const isEditing = Boolean(id);

  // Fetch the article if editing. Use `skip` to avoid running the query if not editing.
  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: { id: parsedId },
    skip: !isEditing,
  });

  const [saveArticle, { loading: saveLoading }] = useMutation(
    isEditing ? UPDATE_ARTICLE : CREATE_ARTICLE, {
      variables: { id: parsedId }, // Use parsedId here as well for consistency
      refetchQueries: [{ query: GET_ARTICLES }],
      onCompleted: () => {
        navigate('/');  // Redirect to articles list after successful update/create
      },
      onError: (error) => {
        alert(`An error occurred: ${error.message}`);
      }
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading the article: {error.message}</Typography>;

  const initialValues = isEditing && data ? {
    title: data.article.title,
    body: data.article.body
  } : {
    title: '',
    body: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        saveArticle({ variables: { id: parsedId, ...values } }) // Ensure parsedId is used
          .catch(err => {
            console.error('Error saving the article:', err);
            setSubmitting(false);
          });
      }}
    >
      {({ setFieldValue, values, isSubmitting }) => (
        <Form>
          <Box marginBottom={2}>
            <Field name="title" as={TextField} label="Title" fullWidth variant="outlined" />
          </Box>
          <Box marginBottom={2}>
            <ReactQuill 
              theme="snow" 
              value={values.body} 
              onChange={(content) => setFieldValue('body', content)} 
            />
          </Box>
          <Box textAlign="right">
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={isSubmitting || saveLoading}
            >
              {isEditing ? 'Update Article' : 'Create Article'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;