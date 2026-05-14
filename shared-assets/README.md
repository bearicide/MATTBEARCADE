# MATTBEARCADE Shared Assets

Centralized shared asset structure for arcade projects.

## Structure

```text
/shared-assets
  /audio
  /backgrounds
  /buttons
  /crt
  /fx
  /icons
  /logos
  /ui
```

## Rules

- Prefer WebP for large images/backgrounds
- Prefer SVG for icons/logos/UI when possible
- Avoid duplicate copies between repos
- Use lowercase-hyphen filenames
- Keep mobile payloads lightweight
- Add thumbnails/previews separately from full assets
- Avoid spaces in filenames

## Recommended Naming

```text
cabinet-wordslots.webp
bg-neon-grid.webp
ui-ticket-icon.svg
fx-crt-scanline.png
logo-mattbearcade.svg
```

## Optimization Targets

- Hero images: under 400KB
- Backgrounds: under 700KB
- Icons: SVG preferred
- Audio previews: compressed OGG or MP3
- Use lazy loading for non-critical images

## Priority Cleanup Targets

- Duplicate NEONRITUAL assets
- WORD$LOTS duplicated FX/audio
- Old exported local-folder assets
- Multiple repo logo copies
