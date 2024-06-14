import { useState } from 'react';
import { Drawer, Typography, Box, IconButton, ListItem, List, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../components/Car/CartContext'; // Ajusta la ruta según tu estructura

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
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
                  <ListItemText primary={product.name} secondary={`$${product.price}`} />
                  <IconButton edge="end" onClick={() => removeFromCart(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
