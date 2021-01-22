import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";

const ErrorMessage = ({ authUrl }) => {
  return (
    <>
      <Grid container justify="center">
        <Grid item>
          <Typography color="secondary" variant="subtitle1" gutterBottom>
            Session Expired. Click below to refresh
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Button color="primary" href={authUrl}>
            Refresh
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ErrorMessage;
