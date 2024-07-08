import React, { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService';
import ProductForm from '../components/Product/ProductForm';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Product {
  id?: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const products = await getProducts();
    console.log('Fetched products:', products);
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateOrUpdateProduct = async (product: Product) => {
    if (!product.description) product.description = "";
    if (!product.category) product.category = "";
    if (!product.image) product.image = "";

    console.log('Submitting product:', product);
    if (selectedProduct && selectedProduct.id) {
      await updateProduct(selectedProduct.id, product);
      fetchProducts();
    } else {
      await createProduct(product);
    }
    fetchProducts();
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    console.log('Editing product:', product);
    setSelectedProduct(product);
  };

  
  const handleDeleteProduct = async (id: string) => {
    console.log('Deleting product with id:', id);
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Management
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProductForm product={selectedProduct || undefined} onSubmit={handleCreateOrUpdateProduct} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <List>
                {products.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText primary={product.title} secondary={`$${product.price}`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditProduct(product)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id!)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductsPage;
