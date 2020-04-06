import React from "react";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Favorites from "./Favorites";

function App() {
  const clientId = "e161d1dc280f418fa572dc25328e38d3";
  const redirectUrl = "https://zachspotify.herokuapp.com/favorites";
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/">
            <header className="App-header">
              <Typography variant="h2" component="h2" gutterBottom>
                Spotify Favorites Viewer
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user-top-read&response_type=token`}
              >
                Authenticate with Spotify
              </Button>
            </header>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
