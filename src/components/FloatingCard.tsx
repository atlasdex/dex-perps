import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

//import theme context here
import { ThemeContext } from "./../App";

const useStyles = makeStyles((theme: Theme) => ({
  rootBlue: {
    background: "#1D1C28",
    padding: 0,
    border: "1px solid #2d2d3d",
    borderRadius: "4px 4px 0px 0px",
    height: "100%",
  },
  rootPurple: {
    background: "black",
    padding: 0,
    border: "1px solid #2d2d3d",
    borderRadius: "4px 4px 0px 0px",
    height: "100%",
  },
}));

const FloatingCard = ({
  children,
  padding,
}: {
  children: React.ReactNode;
  padding?: string;
}) => {
  const classes = useStyles();
  //get theme , nextTheme and toggle theme from context
  const { theme} = React.useContext(ThemeContext);

  return (
    <Box height="100%">
      <div
        className={theme? classes.rootBlue : classes.rootPurple }
        style={{ padding: padding ? padding : "undefined" }}
      >
        {children}
      </div>
    </Box>
  );
};

export default FloatingCard;
