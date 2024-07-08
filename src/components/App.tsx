import { Container } from "@mui/material";
import Home from "../pages/Home";
import Navbar, { MenuItem } from "./Header/NavBar";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ProductDetail from "./Product/ProductDetail";
import { theme } from "../style/theme";
import Car from "../pages/Car";
import { CartProvider } from "./Car/CartContext";
import Login from "./Login/Login";
import ProductsPage from "../pages/ProductsPage";


const navLinks: MenuItem[] = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Profile", path: "/profile", icon: <PersonIcon /> },
  { title: "ProductDetail", path: "/productDetail", icon: <ProductDetail /> },
];

const App = () => {
  return (
    <>
    <CartProvider>
      <Navbar navLinks={navLinks} />
      <Container maxWidth={"xl"}sx={{backgroundColor:theme.palette.background.paper}} >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/car" element={<Car/>} />
          <Route path="/productDetail/:id" element={<ProductDetail/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ProductsPage" element={<ProductsPage />} />
        </Routes>
      </Container>
      </CartProvider>
    </>
  );
};

export default App;
