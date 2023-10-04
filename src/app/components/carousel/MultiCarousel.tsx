"use client";

import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PostModalPortal from "../modal/PostModal";
import PostModal from "../PostModal";
import PostCard from "../PostCard";
import { Post } from "@/model/post";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function MultiCarousel({ children }: Props) {
   return (
    <Carousel infinite autoPlay responsive={responsive} itemClass="hover:scale-110 transition-all cursor-pointer">
      {children}
    </Carousel>
  );
}
