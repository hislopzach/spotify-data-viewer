import React, { useState } from "react";
import { Grid, CircularProgress, Switch } from "@material-ui/core";
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
  switch: {
    margin: "auto auto",
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const [showTracks, setShowTracks] = useState(true);

  const getTokenFromHash = (hash) => {
    return hash.split("&")[0].substr(14);
  };
  const getArtists = async (key, limit = 50, timeRange = "long_term") => {
    return await getFavoriteArtists(
      limit,
      timeRange,
      getTokenFromHash(window.location.hash)
    );
  };

  const getTracks = async (key, limit = 50, timeRange = "long_term") => {
    return await getFavoriteTracks(
      limit,
      timeRange,
      getTokenFromHash(window.location.hash)
    );
  };

  const handleContentSwitch = (event) => {
    setShowTracks((prev) => !prev);
  };

  const { data: artists } = useQuery({
    queryKey: "artists",
    queryFn: getArtists,
  });
  const { data: tracks } = useQuery({
    queryKey: "tracks",
    queryFn: getTracks,
  });
  return (
    <header className="App-header">
      <Grid container spacing={2} className={classes.grid}>
        <Grid
          item
          container
          spacing={1}
          justify="center"
          className={classes.switch}
        >
          <Grid item>Artists</Grid>
          <Grid item>
            <Switch checked={showTracks} onChange={handleContentSwitch} />
          </Grid>
          <Grid item>Tracks</Grid>
        </Grid>
        {showTracks ? (
          tracks ? (
            <Tracks tracks={tracks} classes={classes} />
          ) : (
            <CircularProgress />
          )
        ) : artists ? (
          <Artists artists={artists} classes={classes} />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </header>
  );
};
export default Favorites;
