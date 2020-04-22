import React from "react";
import ListItem from "./ListItem";

const ArtistListItem = ({ artist, rank }) => {
  const description = "";
  return <ListItem name={artist.name} rank={rank} description={description} />;
};

export default ArtistListItem;
