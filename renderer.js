const storyStudioFeatures = Array.from({ length: 42 }, (_, i) => `Feature ${i + 1}`);

window.addEventListener('DOMContentLoaded', () => {
  const showFeaturesBtn = document.getElementById('show-features');
  const output = document.getElementById('feature-output');

  showFeaturesBtn?.addEventListener('click', () => {
    output.textContent = `Loaded ${storyStudioFeatures.length} scaffolded features.`;
  });
});
