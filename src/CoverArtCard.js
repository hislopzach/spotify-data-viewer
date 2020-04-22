import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Collapse,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  card: {
    width: 320,
    margin: "auto",
    marginBottom: "0.5em",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  cardDetails: {
    paddingBottom: 0,
  },
  media: {
    width: 320,
    height: 320,
  },
}));

const CoverArtCard = ({
  name,
  description,
  image,
  rank,
  hideExpand = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.media}>
        <img className={styles.media} src={image} alt={name}></img>
      </CardMedia>
      <CardContent className={styles.cardContent}>
        <Typography variant="h5">{`#${rank + 1} ${name}`}</Typography>
        {hideExpand ? null : (
          <>
            <IconButton
              className={expanded ? styles.expandOpen : styles.expand}
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Collapse in={expanded}>
              <Typography variant="subtitle1">{description}</Typography>
            </Collapse>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CoverArtCard;
