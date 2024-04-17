import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {  createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import fetchVotedStatus from "../api/fetchVotedStatus";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();



function SuccessVotePage() {
    const navigate = useNavigate();

    useEffect(() => {
        (async()=>{
          const votedStatus=await fetchVotedStatus();
          if(!votedStatus){
            navigate('/votingPoll');
          }
        })();
    }, []);
    
    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
             <Alert severity="success">
               You have already Voted.
            </Alert>
        </Container>
        </ThemeProvider>
    );
    }
  
  
  export default SuccessVotePage;
  