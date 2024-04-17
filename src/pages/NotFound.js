import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {  createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const defaultTheme = createTheme();

const NotFound = () => ( 
  <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >  
      <Typography component="h1" variant="h5">
            404 - Not Found!
          </Typography>
        <Link to="/">Go Home</Link> 

        </Box>
        </Container>
  </ThemeProvider>
);

export default NotFound;