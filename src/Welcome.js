import React from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Welcome = ({ url }) => (
  <header className="App-header">
    <Typography variant="h2" component="h2" gutterBottom>
      Spotify Favorites Viewer
    </Typography>
    <Button variant="contained" color="primary" href={url}>
      Authenticate with Spotify
    </Button>
  </header>
);

export default Welcome;
