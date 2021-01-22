const redirectUrl =
  process.env.NODE_ENV === "production"
    ? "https://spotify-favorites-viewer.web.app/favorites"
    : "http://localhost:3000/favorites";

const param = "e161d1dc280f418fa572dc25328e38d3";
const scope = "user-top-read";
export const authUrl = `https://accounts.spotify.com/authorize?client_id=${param}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=token`;
