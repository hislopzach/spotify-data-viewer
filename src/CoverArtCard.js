import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 365,
    textAlign: "center",
    wordWrap: "break-word",
    margin: "auto",
    marginBottom: "0.5em",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    width: "100%",
    objectFit: "cover",
    height: 200,
  },
}));

const CoverArtCard = ({ name, image, rank, uri }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <a href={uri}>
        <CardActionArea>
          <CardMedia
            className={styles.media}
            href={uri}
            // onClick={() => window.open(uri, "_blank")}
          >
            <img className={styles.media} src={image} alt={name}></img>
          </CardMedia>
        </CardActionArea>
      </a>
      <CardContent className={styles.cardDetails} style={{ padding: "4px" }}>
        <Typography variant="subtitle1">{`${rank}. ${name}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default CoverArtCard;
