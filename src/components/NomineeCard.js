import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function preventDefault(event) {
  event.preventDefault();
}

export default function NomineeCard(props) {
  return (
    <React.Fragment>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        sx={{ flex: 0.5 }}
        gutterBottom
      >
        {props.name}
      </Typography>
      <Typography component="p" variant="h4">
        {props.votes}
      </Typography>
      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
