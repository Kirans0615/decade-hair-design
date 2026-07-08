# Decade Hair Design — Assets & Copy To Confirm

## Real assets already wired in (from github.com/Kirans0615/Decade-Hair)
- [x] Hero video: `public/assets/hero/hero-video.mp4`
- [x] Hero poster (auto-extracted first frame): `public/assets/hero/hero-poster.jpg`
- [x] Gallery (6): `public/assets/gallery/gallery-01.jpg` … `gallery-06.jpg`
- [x] Products (13): full retail line photography, cleaned onto a consistent dark backdrop —
      `product-lineup.jpg` (full-line hero shot) plus 11 individual SKUs across
      Cleanse (H2O, Clean), Condition (Moisture, Relief), and Style & Finish
      (Smooth, Relief Pomade, Foam, Shine, Control Mist, Control Edge, Silk
      Energizer). Catalog data lives in `src/data/products.ts`.
- [x] Atmosphere: lead image is now the DHD wall-sign + retail-shelf interior shot
      (`atmosphere-interior.jpg`); the original trade-show booth photo moved to a
      side slot.
- [x] About portrait: `public/assets/about/about-portrait.jpg`
- [x] Logo (`src/components/ui/dhd-logo.tsx`) rebuilt to match the real DHD brand
      mark seen on product packaging: fleur-de-lis + "by Nat Lewis" atop a
      double rule, bold tight-tracked "DHD" wordmark below.

## Placeholder copy to replace with real information
- [ ] `src/data/services.ts` — service names/descriptions/prices are placeholder, confirm real menu + pricing
- [ ] `src/data/testimonials.ts` — all 3 quotes are fictional placeholders, replace with real client reviews
- [ ] `src/data/contact.ts` — address, phone, hours, and social handles are placeholders, replace with real info
- [ ] `src/components/sections/footer.tsx` — Instagram/Facebook `<a href="#">` links need real URLs
- [ ] `src/data/products.ts` — no pricing exists yet; cards are informational-only ("Available in-salon"). Add prices/buy links if retail e-commerce is ever wired up.

## Known asset gaps
- `DHD Control — Edge Rejuvenator` has no solo product photo; its card image is cropped from the full-lineup group shot, so it's lower resolution than the other 10. Replace with a dedicated photo if one becomes available.
- `product-tins.jpg` (bulk box of Smooth tins) and `product-cape.jpg` (branded styling cape) are real photos but currently unused by any section — candidates for the About or Atmosphere sections later.
