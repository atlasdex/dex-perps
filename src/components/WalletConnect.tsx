import React from "react";
import { useWallet } from "../utils/wallet";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  buttonContainer: {
    // background: "linear-gradient(135deg, #60C0CB 18.23%, #6868FC 100%)",
    borderRadius: 4,
    width: 150,
  },
  button: {
    // background: "#1D1C28",
    background : '#5973fe',
    margin: 1,
    color : 'white',
    borderRadius: 4,
    width: 148,
    "&:hover": {
      background:
      "rgb(23, 23, 34)",
    },
  },
  coloredText: {
    textTransform: "capitalize",
    fontWeight: 400,
    // backgroundImage: "linear-gradient(135deg, #60C0CB 18.23%, #6868FC 100%)",
    backgroundClip: "text",
    color : 'white',
    // color: "#60C0CB",
    // "-webkit-background-clip": "text",
    // "-moz-background-clip": "text",
    // "-webkit-text-fill-color": "transparent",
    // "-moz-text-fill-color": "transparent",
  },
});

export default function WalletConnect({ width }: { width?: number }) {
  const classes = useStyles();
  const { connected, disconnect, select } = useWallet();

  return (
    <>
      <div
        className={classes.buttonContainer}
        style={{ width: width ? width : undefined }}
      >
        <Button
          disableRipple
          onClick={connected ? disconnect : select}
          className={classes.button}
          style={{ width: width ? width - 2 : undefined }}
        >
          {!connected ? (
            <Typography className={classes.coloredText}>
              Connect wallet
            </Typography>
          ) : (
            <Typography className={classes.coloredText}>Disconnect </Typography>
          )}
        </Button>
      </div>
    </>
  );
}
