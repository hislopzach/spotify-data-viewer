import React, { useState } from "react";
import CoverArtCard from "./CoverArtCard";

const ArtistCard = ({ artist, rank }) => {
  const description = artist.name;
  const image = artist.images[1].url;

  return (
    <CoverArtCard
      name={artist.name}
      description={description}
      rank={rank}
      image={image}
      hideExpand
    />
  );
};

export default ArtistCard;
