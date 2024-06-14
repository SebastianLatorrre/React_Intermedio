
import { Box, Button, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import CardDiscount from "./CardDiscount";
import CardRating from "./CardRating";
import CardModalInfo from "./CardModalInfo";
import { theme } from "../../style/theme";

export type CardItemProps = {
  id: number;
  img: string;
  altImg: string;
  title: string;
  description: string;
  price: number;
};

const CardItem = ({ id, img, altImg, title, description, price }: CardItemProps) => {
  const [rating, setRating] = useState<number>(4);

  const priceCol = Number(price) * 3936;
  const discount = 80;
  const priceDiscount = priceCol * (discount / 100);
  const COP = new Intl.NumberFormat("en-DE");

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", backgroundColor:theme.palette.background.default}}>
        {/* Descuento */}
        <Stack direction="row" m={2} position={"absolute"}>
          <CardDiscount discount={discount} />
        </Stack>
        {/* Imagen */}
        <CardMedia sx={{ height: 200, width: "100%", objectFit: "scale-down",m: 2  }} component={"img"} image={img} alt={altImg} loading="lazy" />
        {/* Descripción y título */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        overflow: 'hidden',
      }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            mt={0}
            sx={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {/* {description} */}
          </Typography>
        </CardContent>
        {/* Precio del producto */}
        <Box py={2}>
          <Typography variant="h6" px={2}>{`$ ${COP.format(priceDiscount).split(",")[0]}`}</Typography>
          <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>{`$ ${
            COP.format(priceCol).split(",")[0]
          }`}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CardRating rating={rating} setRating={setRating} />
          <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <CardModalInfo product={{ id, image: img, title, description, price }} />
          </CardActions>
        </Box>
        {/* <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Link to={`/productDetail/${id}`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              View Details
            </Button>
          </Link>
        </Box> */}
         <Button>Add to cart</Button>
      </Card>
    </Grid>
  );
};

export default CardItem;

