import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import CardItem from "../components/Card/CardItem";
import CardSkeleton from "../components/Card/CardSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const fetchProducts = useCallback(async () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
// Fetches categories
// const fetchCategories = useCallback(async () => {
//   try {
//     const response = await fetch('https://fakestoreapi.com/products/categories');
//     const dataC = await response.json();
//     setCategories(dataC);
//     console.log('Categories:', dataC); // Log categories to console
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//   }
// }, []);

// useEffect(() => {
//   fetchCategories();
// }, [fetchCategories]);
  return (
    <Grid container maxWidth={"xl"} spacing={2} my={2} >
      {isLoading
        ? Array.from(new Array(12)).map((_, index) => [<CardSkeleton key={index + 1} />])
        : products.map((product: any) => [
            <CardItem
            id={product.id}
            img={product.image}
            altImg={`card item-${product.id}`}
            price={product.price}
            title={product.title}
            description={product.description}
            />,
          ])}
          
    </Grid>
  );
};

export default Home;
