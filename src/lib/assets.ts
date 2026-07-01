// import.meta.env.BASE_URL reflects Vite's `base` config (e.g. "./") so these
// runtime string paths resolve correctly under any deploy subpath, since Vite
// does not rewrite plain string literals the way it rewrites build-time
// import/href/src references.
const base = import.meta.env.BASE_URL

export const ASSETS = {
  hero: {
    video: `${base}assets/hero/hero-video.mp4`,
    poster: `${base}assets/hero/hero-poster.jpg`,
  },
  gallery: [
    `${base}assets/gallery/gallery-01.jpg`,
    `${base}assets/gallery/gallery-02.jpg`,
    `${base}assets/gallery/gallery-03.jpg`,
    `${base}assets/gallery/gallery-04.jpg`,
    `${base}assets/gallery/gallery-05.jpg`,
    `${base}assets/gallery/gallery-06.jpg`,
  ] as const,
  products: {
    tins: `${base}assets/products/product-tins.jpg`,
    cape: `${base}assets/products/product-cape.jpg`,
  },
  atmosphere: {
    booth: `${base}assets/atmosphere/atmosphere-booth.jpg`,
  },
  about: {
    portrait: `${base}assets/about/about-portrait.jpg`,
  },
} as const
