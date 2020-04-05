import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-query";

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

  // useEffect(() => {
  //   setToken(getTokenFromHash(window.location.hash));
  // }, []);

  const { data: artists, isLoading: artistsIsLoading } = useQuery({
    queryKey: "artists",
    queryFn: getArtists,
  });
  const { data: tracks, isLoading: tracksIsLoading } = useQuery({
    queryKey: "tracks",
    queryFn: getTracks,
  });
  return (
    <header className="App-header">
      <Grid container spacing={2} className={classes.grid}>
        {tracksIsLoading ? (
          <p>loading...</p>
        ) : tracks ? (
          tracks.items.map((a) => (
            <Grid key={a.uri} item lg={3} sm={6} xs={12}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={classes.media}>
                    <img
                      className={classes.media}
                      src={a.album.images[1].url}
                      alt={a.name}
                    ></img>
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5">{a.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : null}
        {/* {artistsIsLoading ? (
          <p>loading...</p>
        ) : artists ? (
          artists.items.map((a) => (
            <Grid key={a.uri} item lg={3} sm={6} xs={12}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={classes.media}>
                    <img
                      className={classes.media}
                      src={a.images[1].url}
                      alt={a.name}
                    ></img>
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5">{a.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : null} */}
      </Grid>
    </header>
  );
};
export default Favorites;
