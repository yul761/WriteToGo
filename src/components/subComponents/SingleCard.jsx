import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#E6E6E6",
    width: "80%",
    height: "15%",
    margin: "5% 2%",
    borderRadius: "24px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SingleCard() {
  // const classes = useStyles();
  console.log("Created");

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" component="p"></Typography>
        </CardContent>
      </Card>
      <div id="Card__controls">
        <Tooltip title="add" interactive>
          <Button>
            <NoteAddOutlinedIcon />
          </Button>
        </Tooltip>
        <Tooltip title="delete" interactive>
          <Button>
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
