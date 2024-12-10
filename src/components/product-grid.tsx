import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import useEmblaCarousel from "embla-carousel-react";

interface ProductPropType {
  id?: number;
  name?: string;
  price?: number | string;
  category?: string;
  images?: string[];
}

const products = [
  { id: 1, name: "Classic White T-Shirt", price: 29.99, category: "tshirts", images: ["/placeholder.svg", "/placeholder.svg?text=T-Shirt+Back"] },
  { id: 2, name: "Ceramic Coffee Mug", price: 19.99, category: "mugs", images: ["/placeholder.svg", "/placeholder.svg?text=Mug+Side"] },
  { id: 3, name: "Silver Necklace", price: 49.99, category: "jewelry", images: ["/placeholder.svg", "/placeholder.svg?text=Necklace+Closeup"] },
  { id: 4, name: "Graphic Print T-Shirt", price: 34.99, category: "tshirts", images: ["/placeholder.svg", "/placeholder.svg?text=T-Shirt+Back"] },
  { id: 5, name: "Travel Mug", price: 24.99, category: "mugs", images: ["/placeholder.svg", "/placeholder.svg?text=Mug+Side"] },
  { id: 6, name: "Gold Bracelet", price: 79.99, category: "jewelry", images: ["/placeholder.svg", "/placeholder.svg?text=Bracelet+Closeup"] },
];

function ProductCard({ product }: { product: ProductPropType }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <Box className="relative aspect-square h-48">
          <Box className="embla" ref={emblaRef}>
            <Box className="embla__container h-full">
              {product.images?.map((src, index) => (
                <Box key={index} className="embla__slide relative w-full h-full flex-[0_0_100%]">
                  <Image
                    src={src}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Box className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {product.images?.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </Box>
          <IconButton
            className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90 transition-opacity duration-300 ${
              prevBtnEnabled ? "opacity-75 hover:opacity-100" : "opacity-0"
            }`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90 transition-opacity duration-300 ${
              nextBtnEnabled ? "opacity-75 hover:opacity-100" : "opacity-0"
            }`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </CardContent>
      <CardActions className="p-3 flex-col items-start gap-2">
        <Box className="flex items-center justify-between w-full">
          <Typography variant="subtitle1" className="font-semibold text-sm">
            {product.name}
          </Typography>
          <Typography variant="body2" className="text-xs font-bold">
            ${Number(product.price).toFixed(2)}
          </Typography>
        </Box>
        <Button variant="contained" size="small" className="w-full text-xs">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export function ProductGrid() {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={6} sm={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}