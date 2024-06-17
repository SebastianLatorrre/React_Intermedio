import { useState } from 'react';
import { Drawer, Typography, Box, IconButton, ListItem, List, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../components/Car/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <p>estas en el carrito</p>
    </>
  );
};

export default Cart;
