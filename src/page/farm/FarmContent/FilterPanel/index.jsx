import {
  Button,
  Grid,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import React from "react";

const SearchInput = styled(TextField)(({ theme }) => ({
  width: 270,
  //   height: 48,

  backgroundColor: "#ffffff",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "#000000",
      //   backgroundColor: "#ffffff",
      borderRadius: 16,
      borderColor: "#D0D6EE",
    },
    "&:hover fieldset": {
      borderColor: "#D0D6EE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D0D6EE",
    },
  },
}));
const FilterSelect = styled(Select)(({ theme }) => ({
  width: 140,
  //   height: 48,
  backgroundColor: "#ffffff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D0D6EE",
    borderRadius: 16,
    "&:hover": {
      borderColor: "#D0D6EE",
    },
    "&.Mui-focused": {
      borderColor: "#D0D6EE",
    },
  },
  //   "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       color: "#000000",
  //       //   backgroundColor: "#ffffff",
  //       borderColor: "#D0D6EE",
  //     },
}));

const FilterPanel = () => {
  return (
    <div style={{ marginBottom: 18 }}>
      {" "}
      <Grid
        container
        flexDirection="row-reverse"
        columnSpacing={2}
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" sx={{ height: 48 }}>
            select
          </Button>
        </Grid>
        <Grid item>
          <FilterSelect placeholder="All">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </FilterSelect>
        </Grid>
        <Grid item>
          <SearchInput placeholder="Search Farm" variant="outlined" />
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterPanel;
