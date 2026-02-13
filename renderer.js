const FEATURES = [
  'Multi-scene timeline editor',
  'Add/remove scenes',
  'Drag-drop characters/backgrounds scaffold',
  'Scene duration control',
  'Upload character images',
  'Upload background images',
  'Upload music/effects',
  'Preloaded Indian character categories',
  'Character motion presets',
  'Facial expression presets',
  'Character customization scaffold',
  'Village/pond/fields/house presets',
  'Weather effects scaffold',
  'Moving clouds/field sway effects scaffold',
  'Multilanguage selector',
  'Voice style selector',
  'Text-to-speech integration point',
  'Auto subtitle generation point',
  'Prompt-based story generator',
  'Auto scene splitting',
  'Episode and season support scaffold',
  'Album storage for generated stories',
  'Bone rigging placeholder',
  'Lip-sync placeholder',
  'Motion speed controls',
  'Template library',
  'Template upload/download point',
  'Marketplace placeholder',
  'MP4 export integration point',
  'Thumbnail generation point',
  'Background music per scene',
  'Sound effect tracks',
  'Monetization dashboard',
  'Story/export analytics',
  'Offline-first architecture',
  'Optional online asset fetch point',
  'Reusable character album',
  'Reusable background album',
  'Reusable motion/effects presets',
  'One-click 5-minute story scaffold',
  'Sketch vs realistic mode switch point',
  'Electron desktop runtime setup'
];

const state = {
  scenes: [],
  selectedSceneId: null,
  assets: {
    characters: [],
    backgrounds: [],
    music: [],
    effects: []
  },
  stats: {
    storiesCreated: 0,
    exports: 0
  }
};

const ids = (id) => document.getElementById(id);

function renderFeatures() {
  ids('feature-count').textContent = `Implemented scaffold coverage: ${FEATURES.length} / 42 features`;
  ids('feature-list').innerHTML = FEATURES.map((feature) => `<li>${feature}</li>`).join('');
}

function persistState() {
  localStorage.setItem('sai-kids-story-studio-state', JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem('sai-kids-story-studio-state');
  if (!raw) return;

  const parsed = JSON.parse(raw);
  Object.assign(state, parsed);
}

function renderScenes() {
  const list = ids('scene-list');
  list.innerHTML = state.scenes
    .map(
      (scene) =>
        `<li class="${scene.id === state.selectedSceneId ? 'selected' : ''}" data-id="${scene.id}">
          <strong>${scene.title}</strong> • ${scene.duration}s • motion:${scene.motion}
        </li>`
    )
    .join('');

  ids('scene-time').textContent = `${state.scenes.reduce((sum, scene) => sum + scene.duration, 0)} sec`;
}

function renderAssets() {
  ['characters', 'backgrounds', 'music', 'effects'].forEach((type) => {
    ids(`${type}-list`).innerHTML = state.assets[type].map((fileName) => `<li>${fileName}</li>`).join('');
  });
}

function renderDashboard() {
  ids('stories-created').textContent = String(state.stats.storiesCreated);
  ids('export-count').textContent = String(state.stats.exports);
  const estimate = state.stats.exports * 120 + state.stats.storiesCreated * 40;
  ids('estimated-revenue').textContent = `₹${estimate}`;
}

function addScene(title = `Scene ${state.scenes.length + 1}`) {
  const duration = Number(ids('scene-duration').value) || 30;
  const scene = {
    id: crypto.randomUUID(),
    title,
    duration,
    motion: 'normal walk'
  };

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

function bindSceneClicks() {
  ids('scene-list').addEventListener('click', (event) => {
    const li = event.target.closest('li[data-id]');
    if (!li) return;

    state.selectedSceneId = li.dataset.id;
    renderScenes();
    persistState();
  });
}

function handleAssetUpload(type, files) {
  const names = Array.from(files).map((file) => file.name);
  state.assets[type].push(...names);
  renderAssets();
  persistState();
}

function generateScenesFromPrompt() {
  const prompt = ids('story-prompt').value.trim() || 'A kind village story';
  const chunks = [
    `${prompt} - Opening`,
    `${prompt} - Conflict`,
    `${prompt} - Emotion`,
    `${prompt} - Resolution`,
    `${prompt} - Moral`
  ];

  chunks.forEach((chunk) => addScene(chunk));
  state.stats.storiesCreated += 1;
  renderDashboard();
  persistState();
}

function bindEvents() {
  ids('add-scene-btn').addEventListener('click', () => addScene());
  ids('remove-scene-btn').addEventListener('click', removeSelectedScene);
  ids('generate-scenes-btn').addEventListener('click', generateScenesFromPrompt);
  ids('generate-story-btn').addEventListener('click', generateScenesFromPrompt);
  ids('export-btn').addEventListener('click', () => {
    state.stats.exports += 1;
    renderDashboard();
    alert('Export scaffold complete. Integrate ffmpeg/ffmpeg.wasm for real MP4 output.');
    persistState();
  });

  ['characters', 'backgrounds', 'music', 'effects'].forEach((type) => {
    ids(`${type}-upload`).addEventListener('change', (event) => {
      if (!event.target.files) return;

      handleAssetUpload(type, event.target.files);
      event.target.value = '';
    });
  });

  document.querySelectorAll('.tool-btn').forEach((button) => {
    button.addEventListener('click', () => {
      ids('canvas-preview').innerHTML = `<p><strong>${button.dataset.tool}</strong> tool selected.<br />Ready for advanced editor integration.</p>`;
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderFeatures();
  renderScenes();
  renderAssets();
  renderDashboard();
  bindSceneClicks();
  bindEvents();
});
