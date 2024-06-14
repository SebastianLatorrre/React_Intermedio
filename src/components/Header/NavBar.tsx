import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography, Badge } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NavListDrawer from "./NavListDrawer"; 
import Logo from '../../assets/7941371-Photoroom.png'; 

export type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

export type NavbarProps = {
  navLinks: MenuItem[];
};

const Navbar = ({ navLinks }: NavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  //const [activePage, setActivePage] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  const handleViewCar= ()=>{
    navigate(`/car`);
  }

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#131921" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton color="inherit" size="large" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img src={Logo} alt="FakeStore" style={{ width: 70, marginRight: '16px', padding:10}} />
            </Link>
            <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
              Chili Store
            </Typography>
            <Search />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon  onClick={handleViewCar}/>
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer sx={{ display: { xs: "block", md: "none" } }} open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
};

export default Navbar;
