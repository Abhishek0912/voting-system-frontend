import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function WelcomePage() {
    const navigate = useNavigate();

    const handleAdmin= async () => {
        navigate("/admin/Dashboard");
    }
  
    const handleAudience = async () => {
        navigate("/votingPoll");
    }
  

    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Grid container spacing={2} columns={16}  alignItems="center">
         <Grid item xs={8}>
             <Item> 
                <Button
                variant="contained"
                color="primary"
                onClick={handleAdmin}
        >
        Admin
        </Button>
      </Item>
         </Grid>
         <Grid item xs={8}>
             <Item> 
                <Button
                variant="contained"
                color="secondary"
                onClick={handleAudience}
        >
        Audience
        </Button>
      </Item>
         </Grid>
        </Grid>
        </Container>
        </ThemeProvider>
    );
  }
  
  export default WelcomePage;
  