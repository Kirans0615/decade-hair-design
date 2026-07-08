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
    lineup: `${base}assets/products/product-lineup.jpg`,
    h2o: `${base}assets/products/product-h2o.jpg`,
    moisture: `${base}assets/products/product-moisture.jpg`,
    clean: `${base}assets/products/product-clean.jpg`,
    reliefConditioner: `${base}assets/products/product-relief-conditioner.jpg`,
    reliefPomade: `${base}assets/products/product-relief-pomade.jpg`,
    smooth: `${base}assets/products/product-smooth.jpg`,
    foam: `${base}assets/products/product-foam.jpg`,
    shine: `${base}assets/products/product-shine.jpg`,
    controlMist: `${base}assets/products/product-control-mist.jpg`,
    controlEdge: `${base}assets/products/product-control-edge.jpg`,
    silkEnergizer: `${base}assets/products/product-silk-energizer.jpg`,
  },
  atmosphere: {
    booth: `${base}assets/atmosphere/atmosphere-booth.jpg`,
    interior: `${base}assets/atmosphere/atmosphere-interior.jpg`,
  },
  about: {
    portrait: `${base}assets/about/about-portrait.jpg`,
  },
} as const
