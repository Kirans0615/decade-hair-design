export const ASSETS = {
  hero: {
    video: "/assets/hero/hero-video.mp4",
    poster: "/assets/hero/hero-poster.jpg",
  },
  gallery: [
    "/assets/gallery/gallery-01.jpg",
    "/assets/gallery/gallery-02.jpg",
    "/assets/gallery/gallery-03.jpg",
    "/assets/gallery/gallery-04.jpg",
    "/assets/gallery/gallery-05.jpg",
    "/assets/gallery/gallery-06.jpg",
  ] as const,
  products: {
    tins: "/assets/products/product-tins.jpg",
    cape: "/assets/products/product-cape.jpg",
  },
  atmosphere: {
    booth: "/assets/atmosphere/atmosphere-booth.jpg",
  },
  about: {
    portrait: "/assets/about/about-portrait.jpg",
  },
} as const
