import React from "react";

import { Container } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";
import Favorites from "./Favorites";
import Welcome from "./Welcome";

import "./App.css";

const reactQueryConfig = {
  staleTime: 60 * 1000 * 10,
  refetchOnWindowFocus: false,
  cacheTime: 1000 * 60 * 20,
};

const useStyles = makeStyles((theme) => ({
  app: {
    background: "#222326",
  },
}));

function App() {
  const clientId = "e161d1dc280f418fa572dc25328e38d3";
  const redirectUrl = "https://spotify-favorites-viewer.web.app/favorites";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user-top-read&response_type=token`;
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const styles = useStyles(theme);
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryConfigProvider config={reactQueryConfig}>
        <Container maxWidth="lg">
          <Router>
            <Switch>
              <Route path="/favorites">
                <Favorites />
              </Route>
              <Route path="/">
                <Welcome url={authUrl} />
              </Route>
            </Switch>
          </Router>
        </Container>
      </ReactQueryConfigProvider>
    </ThemeProvider>
  );
}

export default App;
