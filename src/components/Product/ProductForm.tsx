import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

interface Product {
  id?: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const { handleSubmit, control, reset } = useForm<Product>({
    defaultValues: product || { title: '', price: 0, description: '', category: '', image: '' },
  });

  useEffect(() => {
    reset(product);
  }, [product, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Product Name"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Price"
            type="number"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Category"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Image URL"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        {product ? 'Update Product' : 'Create Product'}
      </Button>
    </Box>
  );
};

export default ProductForm;
