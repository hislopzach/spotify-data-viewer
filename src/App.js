import React from "react";

import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { authUrl } from "./config";
import Favorites from "./Favorites";
import Welcome from "./Welcome";

import "./App.css";
import TableView from "./TableView";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Router>
          <Switch>
            <Route path="/favorites">
              <Favorites url={authUrl} />
            </Route>
            <Route path="/table">
              <TableView />
            </Route>
            <Route path="/">
              <Welcome url={authUrl} />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
