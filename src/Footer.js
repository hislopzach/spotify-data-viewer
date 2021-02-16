import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  copyright: {
    // position: "fixed",
    // bottom: 0,
    color: "#838687",
    textAlign: "center",
  },
  // container: {
  //   marginBottom: "1em",
  //   paddingBottom: "1em",
  // },
}));

const Footer = () => {
  const styles = useStyles();

  return (
    <Grid container spacing={2} justify="center" className={styles.container}>
      <Grid item xs={12} md="auto">
        <Typography variant="subtitle2" className={styles.copyright}>
          Created by Zachary Hislop.
        </Typography>
      </Grid>
      <Grid item xs="auto">
        <Typography variant="subtitle2" className={styles.copyright}>
          Favorites Viewer for Spotify is not affiliated with Spotify. Spotify©
          is a trademark of Spotify AB.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
