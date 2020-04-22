import React, { useState } from "react";
import CoverArtCard from "./CoverArtCard";

const TrackCard = ({ track, rank }) => {
  const description = `${track.artists[0].name} - ${track.album.name}`;
  const image = track.album.images[1].url;

  return (
    <CoverArtCard
      name={track.name}
      description={description}
      rank={rank}
      image={image}
    />
  );
};

export default TrackCard;
