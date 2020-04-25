import React from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Welcome = ({ url }) => (
  <header className="App-header">
    <Typography variant="h2" component="h2" gutterBottom>
      Spotify Favorites Viewer
    </Typography>
    <Typography variant="subtitle1" component="h2" gutterBottom>
      View your favorite songs and artists
    </Typography>
    <Button variant="contained" color="primary" href={url}>
      login with Spotify
    </Button>
  </header>
);

export default Welcome;
