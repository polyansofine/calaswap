import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, AvatarGroup, Button, Grid, Typography } from "@mui/material";
import bnb from "assets/token_icons/bnb.svg";
import usdt from "assets/token_icons/usdt.svg";
import holder from "assets/token_icons/holder.svg";
import question from "assets/icons/question.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F8F8F8",
    color: "#6B7AB7",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  //   paddingBottom: 14,
  //   paddingTop: 14,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function PoolTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {/* <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <Button
                  variant="contained"
                  color="info"
                  sx={{ borderRadius: 16, px: 4, my: 3 }}
                >
                  HOT
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Grid container alignItems="center" columnSpacing={2}>
                  <AvatarGroup>
                    <Avatar src={usdt} />
                    <Avatar src={holder} />
                  </AvatarGroup>
                  <Typography>USDT-CLS</Typography>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Grid container alignItems="center">
                  <Typography sx={{ mr: 2 }}>63.19% </Typography>
                  <img src={question} alt="question" />
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography>46.3%</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography>Details</Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
