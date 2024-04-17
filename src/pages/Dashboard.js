import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import NomineeCard from "../components/NomineeCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicPie from "../components/PieChart";
import BasicBars from "../components/BarChart";
import { io } from "socket.io-client";
import Loader from "../components/Loader";
import BasicHorizontalBars from "../components/HorizontalBarChart";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const defaultTheme = createTheme();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [open, setOpen] = React.useState(true);
  const [voteCounts, setVoteCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
  useEffect(() => {
    console.log(voteCounts);
    if (Object.keys(voteCounts).length > 0) {
      voteCounts.data.sort(compare);
      setIsLoading(false);
    }
  }, [voteCounts]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("initialData", (initialVoteCounts) => {
      setVoteCounts(initialVoteCounts);
      setIsLoading(false);
    });

    socket.on("updateData", (updatedVoteCounts) => {
      setVoteCounts(updatedVoteCounts);
    });

    return () => socket.close()

  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout= async () => {
    localStorage.clear();
    navigate('/')
  }   
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          <Button color="inherit" onClick={handleLogout}>LogOut</Button>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Live Count" />
            <Tab label="Analytics" />
          </Tabs>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CustomTabPanel value={value} index={0}>
                <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={12}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 240,
                        }}
                      >
                        <NomineeCard
                          name="Total Counts"
                          votes={voteCounts?.totalCounts}
                        />
                      </Paper>
                    </Grid>
                    {voteCounts.data.sort(compare).map((item, i) => (
                      <Grid item xs={12} md={4} lg={2.4} key={i}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                          }}
                        >
                          <NomineeCard name={item.name} votes={item.votes} />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                  {/* <Copyright sx={{ pt: 4 }} /> */}
                </Container>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={12}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 300,
                        }}
                      >
                        <BasicHorizontalBars data={voteCounts.data} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 300,
                        }}
                      >
                         <BasicPie data={voteCounts.data} /> 
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 300,
                        }}
                      >
                        <BasicBars data={voteCounts.data} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </CustomTabPanel>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
