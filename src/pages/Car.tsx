import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../components/Car/CartContext'; 


const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleIncreaseQuantity = (productId: number) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      addToCart({ ...product, quantity: + 1 });
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      addToCart({ ...product, quantity: - 1 });
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal * 0.05;
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Grid container alignItems="center">
                        <Grid item>
                          <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '16px' }} />
                        </Grid>
                        <Grid item>
                          <Typography>{item.name}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Grid container alignItems="center">
                        <IconButton onClick={() => handleDecreaseQuantity(item.id)}>
                          <Remove />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
                          <Add />
                        </IconButton>
                      </Grid>
                    </TableCell>
                    <TableCell>${item.price.toFixed(3)}</TableCell>
                    <TableCell>${(item.price * item.quantity).toFixed(3)}</TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Continue Shopping
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Cart Summary
            </Typography>
            <Grid container justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(3)}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Shipping (5%)</Typography>
              <Typography>${shipping.toFixed(3)}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(3)}</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
