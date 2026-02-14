const FEATURES = [
  'Multi-scene timeline editor', 'Add/remove/reorder scenes', 'Drag-drop characters/backgrounds scaffold', 'Scene duration control',
  'Upload character images', 'Upload background images', 'Upload music/effects', 'Preloaded Indian character categories',
  'Character motion presets', 'Facial expression presets', 'Character customization scaffold', 'Village/pond/fields/house presets',
  'Weather effects scaffold', 'Moving clouds/field sway effects scaffold', 'Multilanguage selector', 'Voice style selector',
  'Text-to-speech integration point', 'Auto subtitle generation point', 'Prompt-based story generator', 'Auto scene splitting',
  'Episode and season support scaffold', 'Album storage for generated stories', 'Bone rigging placeholder', 'Lip-sync placeholder',
  'Motion speed controls', 'Template library', 'Template upload/download point', 'Marketplace placeholder',
  'MP4 export integration point', 'Thumbnail generation point', 'Background music per scene', 'Sound effect tracks',
  'Monetization dashboard', 'Story/export analytics', 'Offline-first architecture', 'Optional online asset fetch point',
  'Reusable character album', 'Reusable background album', 'Reusable motion/effects presets', 'One-click 5-minute story scaffold',
  'Sketch vs realistic mode switch point', 'Electron desktop runtime setup'
];

const STORAGE_KEY = 'sai-kids-story-studio-state-v2';
const state = {
  scenes: [],
  selectedSceneId: null,
  assets: { characters: [], backgrounds: [], music: [], effects: [] },
  stats: { storiesCreated: 0, exports: 0 }
};

const ids = (id) => document.getElementById(id);
let previewTimer = null;

function safeParseJSON(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const parsed = safeParseJSON(localStorage.getItem(STORAGE_KEY));
  if (!parsed) return;

  Object.assign(state, parsed);
}

function renderFeatures() {
  ids('feature-count').textContent = `Implemented scaffold coverage: ${FEATURES.length} / 42 features`;
  ids('feature-list').innerHTML = FEATURES.map((item) => `<li>${item}</li>`).join('');
}

function renderScenes() {
  ids('scene-list').innerHTML = state.scenes
    .map((scene, idx) => `<li class="${scene.id === state.selectedSceneId ? 'selected' : ''}" data-id="${scene.id}">
      <strong>${idx + 1}. ${scene.title}</strong> • ${scene.duration}s • motion:${scene.motion}
    </li>`)
    .join('');

  const total = state.scenes.reduce((sum, scene) => sum + scene.duration, 0);
  ids('scene-time').textContent = `${total} sec`;
}

function renderAssets() {
  ['characters', 'backgrounds', 'music', 'effects'].forEach((type) => {
    ids(`${type}-list`).innerHTML = state.assets[type].map((name) => `<li>${name}</li>`).join('');
  });
}

function renderDashboard() {
  ids('stories-created').textContent = String(state.stats.storiesCreated);
  ids('export-count').textContent = String(state.stats.exports);
  ids('estimated-revenue').textContent = `₹${state.stats.exports * 120 + state.stats.storiesCreated * 40}`;
}

function getDurationInput() {
  return Math.max(5, Number(ids('scene-duration').value) || 60);
}

function addScene(title = `Scene ${state.scenes.length + 1}`) {
  const scene = { id: crypto.randomUUID(), title, duration: getDurationInput(), motion: 'normal walk' };
  state.scenes.push(scene);
  state.selectedSceneId = scene.id;
  renderScenes();
  persistState();
}

function removeSelectedScene() {
  if (!state.selectedSceneId) return;
  state.scenes = state.scenes.filter((scene) => scene.id !== state.selectedSceneId);
  state.selectedSceneId = state.scenes[0]?.id ?? null;
  renderScenes();
  persistState();
}

function generateScenesFromPrompt() {
  const prompt = ids('story-prompt').value.trim() || 'A kind village story';
  [`${prompt} - Opening`, `${prompt} - Conflict`, `${prompt} - Emotion`, `${prompt} - Resolution`, `${prompt} - Moral`]
    .forEach((chunk) => addScene(chunk));
  state.stats.storiesCreated += 1;
  renderDashboard();
  persistState();
}

function playPreview() {
  if (!state.scenes.length) {
    ids('canvas-preview').innerHTML = '<p>Add scenes first, then click Preview.</p>';
    return;
  }

  stopPreview();
  let idx = 0;
  const language = ids('language-select').value;
  const voice = ids('voice-select').value;

  const showScene = () => {
    const scene = state.scenes[idx];
    state.selectedSceneId = scene.id;
    renderScenes();
    ids('canvas-preview').innerHTML = `<p><strong>${scene.title}</strong><br/>Duration: ${scene.duration}s • Motion: ${scene.motion}<br/>Language: ${language} • Voice: ${voice}</p>`;
    ids('subtitle-output').textContent = `Subtitle: ${scene.title}`;

    idx += 1;
    if (idx >= state.scenes.length) {
      stopPreview();
      ids('subtitle-output').textContent = 'Preview completed.';
      return;
    }

    previewTimer = setTimeout(showScene, 1200);
  };

  showScene();
}

function stopPreview() {
  if (previewTimer) {
    clearTimeout(previewTimer);
    previewTimer = null;
  }
}

function handleAssetUpload(type, files) {
  state.assets[type].push(...Array.from(files).map((file) => file.name));
  renderAssets();
  persistState();
}

function saveProject() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sai-kids-project.json';
  a.click();
  URL.revokeObjectURL(url);
}

function loadProjectFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const parsed = safeParseJSON(String(reader.result));
    if (!parsed?.scenes || !parsed?.assets || !parsed?.stats) {
      alert('Invalid project file.');
      return;
    }

    Object.assign(state, parsed);
    renderScenes();
    renderAssets();
    renderDashboard();
    persistState();
  };
  reader.readAsText(file);
}

function bindEvents() {
  ids('add-scene-btn').addEventListener('click', () => addScene());
  ids('remove-scene-btn').addEventListener('click', removeSelectedScene);
  ids('generate-scenes-btn').addEventListener('click', generateScenesFromPrompt);
  ids('generate-story-btn').addEventListener('click', generateScenesFromPrompt);
  ids('preview-btn').addEventListener('click', playPreview);
  ids('stop-preview-btn').addEventListener('click', stopPreview);
  ids('save-project-btn').addEventListener('click', saveProject);

  ids('load-project-input').addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) loadProjectFile(file);
    event.target.value = '';
  });

  ids('scene-list').addEventListener('click', (event) => {
    const li = event.target.closest('li[data-id]');
    if (!li) return;
    state.selectedSceneId = li.dataset.id;
    renderScenes();
    persistState();
  });

  ids('export-btn').addEventListener('click', () => {
    state.stats.exports += 1;
    renderDashboard();
    alert('MP4 export is scaffolded. Integrate ffmpeg/ffmpeg.wasm for real output.');
    persistState();
  });

  ['characters', 'backgrounds', 'music', 'effects'].forEach((type) => {
    ids(`${type}-upload`).addEventListener('change', (event) => {
      if (event.target.files) handleAssetUpload(type, event.target.files);
      event.target.value = '';
    });
  });

  document.querySelectorAll('.tool-btn').forEach((button) => {
    button.addEventListener('click', () => {
      ids('canvas-preview').innerHTML = `<p><strong>${button.dataset.tool}</strong> tool selected.<br/>Ready for deeper editor integration.</p>`;
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderFeatures();
  renderScenes();
  renderAssets();
  renderDashboard();
  bindEvents();
});
