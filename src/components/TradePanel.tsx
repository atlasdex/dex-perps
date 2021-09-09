import React from "react";
import FloatinCard from "./FloatingCard";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { PastTrade } from "../utils/types";
import { Typography, Grid } from "@material-ui/core";
import { useMarket, useMarketTrades } from "../utils/market";
import { roundToDecimal } from "../utils/utils";
import LaunchIcon from "../assets/Link/explorer.svg";
import { ExplorerLink } from "./Link";

const useStyles = makeStyles({
  tableCell: {
    textTransform: "capitalize",
    fontSize: 12,
    color: "white",
    paddingTop: 0,
    paddingBottom: 0,
    fontWeight: 400,
  },
  tableCellHead: {
    textTransform: "capitalize",
    fontSize: 14,
    color: "white",
    fontWeight: 800,
  },
  sellCell: {
    textTransform: "capitalize",
    fontSize: 12,
    paddingTop: 0,
    paddingBottom: 0,
    color: "#EB5252",
  },
  buyCell: {
    textTransform: "capitalize",
    fontSize: 12,
    paddingTop: 0,
    paddingBottom: 0,
    color: "#4EDC76",
  },
  title: {
    fontSize: 18,
    color: "white",
    padding: 10,
    margin: "unset",
    fontWeight: 700,
    marginLeft: 15,
  },
  container: {
    maxHeight: 350,
    height: 250,
    width: "100%",
  },
  headContainer: {
    border: "1px solid #2d2d3d",
  },
});

const TradeTableHead = () => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableCellHead}>Size</TableCell>
        <TableCell className={classes.tableCellHead}>Price</TableCell>
        <TableCell className={classes.tableCellHead}>Time</TableCell>
      </TableRow>
    </TableHead>
  );
};

const TradeTableRow = (props: PastTrade) => {
  const classes = useStyles();
  const { side, orderSize, time, markPrice, signature } = props;
  const buySide = side === "buy";
  const date = new Date(time * 1000);
  return (
    <TableRow>
      <TableCell className={buySide ? classes.buyCell : classes.sellCell}>
        {roundToDecimal(orderSize, 10)}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {roundToDecimal(markPrice, 3)}
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item>
            {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
          </Grid>
          <Grid item>
            <ExplorerLink tx={signature}>
              <img src={LaunchIcon} alt="" />
            </ExplorerLink>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

const TradePanel = () => {
  const classes = useStyles();
  const { marketAddress } = useMarket();
  const [trades] = useMarketTrades(marketAddress);

  return (
    <FloatinCard>
      <TableContainer className={classes.container}>
        <div className={classes.headContainer}>
          <Typography className={classes.title} align="left" variant="body1">
            Market Trades
          </Typography>
        </div>

        <Table>
          <TradeTableHead />
          <TableBody style={{ maxHeight: 100, overflow: "scroll" }}>
            {trades?.map((row, i) => {
              return <TradeTableRow {...row} key={`market-trade-${i}`} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </FloatinCard>
  );
};

export default TradePanel;
