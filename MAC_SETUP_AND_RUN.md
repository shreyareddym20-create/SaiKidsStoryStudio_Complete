# Sai Kids Story Studio — MacBook Air Setup & Run Guide

This guide explains exactly how to run the Electron app from the ZIP on macOS.

## 1) Extract ZIP
1. Double-click the ZIP in Finder.
2. Open Terminal.
3. Go to extracted folder:

```bash
cd /path/to/SaiKidsStoryStudio_Complete
```

## 2) Install Node.js (one-time)
Install Node LTS:
- Option A: https://nodejs.org/
- Option B (Homebrew):

```bash
brew install node
```

Verify:

```bash
node -v
npm -v
```

## 3) Install app dependencies
Inside project folder:

```bash
npm install
```

## 4) Start app

```bash
npm start
```

If macOS blocks Electron the first time:
- Open **System Settings → Privacy & Security**
- Click **Open Anyway** for the blocked app/runtime.

## 5) Current app usage flow (updated)
1. Upload characters/backgrounds/music/effects from left panel.
2. Enter story prompt.
3. Choose language + voice profile.
4. Click **Auto Split Scenes** or **One-Click 5 Minute Story**.
5. Add/remove scenes in timeline.
6. Click **Preview Story** to simulate scene playback.
7. Click **Save Project JSON** to back up your project.
8. Click **Export MP4** (currently scaffold message only).

## 6) Important note about current scaffold
The current codebase has a functional editor scaffold, but MP4 export/TTS/lip-sync are still integration points.
To get final production output, integrate:
- FFmpeg/ffmpeg.wasm export pipeline
- TTS provider and subtitle timing
- Canvas animation render engine with keyframes
- Audio mixdown (voice + BGM + SFX)

## 7) Troubleshooting

### Problem: `electron: command not found`
Run:

```bash
npm install
npm start
```

### Problem: blank window
- Confirm files exist: `index.html`, `renderer.js`, `style.css`, `main.js`
- Check syntax:

```bash
npm run lint:quick
```

### Problem: permission errors
Use a normal user-writable folder (e.g., `~/Projects`). Avoid running from restricted directories.

## 8) Next milestone plan (recommended)
1. Implement timeline playback engine
2. Implement character rig + motion keyframes
3. Integrate voice/TTS + subtitle sync
4. Integrate FFmpeg export + thumbnail generator
5. Package `.dmg` for Mac distribution
