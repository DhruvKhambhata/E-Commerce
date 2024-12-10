"use client";

import React from "react";
import "./globals.css";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

const metadata = {
  title: "StyleHub - Fashion & Accessories",
  description: "Your one-stop shop for trendy t-shirts, mugs, and jewelry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Box component="main" sx={{ flex: 1, padding: 2 }}>
            {children}
          </Box>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
