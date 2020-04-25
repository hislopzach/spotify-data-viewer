import React from "react";
import CoverArtCard from "./CoverArtCard";

const TrackCard = ({ track, rank }) => {
  const name = `${track.name} - ${track.artists[0].name}`;
  const image = track.album.images[1].url;

  return <CoverArtCard name={name} rank={rank} image={image} />;
};

export default TrackCard;
