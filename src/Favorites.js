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
import Typography from "@material-ui/core/Typography";

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

const Content = (aStatus, tStatus, tabValue, tracks, artists, url) => {
  if (aStatus === "error" || tStatus === "error") {
    return (
      <>
        <Grid container justify="center">
          <Grid item>
            <Typography color="secondary" variant="subtitle1" gutterBottom>
              Session Expired. Click below to refresh
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Button color="primary" href={url}>
              Refresh
            </Button>
          </Grid>
        </Grid>
      </>
    );
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

const Favorites = ({ url }) => {
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

  const { data: artists, status: aStatus } = useQuery({
    queryKey: ["artists", timeRange],
    queryFn: getArtists,
  });
  const { data: tracks, status: tStatus } = useQuery({
    queryKey: ["tracks", timeRange],
    queryFn: getTracks,
  });
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
        {Content(aStatus, tStatus, tabValue, tracks, artists, url)}
      </Grid>
    </>
  );
};
export default Favorites;
