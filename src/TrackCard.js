import React from "react";
import CoverArtCard from "./CoverArtCard";

const TrackCard = ({ track, rank }) => {
  const name = `${track.name} - ${track.artists?.length[0]?.name}`;
  const image =
    track?.album?.images?.length > 1 ? track.album.images[1].url : null;

  return (
    <CoverArtCard
      name={name}
      rank={rank}
      uri={track.external_urls.spotify}
      image={image}
    />
  );
};

export default TrackCard;
