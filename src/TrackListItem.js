import React from "react";
import ListItem from "./ListItem";

const TrackListItem = ({ track, rank }) => {
  const description = `${track.artists[0].name} - ${track.album.name}`;
  return <ListItem name={track.name} rank={rank} description={description} />;
};

export default TrackListItem;
