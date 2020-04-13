import React from "react";
import { Grid } from "@material-ui/core";
import TrackCard from "./TrackCard";

const Tracks = ({ tracks }) => {
  return (
    <>
      {tracks.items.map((t, index) => (
        <Grid key={t.uri} item xs="auto">
          <TrackCard track={t} index={index} />
        </Grid>
      ))}
    </>
  );
};

export default Tracks;
