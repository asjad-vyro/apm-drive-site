import type { Surface } from "@/components/sections/Ship";
/**
 * All media is ImagineArt's own published showcase output, re-encoded for the
 * web. Source page for each is noted; originals and a manifest are in the
 * scrape folder referenced in README.
 */
export const HERO_IMAGE = "/assets/hero/hero.webp";   // frame of the imagine.art homepage hero loop
export const HERO_VIDEO = "/assets/hero/hero.mp4";    // same loop, 1600w, silent

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
