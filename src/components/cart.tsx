
'use Client';
import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Badge,
  AppBar,
  Toolbar,
} from "@mui/material";
import { ShoppingCart, Remove, Add, Close, Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";

const initialCartItems = [
  { id: 1, name: "Classic White T-Shirt", price: 29.99, quantity: 1, image: "/placeholder.svg" },
  { id: 2, name: "Ceramic Coffee Mug", price: 19.99, quantity: 2, image: "/placeholder.svg" },
];

export function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
        <Badge badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box width={360} display="flex" flexDirection="column" height="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant="h6">Your Cart</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Divider />

          <List sx={{ flex: 1, overflow: "auto" }}>
            {cartItems.map((item) => (
              <ListItem key={item.id} divider>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <Box ml={2} flex={1}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}>
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography mx={1}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}>
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <IconButton onClick={() => updateQuantity(item.id, -item.quantity)}>
                  <Close fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Divider />
          <Box p={2}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${total.toFixed(2)}
              </Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export function Header() {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StyleHub
          </Typography>
        </Link>
        <Box display="flex" alignItems="center" gap={2}>
          <Link href="/category/tshirts" style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="inherit">T-Shirts</Button>
          </Link>
          <Link href="/category/mugs" style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="inherit">Mugs</Button>
          </Link>
          <Link href="/category/jewelry" style={{ textDecoration: "none", color: "inherit" }}>
            <Button color="inherit">Jewelry</Button>
          </Link>
          <Cart />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
