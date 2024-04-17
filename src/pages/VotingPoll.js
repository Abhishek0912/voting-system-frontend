import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import fetchVotedStatus from "../api/fetchVotedStatus";
import fetchAllNominee from "../api/fetchAllNominee";
import postVote from "../api/postVote";
import Loader from "../components/Loader";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {

      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const defaultTheme = createTheme();


function VotingPoll() {
  const [nominees, setNominees] = useState([]);
  const [selectedNominee, setSelectedNominee] = useState('');
  const [voted, setVoted] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [helperText, setHelperText] = React.useState('');
  const [alreadyVoted, setAlreadyVoted] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    (async()=>{
      const votedStatus=await fetchVotedStatus();
      if(votedStatus){
        setAlreadyVoted(true)
      }
      else{
        const nominees=await fetchAllNominee();
        setNominees(nominees)
      }
      setIsLoading(false);
    })();
  }, []);

  

  const handleVote = async () => {
    const vote=await postVote(selectedNominee);
    setVoted(true)
    if(vote.success){
       setHelperText(vote.message);
    }
    else{
       setHelperText(vote.message);
    }
  };

  const handleNomineeChange = (event) => {
    setSelectedNominee(event.target.value);
  };

  if(alreadyVoted){
    navigate('/successVote');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
         
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Voting Poll
            </Typography>
           
          </Toolbar>
        </AppBar>
        {isLoading ? (
            <Loader />
          ) : (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Typography component="h1" variant="h5">
            Vote For a Nominee
          </Typography>
          
     <FormControl component="fieldset" >
        <RadioGroup
          aria-label="nominees"
          name="nominees"
          value={selectedNominee}
          onChange={handleNomineeChange}
        >
          {nominees.map((nominee, index) => (
            <Box key={index} display="flex" alignItems="center">
              <Radio
                //checked={selectedNominee === nominee.id}
                onChange={handleNomineeChange}
                value={nominee.id}
              />
              <Typography>{nominee.name}</Typography>
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleVote}
        disabled={!selectedNominee || voted}
      >
        Vote
      </Button>
      <Box
          sx={{
            marginTop: 5
          }}
        >
     { voted?<Alert severity="success">{helperText}</Alert>:<></>}
          </Box>
        </Box>
      </Container>)}

      </Box>
    </ThemeProvider>
  );
};

export default VotingPoll;