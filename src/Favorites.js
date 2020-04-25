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
  card: {
    width: 320,
    margin: "auto",
    marginBottom: "0.5em",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    width: 320,
    height: 320,
  },
  appBar: {
    maxWidth: "100%",
  },
}));

const Favorites = () => {
  const styles = useStyles();
  const [category, setCategory] = useState("artists");
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
        className={styles.appBar}
      >
        <Toolbar className={styles.toolbar}>
          <Grid container justify="center" spacing={5}>
            <Grid item lg={9}>
              <Hidden mdDown>
                <Typography variant="h3" align="center">
                  Favorite {category === "artists" ? "Artists" : "Songs"}
                </Typography>
              </Hidden>
            </Grid>
            <Grid item xs="auto">
              <FormControl>
                <InputLabel id="category" htmlFor="category-picker">
                  Category
                </InputLabel>
                <Select
                  labelId="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <MenuItem value="artists">Artists</MenuItem>
                  <MenuItem value="tracks">Songs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs="auto">
              <FormControl>
                <InputLabel id="timeRange">Time Range</InputLabel>
                <Select
                  value={timeRange}
                  labelId="timeRange"
                  onChange={(event) => setTimeRange(event.target.value)}
                >
                  <MenuItem value="short_term">Short Term</MenuItem>
                  <MenuItem value="medium_term">Medium Term</MenuItem>
                  <MenuItem value="long_term">Long Term</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container spacing={2} justify="center" className={styles.grid}>
        {category === "tracks" ? (
          tracks ? (
            <Tracks tracks={tracks} classes={styles} />
          ) : (
            <CircularProgress />
          )
        ) : artists ? (
          <Artists artists={artists} classes={styles} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
};
export default Favorites;
