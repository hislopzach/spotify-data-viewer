import React from "react";
import { Grid } from "@material-ui/core";
import TrackCard from "./TrackCard";
import TrackListItem from "./TrackListItem";

const Tracks = ({ tracks }) => {
  return (
    <>
      {tracks.items.map((t, index) => {
        if (index < 10) {
          return (
            <Grid key={t.uri} item xs="auto">
              <TrackCard track={t} rank={index + 1} />
            </Grid>
          );
        } else {
          return (
            <Grid key={t.uri} item xs={11} md={10}>
              <TrackListItem track={t} rank={index + 1} />
            </Grid>
          );
        }
      })}
      )}
    </>
  );
};

export default Tracks;
