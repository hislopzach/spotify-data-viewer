import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  AppBar,
  Toolbar,
  Typography,
  Hidden,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";

import Tracks from "./Tracks";
import Artists from "./Artists";

import { getFavoriteArtists, getFavoriteTracks } from "./spotifyAPI";

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

const Favorites = () => {
  const styles = useStyles();
  const [category, setCategory] = useState("artists");
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState("short_term");
  const [numVisible, setNumVisible] = useState(50);

  const getTokenFromHash = (hash) => {
    return hash.split("&")[0].substr(14);
  };
  const getArtists = async (key, timeRange, limit) => {
    return await getFavoriteArtists(
      limit,
      timeRange,
      getTokenFromHash(window.location.hash)
    );
  };

  const getTracks = async (key, timeRange, limit) => {
    return await getFavoriteTracks(
      limit,
      timeRange,
      getTokenFromHash(window.location.hash)
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { data: artists } = useQuery({
    queryKey: ["artists", timeRange],
    variables: [numVisible],
    queryFn: getArtists,
  });
  const { data: tracks } = useQuery({
    queryKey: ["tracks", timeRange],
    variables: [numVisible],
    queryFn: getTracks,
  });
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        variant="elevation"
        title="Spotify Favorites Viewer"
        className={styles.appBar}
      >
        <Toolbar>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h3" align="center">
                Spotify Favorites Viewer
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
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
              <MenuItem value="short_term">Short Term</MenuItem>
              <MenuItem value="medium_term">Medium Term</MenuItem>
              <MenuItem value="long_term">Long Term</MenuItem>
            </Select>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" className={styles.grid}>
        {tabValue == 0 ? (
          tracks ? (
            <Tracks tracks={tracks} />
          ) : (
            <CircularProgress />
          )
        ) : artists ? (
          <Artists artists={artists} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
};
export default Favorites;
