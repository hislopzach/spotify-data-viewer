import React from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    textAlign: "center",
  },
  button: { marginTop: "2em" },
  copyright: {
    position: "fixed",
    bottom: 0,
    color: "#838687",
  },
  main: {
    backgroundColor: "#222326",
    textAlign: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
}));

const Welcome = ({ url }) => {
  const styles = useStyles();
  return (
    <div className={styles.main}>
      <Typography variant="h2" gutterBottom className={styles.title}>
        Favorites Viewer for Spotify
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        View your favorite songs and artists. None of your Spotify data is
        stored, ever.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        If Neil Diamond is your #1 artist of all time, that's between you and
        Spotify.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href={url}
        className={styles.button}
      >
        Login with Spotify
      </Button>
      <Typography variant="subtitle2" className={styles.copyright}>
        Created by Zachary Hislop. Favorites Viewer for Spotify is not
        affiliated with Spotify. Spotify© is a trademark of Spotify AB.
      </Typography>
    </div>
  );
};

export default Welcome;
