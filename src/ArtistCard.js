import React from "react";
import CoverArtCard from "./CoverArtCard";

const ArtistCard = ({ artist, rank }) => {
  const image = artist.images[1].url;

  return (
    <CoverArtCard name={artist.name} rank={rank} image={image} hideExpand />
  );
};

export default ArtistCard;
