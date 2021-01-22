import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useQuery } from "react-query";
import { getFavoriteArtists, getFavoriteTracks } from "./spotifyAPI";
import { getTokenFromHash } from "./util";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const trackColumns = [
  {
    field: "rank",
    headerName: "Rank",
    width: 100,
  },

  {
    field: "name",
    headerName: "Song",
    width: 250,
  },
  {
    field: "artist",
    headerName: "Artist",
    width: 200,
  },
  {
    field: "duration_ms",
    headerName: "Duration",
    valueFormatter: ({ value }) => {
      const h = Math.floor(value / 1000 / 60 / 60);
      const m = Math.floor((value / 1000 / 60 / 60 - h) * 60);
      const s = Math.floor(((value / 1000 / 60 / 60 - h) * 60 - m) * 60);
      const seconds = s < 10 ? `0${s}` : `${s}`;
      return `${m}:${seconds}`;
    },
    width: 200,
  },
  {
    field: "release",
    headerName: "Release Date",
    flex: 0.5,
  },
];

const formatTrack = (track, ndx) => ({
  rank: ndx,
  artist: track.artists[0].name,
  release: track.album.release_date,
  ...track,
});

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "1em",
  },
  appBar: {
    maxWidth: "100%",
  },
  selectPaper: {
    height: 48,
    paddingLeft: 6,
  },
  select: {
    height: 48,
  },
}));
const TableView = ({ timeRange = "short_term" }) => {
  const styles = useStyles();
  const [token, setToken] = useState(getTokenFromHash(window.location.hash));
  const [formattedTracks, setFormattedTracks] = useState([]);
  const { data: artists, status: aStatus } = useQuery(
    ["artists", timeRange],
    () => getFavoriteArtists(timeRange, token)
  );
  const { data: tracks, status: tStatus } = useQuery(
    ["tracks", timeRange],
    () => getFavoriteTracks(timeRange, token)
  );
  useEffect(() => {
    setToken(window.location.hash);
  }, []);

  // useEffect(() => {
  //   setFormattedTracks(tracks?.items?.map(formatTrack));
  //   console.log(formattedTracks);
  //   console.log(tracks?.items?.map(formatTrack));
  // }, [tracks?.items]);

  return (
    // <Grid container spacing={2} justify="center" className={styles.grid}>
    //   <Grid item xs="auto">
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={tracks?.items?.map((track, ndx) => formatTrack(track, ndx)) || []}
        columns={trackColumns}
        pageSize={50}
        checkboxSelection
      />
    </div>
    //   </Grid>
    // </Grid>
  );
};

export default TableView;
