import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export default function Loader() {
  return (
    <Box sx={{ display: "flex" }}>
      <Container maxWidth="xxl" sx={{ mt: 4, mb: 4, ml: 100 }}>
        <CircularProgress />
      </Container>
    </Box>
  );
}
