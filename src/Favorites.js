import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  MenuItem,
  Select,
  Button,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";

import Tracks from "./Tracks";
import Artists from "./Artists";

import { getFavoriteArtists, getFavoriteTracks } from "./spotifyAPI";
import { Link } from "react-router-dom";

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
  logo: {
    position: "fixed",
    left: 10,
    top: 10,
  },
}));

const Favorites = () => {
  const styles = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState("short_term");

  const getTokenFromHash = (hash) => {
    return hash.split("&")[0].substr(14);
  };
  const getArtists = async (key, timeRange) => {
    return await getFavoriteArtists(
      timeRange,
      getTokenFromHash(window.location.hash)
    );
  };

  const getTracks = async (key, timeRange) => {
    return await getFavoriteTracks(
      timeRange,
      getTokenFromHash(window.location.hash)
    );
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { data: artists } = useQuery({
    queryKey: ["artists", timeRange],
    queryFn: getArtists,
  });
  const { data: tracks } = useQuery({
    queryKey: ["tracks", timeRange],
    queryFn: getTracks,
  });
  return (
    <>
      <Link to="/" component={Button} className={styles.logo}>
        Home
      </Link>
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
        {tabValue === 0 ? (
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
