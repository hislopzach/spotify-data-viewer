import React from "react";
import { Grid } from "@material-ui/core";
import ArtistCard from "./ArtistCard";
import ArtistListItem from "./ArtistListItem";

const Artists = ({ artists }) => {
  return (
    <>
      {artists.items.map((a, index) => (
        <Grid key={a.uri} item xs="auto">
          <ArtistCard artist={a} rank={index + 1} />
        </Grid>
      ))}
    </>
  );
};

export default Artists;
