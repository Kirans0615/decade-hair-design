# Decade Hair Design — Assets & Copy To Confirm

## Real assets already wired in (from github.com/Kirans0615/Decade-Hair)
- [x] Hero video: `public/assets/hero/hero-video.mp4`
- [x] Hero poster (auto-extracted first frame): `public/assets/hero/hero-poster.jpg`
- [x] Gallery (6): `public/assets/gallery/gallery-01.jpg` … `gallery-06.jpg`
- [x] Products (2): `public/assets/products/product-tins.jpg`, `product-cape.jpg`
- [x] Atmosphere lead image: `public/assets/atmosphere/atmosphere-booth.jpg`
- [x] About portrait: `public/assets/about/about-portrait.jpg`

## Placeholder copy to replace with real information
- [ ] `src/data/services.ts` — service names/descriptions/prices are placeholder, confirm real menu + pricing
- [ ] `src/data/testimonials.ts` — all 3 quotes are fictional placeholders, replace with real client reviews
- [ ] `src/data/contact.ts` — address, phone, hours, and social handles are placeholders, replace with real info
- [ ] `src/components/sections/footer.tsx` — Instagram/Facebook `<a href="#">` links need real URLs

## Known asset gaps
- No dedicated storefront exterior photo exists in the source repo — none was fabricated. If you have one, add it to `public/assets/atmosphere/` and wire it into `src/components/sections/atmosphere.tsx`.
- Only 2 real product photos exist; the Products section is intentionally a small 2-item showcase rather than a full grid. Add more images to `public/assets/products/` and extend `src/components/sections/products.tsx`'s `PRODUCTS` array if more product photography becomes available.
