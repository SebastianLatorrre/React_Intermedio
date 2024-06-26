import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import CardItem from "../components/Card/CardItem";
import CardSkeleton from "../components/Card/CardSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState([]);

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
