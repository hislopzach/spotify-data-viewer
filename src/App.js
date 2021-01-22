import React from "react";

import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";
import Favorites from "./Favorites";
import Welcome from "./Welcome";

import "./App.css";

const reactQueryConfig = {
  staleTime: 60 * 1000 * 10,
  refetchOnWindowFocus: false,
  cacheTime: 1000 * 60 * 20,
  retry: 1,
};

function App() {
  const redirectUrl = "https://spotify-favorites-viewer.web.app/favorites";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT}&redirect_uri=${redirectUrl}&scope=user-top-read&response_type=token`;
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryConfigProvider config={reactQueryConfig}>
        <Container maxWidth="lg">
          <Router>
            <Switch>
              <Route path="/favorites">
                <Favorites url={authUrl} />
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
