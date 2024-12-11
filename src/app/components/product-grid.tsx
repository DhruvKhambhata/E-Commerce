"use client";

import React from "react";
import { Grid, Container, Typography, Alert, Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import * as API from "./api";
import { CategoryShowcase } from "./category-showcase";

interface Product {
  id: string;
  title: string;
  thumbnailUrl: string;
}

type ProductsResponse = Product[];

export default function ProductGrid() {
  const {
    data,
    error,
    isLoading,
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["products"],
    queryFn: API.getProducts,
  });

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading products. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid2>
        <CategoryShowcase/>
      </Grid2>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Featured Products
      </Typography>
      <Grid container spacing={3}>
        {data?.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} isApiLoading={isLoading} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
