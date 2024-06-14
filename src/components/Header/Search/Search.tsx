import SearchIcon from "@mui/icons-material/Search";
import { Drawer, IconButton, InputBase, alpha, styled } from "@mui/material";
import { useState } from "react";

const SearchContainer = styled("div")(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FF9900", 
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`, 
  color: theme.palette.common.white,
}));

const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton sx={{ display: { xs: "flex", md: "none" } }} onClick={() => setOpen(true)} color="inherit">
        <SearchIcon />
      </IconButton>
      <SearchContainer sx={{ display: { xs: "none", md: "flex" } }}>
        <StyledInputBase placeholder="Search FakeStore" inputProps={{ "aria-label": "search" }} />
        
      </SearchContainer>
      <Drawer
        open={open}
        anchor="top"
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { backgroundColor: "inherit", boxShadow: "none" } }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <SearchContainer sx={{ display: { xs: "contents", md: "none" } }}>
          <StyledInputBase placeholder="Search FakeStore" inputProps={{ "aria-label": "search" }} />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </SearchContainer>
      </Drawer>
    </>
  );
};

export default Search;

