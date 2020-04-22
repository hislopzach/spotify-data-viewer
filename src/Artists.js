import React from "react";
import { Grid } from "@material-ui/core";
import ArtistCard from "./ArtistCard";
import ArtistListItem from "./ArtistListItem";

const Artists = ({ artists }) => {
  return (
    <>
      {artists.items.map((a, index) => {
        if (index < 10) {
          return (
            <Grid key={a.uri} item xs="auto">
              <ArtistCard artist={a} rank={index + 1} />
            </Grid>
          );
        } else {
          return (
            <Grid key={a.uri} item xs={11} md={10}>
              <ArtistListItem artist={a} rank={index + 1} />
            </Grid>
          );
        }
      })}
    </>
  );
};

export default Artists;
