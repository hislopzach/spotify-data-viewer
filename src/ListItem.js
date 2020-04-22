import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "75px",
  },
}));

const ListItem = ({ name, description, rank }) => {
  const classes = useStyles();
  const content = `#${rank} - ${name}:  ${description}`;
  return (
    <Card className={classes.card}>
      <Grid container justify="evenly-space" spacing={2}>
        <Grid item>
          <Typography variant="h3">#{rank}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">{description}</Typography>
        </Grid>
      </Grid>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default ListItem;
