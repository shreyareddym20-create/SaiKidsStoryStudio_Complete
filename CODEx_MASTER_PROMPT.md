# Sai Kids Story Studio — Ready-to-Copy Master Prompt for Codex

Use this prompt as-is in Codex (or another code generator) to generate a production-ready Electron app.

---

You are building a **Mac desktop app** called **Sai Kids Story Studio**.

## Product Goal
Create a professional **2D kids storytelling animation studio** (offline-first) with scene timeline editing, character motions, voice sync, backgrounds/effects, story generation, and MP4 export.

## Tech Stack
- Electron.js desktop app (Mac target)
- Frontend: HTML, CSS, vanilla JS
- Optional Node helpers where needed
- Offline-first with optional online asset fetch
- MP4 export using FFmpeg (native or ffmpeg.wasm fallback)

## Mandatory Project Structure
```text
SaiKidsStoryStudio/
├── index.html
├── main.js
├── renderer.js
├── style.css
├── package.json
├── assets/
│   ├── characters/
│   ├── backgrounds/
│   ├── music/
│   └── effects/
└── node_modules/
```

## Functional Scope (42 Features)
Implement these end-to-end with real logic (not placeholders):

1. Multi-scene timeline editor
2. Add/remove/reorder scenes
3. Drag-drop characters onto canvas
4. Drag-drop backgrounds onto canvas
5. Scene duration controls
6. Upload characters (PNG/JPG)
7. Upload backgrounds (PNG/JPG)
8. Upload music/effects (MP3/WAV)
9. Preloaded Indian character library (men/women/kids/farmer/jamindar/saints/old woman)
10. Character customization (dress/hair/skin tone)
11. Character motion system
12. Motion speed control (1 slow, 2 normal, 3 fast)
13. Facial expression system (smile/frown/angry/sad)
14. Bone-rig editing basics
15. Lip sync with dialogue
16. Multi-language voice support (Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, English)
17. Voice styles (Female Sweet, Male Warm, Child, Old, Aggressive, Crying, Laughing)
18. Subtitle auto-generation
19. Prompt-based story generator
20. Auto split story into scenes
21. Multiple episodes per story project
22. Save/load project album
23. Character album for reuse
24. Background album for reuse
25. Motions/effects preset album
26. Preloaded village backgrounds (village, pond, fields, houses)
27. Day/night/sunset variations
28. Weather effects (sun/rain/clouds/thunder/wind/flood)
29. Animated background motions (moving clouds/swaying fields)
30. Scene preview playback
31. Full story playback across timeline
32. Per-scene music track
33. Per-scene sound effects track
34. Master volume controls
35. MP4 export for full timeline
36. Thumbnail generation for YouTube
37. Template library (prebuilt story formats)
38. Template import/export
39. Marketplace-ready module hooks
40. Monetization dashboard (stories/exports/playtime/revenue estimate)
41. Offline-first local persistence
42. Electron app packaging readiness for Mac

## UI Requirements
Build a clean, kid-friendly but professional layout:
- Header: app name + quick actions (Generate Story, Preview, Export)
- Left toolbar: Characters, Backgrounds, Motions, Effects, Voices, Story Input, Templates, Marketplace
- Center canvas: scene rendering and animation preview
- Bottom/right timeline panel: scene cards, add/remove/reorder, duration, preview controls
- Library panels: uploaded + preloaded assets
- Dashboard panel: analytics and monetization stats

## Animation Requirements
Implement a practical 2D animation engine in `renderer.js`:
- Character selection + transform controls (position/scale/flip)
- Motion actions: walk/run/sit/sleep/jump/wave/fight/cry/laugh/breathe/heart beat
- Blend facial expression and body motion
- Scene-level effect layers for weather/environment
- Playback clock with frame updates

## Voice + Subtitle Requirements
- Add a `speakStory()` flow that:
  - chooses language + voice profile
  - generates speech (Web Speech API or pluggable TTS)
  - animates mouth open/close while speech plays
  - displays synced subtitles on canvas

## Story Intelligence Requirements
- User provides prompt text
- Parse into scene beats (opening/conflict/emotion/resolution/moral)
- Auto-suggest motions, expressions, background, and effects by keywords
- Allow manual override in UI

## Export Requirements
- Render timeline to MP4 with audio mix:
  - character animation
  - backgrounds/effects
  - voice narration
  - BGM + SFX
- Also produce a thumbnail image from best frame
- Provide clear progress and completion status in UI

## Code Quality Requirements
- Keep code modular within the 5 core files
- Use clear data models for project/scenes/characters/tracks
- Include robust error handling and validation for uploads
- Ensure app runs with `npm install` then `npm start`
- Include any additional npm scripts needed (build/package/export checks)

## UX Expectations
- Intuitive for non-technical creators
- Fast workflow for "one-click 5-minute story"
- Works offline for core flow
- Optional online asset fetch without breaking offline mode

## Output Expectations
Generate complete working code for:
- `index.html`
- `style.css`
- `renderer.js`
- `main.js`
- `package.json`
- required `assets/*` directory placeholders

Also include brief run instructions in a `README.md`.

---

End of prompt.
