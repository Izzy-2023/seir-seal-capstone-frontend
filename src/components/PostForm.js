// src/components/PostForm.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Box, TextField, Typography } from '@mui/material';
import { GET_ARTICLE, GET_ARTICLES } from '../graphql/queries';
import { UPDATE_ARTICLE, CREATE_ARTICLE } from '../graphql/mutations';
import Dropzone from 'react-dropzone'; // Import Dropzone

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parsedId = parseInt(id, 10);
  const isEditing = Boolean(id);
  const [files, setFiles] = useState([]); // State to store uploaded files

  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: { id: parsedId },
    skip: !isEditing,
  });

  const [saveArticle, { loading: saveLoading }] = useMutation(
    isEditing ? UPDATE_ARTICLE : CREATE_ARTICLE, {
      variables: { id: parsedId },
      refetchQueries: [{ query: GET_ARTICLES }],
      onCompleted: () => {
        navigate('/');
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
        // Combine form values with uploaded files
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('body', values.body);
        files.forEach(file => {
          formData.append('files', file);
        });

        saveArticle({ variables: { id: parsedId, ...values } })
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
          {/* Dropzone component */}
          <Dropzone onDrop={acceptedFiles => setFiles(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', marginBottom: '20px' }}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
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
