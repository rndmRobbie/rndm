const panelToggleBtn = document.querySelector('.panel-toggle-btn');
const panelContainer = document.querySelector('.panel-container');

panelToggleBtn?.addEventListener('click', () => {
  document.startViewTransition(() => {
    panelContainer.classList.toggle('expanded');
  });
});
