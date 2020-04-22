import React from "react";
import { Grid } from "@material-ui/core";
import ArtistCard from "./ArtistCard";

const Artists = ({ artists }) => {
  return (
    <>
      {artists.items.map((a, index) => (
        <Grid key={a.uri} item xs="auto">
          <ArtistCard artist={a} index={index} />
        </Grid>
      ))}
    </>
  );
};

export default Artists;
