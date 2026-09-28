import type { Surface } from "@/components/sections/Ship";
import type { StripPhoto } from "@/components/sections/PhotoStrip";
/**
 * All media is ImagineArt's own published showcase output, re-encoded for the
 * web. Source page for each is noted; originals and a manifest are in the
 * scrape folder referenced in README.
 */
export const HERO_IMAGE = "/assets/hero/hero.webp";   // frame of the imagine.art homepage hero loop
export const HERO_VIDEO = "/assets/hero/hero.mp4";    // same loop, 1600w, silent

/** Vyro's own San Francisco shoots (Imagine Computer, MCP and giveaway footage), graded from Sony FX6 log. */
export const SF_PHOTOS = {
  main: { src: "/assets/sf/golden-gate-walk.webp", video: "/assets/sf/golden-gate-walk.mp4", alt: "Members of the Vyro team walking by the Golden Gate Bridge" },
  side: [
    { src: "/assets/sf/office.webp", alt: "Vyro's San Francisco office" },
    { src: "/assets/sf/office-window.webp", alt: "Working at a window desk in the San Francisco office" },
  ],
};

const ph = (id: string, alt: string): StripPhoto => ({ src: `/assets/life/${id}.webp`, alt, w: 960, h: 540 });

/** Candid frames from the same San Francisco shoots, split across two drifting strips. */
export const LIFE_A: StripPhoto[] = [
  ph("c1494", "The team walking at the Golden Gate overlook"),
  ph("c1910", "Working at a window desk in the San Francisco office"),
  ph("c1531", "Working on a laptop under a tree in a San Francisco park"),
  ph("c1519", "The lagoon at the Palace of Fine Arts"),
  ph("c1919", "At a desk in the San Francisco office"),
  ph("c1746", "Downtown San Francisco"),
];
export const LIFE_B: StripPhoto[] = [
  ph("c1496", "Talking through an idea at the Golden Gate"),
  ph("c1912", "Hands on a laptop in the office"),
  ph("c1534", "A San Francisco park on a clear day"),
  ph("c1530", "Filming at the Palace of Fine Arts"),
  ph("c1505", "Above the Golden Gate Bridge"),
  ph("c1948", "Crossing the street near the office"),
];

const IA = "https://www.imagine.art";
export const SURFACES: Surface[] = [
  { name: "Image", blurb: "Text to image across 50+ models, including ImagineArt's own.", image: "/assets/ship/image.webp", video: "/assets/ship/image.mp4", alt: "A montage of images generated in ImagineArt", href: `${IA}/ai-image-generator` },
  { name: "Video", blurb: "Text and image to video, with the frontier video models side by side.", image: "/assets/ship/video.webp", video: "/assets/ship/video.mp4", alt: "A generated video still: a tiger paw with painted claws holding a glass", href: `${IA}/ai-video-generator` },
  { name: "Film Studio", blurb: "Storyboards, shots and camera control for long-form work.", image: "/assets/ship/film.webp", video: "/assets/ship/film.mp4", alt: "A generated period-drama crowd scene from Film Studio", href: `${IA}/ai-film-studio` },
  { name: "Ad Studio", blurb: "A product link in, a production-grade ad out.", image: "/assets/ship/ad.webp", video: "/assets/ship/ad.mp4", alt: "A generated sunscreen ad from Ad Studio", href: `${IA}/ad-studio` },
  { name: "Fashion Studio", blurb: "Catalog and editorial fashion imagery without a shoot.", image: "/assets/ship/fashion.webp", alt: "A generated fashion image: a model walking across a white salt flat", href: `${IA}/fashion-studio` },
  { name: "Audio Studio", blurb: "Voice, music and sound for everything else on this list.", image: "/assets/ship/audio.webp", video: "/assets/ship/audio.mp4", alt: "A generated podcast scene from Audio Studio", href: `${IA}/audio-studio` },
  { name: "Workflows", blurb: "A node canvas that chains models into repeatable pipelines.", image: "/assets/ship/workflows.webp", video: "/assets/ship/workflows.mp4", alt: "The Workflows node editor connecting an input to a generated car image", href: `${IA}/workflow` },
  { name: "MCP", blurb: "ImagineArt inside Claude, Cursor and any agent that speaks MCP.", image: "/assets/ship/mcp.webp", video: "/assets/ship/mcp.mp4", alt: "The ImagineArt MCP card", href: `${IA}/mcp` },
];
