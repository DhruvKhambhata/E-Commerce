"use client";

import React from "react";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CssBaseline,
  ThemeProvider,
  Box,
} from "@mui/material";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { theme } from "./assets/theme";



const metadata = {
  title: "StyleHub - Fashion & Accessories",
  description: "Your one-stop shop for trendy t-shirts, mugs, and jewelry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const queryClient = new QueryClient();  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Box component="main" sx={{ flex: 1, padding: 2 }}>
            {children}
          </Box>
          <Footer />
        </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
