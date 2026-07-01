import { describe, it, expect } from "vitest"
import { ASSETS } from "./assets"

describe("ASSETS manifest", () => {
  it("has exactly 6 gallery images", () => {
    expect(ASSETS.gallery).toHaveLength(6)
  })
  it("exposes hero video and poster paths", () => {
    expect(ASSETS.hero.video).toBe("/assets/hero/hero-video.mp4")
    expect(ASSETS.hero.poster).toBe("/assets/hero/hero-poster.jpg")
  })
  it("exposes exactly 2 product images", () => {
    expect(Object.keys(ASSETS.products)).toHaveLength(2)
  })
})
