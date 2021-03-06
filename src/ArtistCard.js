import React from "react";
import CoverArtCard from "./CoverArtCard";

const ArtistCard = ({ artist, rank }) => {
  const image = artist?.images?.length > 1 ? artist.images[1].url : null;

  return (
    <CoverArtCard
      name={artist.name}
      rank={rank}
      image={image}
      uri={artist?.external_urls?.spotify}
      hideExpand
    />
  );
};

export default ArtistCard;
