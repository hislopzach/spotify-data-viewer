import React from "react";
import { Card, CardMedia, CardContent, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Tracks = ({ tracks, classes }) => {
  return (
    <>
      {tracks.items.map((t) => (
        <Grid key={t.uri} item xs="auto">
          <Card className={classes.card}>
            <CardMedia className={classes.media}>
              <img
                className={classes.media}
                src={t.album.images[1].url}
                alt={t.name}
              ></img>
            </CardMedia>
            <CardContent>
              <Typography variant="h5">{t.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default Tracks;
