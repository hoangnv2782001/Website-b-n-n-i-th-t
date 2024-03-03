import React from "react";
import Banner from "../../../assets/quan10.jpg";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/formatNumber";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        transition: "transform 0.5s linear 0s",
        position: 'relative',
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 20px",
        
          transform: "translateY(-2px)",
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          width: "100%",
          borderRadius: "4px",
          cursor: "pointer",
          
        }}
        onClick={() => {
          navigate(`/product/${product.id}`);
        }}
      >
        <CardMedia
          sx={{ height: "200px" }}
          image={product.img}
          title="green iguana"
        />
        <CardContent
          sx={{
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            flex: "1 1 0%",
          }}
        >
          <Stack sx={{ gap: "4px", height: "36px" }}>
            <Typography
              sx={{
                overflow: "hidden",
                whiteSpace: "break-spaces",
                fontWeight: "400",
                fontSize: "12px",

                lineHeight: "18px",

                color: "rgb(39, 39, 42)",

                wordBreak: "break-word",
                textOverflow: "ellipsis",
              }}
            >
              {product.name}
            </Typography>
          </Stack>
          <Typography variant="h5" color="#000">
            {formatNumber(product.price)}Đ
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
