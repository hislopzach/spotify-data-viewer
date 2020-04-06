import React from "react";
import { Card, CardMedia, CardContent, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const Artists = ({ artists, classes }) => {
  return (
    <>
      {artists.items.map((a) => (
        <Grid key={a.uri} item lg={3} sm={6} xs={12}>
          <Card className={classes.card}>
            <CardMedia className={classes.media}>
              <img
                className={classes.media}
                src={a.images[1].url}
                alt={a.name}
              />
            </CardMedia>
            <CardContent>
              <Typography variant="h5">{a.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default Artists;
