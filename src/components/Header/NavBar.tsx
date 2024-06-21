import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NavListDrawer from "./NavListDrawer";
import Logo from '../../assets/7941371-Photoroom.png';
import { useCart } from '../../components/Car/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
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
  const handleViewCar = () => {
    navigate(`/car`);
  }
  const handleViewLogin = () => {
    navigate(`/login`);
  }

  useEffect(() => setOpen(false), [location]);
  const { cart, removeFromCart } = useCart();
  // const [open, setOpen] = useState(false);
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
              <img src={Logo} alt="FakeStore" style={{ width: 70, marginRight: '16px', padding: 10 }} />
            </Link>
            <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
              Chili Store
            </Typography>
            <Search />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon  onClick={handleViewCar}/>
                </Badge>
              </IconButton> */}
              <IconButton color="inherit" onClick={() => setOpen(true)}>
                <ShoppingCartIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {cart.length} {/* Mostrar la cantidad de productos en el carrito */}
                </Typography>
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                  <Typography variant="h6">Carrito de Compras</Typography>
                  {cart.length === 0 ? (
                    <Typography variant="body1">Tu carrito está vacío.</Typography>
                  ) : (
                    <List>
                      {cart.map((product) => (
                        <ListItem key={product.id}>
                          <Box sx={{ width: '25%', height: 'auto', marginRight: 2 }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                          </Box>
                          <ListItemText primary={product.name} secondary={`$${product.price}`} />
                          <IconButton edge="end" onClick={() => removeFromCart(product.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                  <Button variant="outlined" color="success" onClick={handleViewCar}>
                    <ShoppingCartCheckoutIcon /> GO TO CAR
                  </Button>
                </Box>
              </Drawer>
              <IconButton color="inherit">
                <AccountCircle onClick={handleViewLogin}/>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* <Drawer sx={{ display: { xs: "block", md: "none" } }} open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks} />
      </Drawer> */}
    </>
  );
};

export default Navbar;
