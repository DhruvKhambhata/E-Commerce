"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  InputBase,
  Box,
  useScrollTrigger,
  Slide,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Search as SearchIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const GradientBox = styled(Box)(({ theme }) => ({
  height: "4px",
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const initialCartItems = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Ceramic Coffee Mug",
    price: 19.99,
    quantity: 2,
    image: "/placeholder.svg",
  },
];

function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

function Cart() {
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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
        <Badge
          badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Your Cart</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} divider>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  style={{ borderRadius: "4px", marginRight: "16px" }}
                />
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)}`}
                />
                <Box display="flex" alignItems="center">
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography mx={1}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <HideOnScroll>
        <AppBar position="sticky" color="default" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                textDecoration: "none",
                color: "text.primary",
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              StyleHub
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {["T-Shirts", "Mugs", "Jewelry"].map((text) => (
                <Button
                  type="button"
                  key={text}
                  onClick={() => router.push(`/category/${text.toLowerCase()}`)}
                >
                  {text}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  mr: 2,
                  display: { xs: "none", sm: "block" },
                }}
              >
                <SearchIcon
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Box>
              <Cart />
            </Box>
          </Toolbar>
          <GradientBox />
        </AppBar>
      </HideOnScroll>
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={() => setMobileMenuOpen(false)}
        >
          {["T-Shirts", "Mugs", "Jewelry"].map((text) => (
            <button
              type="button"
              key={text}
              onClick={() => router.push(`/category/${text.toLowerCase()}`)}
            >
              <ListItem component="a">
                <ListItemText primary={text} />
              </ListItem>
            </button>
          ))}
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
