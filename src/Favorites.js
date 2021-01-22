import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  MenuItem,
  Select,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery } from "react-query";

import Tracks from "./Tracks";
import Artists from "./Artists";

import { getFavoriteArtists, getFavoriteTracks } from "./spotifyAPI";
import { authUrl } from "./config";
import ErrorMessage from "./ErrorMessage";
import { getTokenFromHash } from "./util";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "1em",
  },
  appBar: {
    maxWidth: "100%",
  },
  selectPaper: {
    height: 48,
    paddingLeft: 6,
  },
  select: {
    height: 48,
  },
}));

const Content = (aStatus, tStatus, tabValue, tracks, artists, url) => {
  if (aStatus === "error" || tStatus === "error") {
    return <ErrorMessage authUrl={authUrl} />;
  } else if (aStatus === "loading" || tStatus === "loading") {
    return <CircularProgress />;
  } else {
    if (tabValue === 0) {
      return <Tracks tracks={tracks} />;
    } else {
      return <Artists artists={artists} />;
    }
  }
};

const Favorites = () => {
  const styles = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState("short_term");
  const [token, setToken] = useState(getTokenFromHash(window.location.hash));

  useEffect(() => {
    setToken(window.location.hash);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { data: artists, status: aStatus } = useQuery(
    ["artists", timeRange],
    () => getFavoriteArtists(timeRange, token)
  );
  const { data: tracks, status: tStatus } = useQuery(
    ["tracks", timeRange],
    () => getFavoriteTracks(timeRange, token)
  );

  return (
    <>
      <Grid container justify="center" className={styles.grid} spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <Tabs value={tabValue} centered onChange={handleTabChange}>
              <Tab label="Tracks" />
              <Tab label="Artists" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs="auto">
          <Paper className={styles.selectPaper}>
            <Select
              className={styles.select}
              value={timeRange}
              labelId="timeRange"
              disableUnderline
              onChange={(event) => setTimeRange(event.target.value)}
            >
              <MenuItem value="short_term">Recent</MenuItem>
              <MenuItem value="medium_term">Past 6 Months</MenuItem>
              <MenuItem value="long_term">All Time</MenuItem>
            </Select>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" className={styles.grid}>
        {Content(aStatus, tStatus, tabValue, tracks, artists, authUrl)}
      </Grid>
    </>
  );
};
export default Favorites;
