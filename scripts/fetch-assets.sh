#!/usr/bin/env bash
set -euo pipefail
BASE="https://raw.githubusercontent.com/Kirans0615/Decade-Hair/main"
DEST="public/assets"

mkdir -p "$DEST/hero" "$DEST/gallery" "$DEST/products" "$DEST/atmosphere" "$DEST/about"

curl -sL -o "$DEST/hero/hero-video.mp4" "$BASE/7626891-hd_1920_1080_25fps.mp4"
curl -sL -o "$DEST/gallery/gallery-01.jpg" "$BASE/34816662_1002183139956932_268397896510996480_n.jpg"
curl -sL -o "$DEST/gallery/gallery-02.jpg" "$BASE/67772588_1348847475290495_1072938355878002688_n.jpg"
curl -sL -o "$DEST/gallery/gallery-03.jpg" "$BASE/67921574_1348847538623822_2535553407985385472_n.jpg"
curl -sL -o "$DEST/gallery/gallery-04.jpg" "$BASE/68712885_1348847428623833_4504660338263719936_n.jpg"
curl -sL -o "$DEST/gallery/gallery-05.jpg" "$BASE/68868596_1348847341957175_8884867397761105920_n.jpg"
curl -sL -o "$DEST/gallery/gallery-06.jpg" "$BASE/68992248_1348847308623845_9059985807263137792_n.jpg"
curl -sL -o "$DEST/products/product-tins.jpg" "$BASE/34845489_1002182296623683_5343590081078755328_n.jpg"
curl -sL -o "$DEST/products/product-cape.jpg" "$BASE/35062787_1002182216623691_8259452011217420288_n.jpg"
curl -sL -o "$DEST/atmosphere/atmosphere-booth.jpg" "$BASE/480437054_938564061814182_7834755833444122254_n.jpg"
curl -sL -o "$DEST/about/about-portrait.jpg" "$BASE/68831057_1348847498623826_2417591959402053632_n.jpg"

ffmpeg -y -i "$DEST/hero/hero-video.mp4" -vf "select=eq(n\,0)" -q:v 3 -frames:v 1 "$DEST/hero/hero-poster.jpg"

echo "Assets fetched into $DEST"
