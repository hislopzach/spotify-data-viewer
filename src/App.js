import React from "react";

import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";
import { authUrl } from "./config";
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
