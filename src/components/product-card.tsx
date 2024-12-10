"use client";

import React from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Skeleton,
  styled,
} from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

// Define the type for the product prop
interface Product {
  id: string;
  title: string;
  thumbnailUrl: string;
}

// Define the type for the component props
interface ProductCardProps {
  product: Product;
  isApiLoading: boolean;
}

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  aspectRatio: "1",
  overflow: "hidden",
  backgroundColor: theme.palette.grey[100],
}));

const ProductCard: React.FC<ProductCardProps> = ({ product, isApiLoading }) => {
  return (
    <>
      {isApiLoading ? (
        <StyledCard>
          <Skeleton variant="rectangular" height={300} />
          <CardContent>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </CardContent>
          <CardActions>
            <Skeleton variant="rectangular" width="100%" height={36} />
          </CardActions>
        </StyledCard>
      ) : (
        <StyledCard>
          <ImageContainer>
            <Box>
              <Box sx={{ display: "flex", height: "100%" }}>
                <Image
                  src={product.thumbnailUrl}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Box>
            </Box>
          </ImageContainer>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" noWrap>
              {product.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Add to Cart
            </Button>
          </CardActions>
        </StyledCard>
      )}
    </>
  );
};

export default ProductCard;
