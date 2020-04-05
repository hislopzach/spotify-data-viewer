import axios from "axios";
const spotifyUrl = "https://api.spotify.com/v1";

export const getFavoriteArtists = async (limit, timeRange, token) => {
  return await axios
    .get(
      `${spotifyUrl}/me/top/artists?limit=${limit}&time_range=${timeRange}`,
      { headers: { Authorization: "Bearer " + token } }
    )
    .then((res) => res.data);
};

export const getFavoriteTracks = async (limit, timeRange, token) => {
  return await axios
    .get(`${spotifyUrl}/me/top/tracks?limit=${limit}&time_range=${timeRange}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data);
};
