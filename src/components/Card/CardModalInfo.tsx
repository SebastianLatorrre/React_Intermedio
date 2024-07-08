import { useState } from 'react';
import { IconButton, Typography, Box, Button, Stack } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Car/CartContext'; 
import { theme } from '../../style/theme';
import { AddShoppingCart } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

export type CardModalInfoProps = {
  product: {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
  };
};

const CardModalInfo = ({ product }: CardModalInfoProps) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const {  addToCart } = useCart();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewDetails = () => {
    handleClose();
    navigate(`/productDetail/${product.id}`);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      image: product.image,
    };
    addToCart(itemToAdd);
    handleClose();
  };

  const priceCol = Number(product.price) * 3936;
  const discount = 15; 
  const priceDiscount = priceCol * (discount / 100);
  const COP = new Intl.NumberFormat('en-DE');

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <RemoveRedEyeIcon color="primary" />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        sx={{ color: theme.palette.background.default }}
        open={open}
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={10}>
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={product.image}
                loading="lazy"
                style={{ height: 300, objectFit: 'contain', width: '100%' }}
                alt={product.title}
              />
            </Box>
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                {product.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleViewDetails}
                sx={{ mb: 2 }}
              >
                View product details
              </Button>

              <Typography variant="body1" color="error" sx={{ mt: 2, mb: 1 }}>
                -{discount}% ${COP.format(priceDiscount).split(',')[0]}
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                List Price: ${COP.format(priceCol).split(',')[0]}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={handleDecreaseQuantity}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{quantity}</Typography>
                <IconButton onClick={handleIncreaseQuantity}>
                  <AddIcon />
                </IconButton>
              </Stack>
              <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleAddToCart}>
                <AddShoppingCart/> ADD TO CART
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default CardModalInfo;

