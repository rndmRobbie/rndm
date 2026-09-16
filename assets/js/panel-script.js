const panelToggleBtn = document.querySelector('.panel-toggle-btn');
const panelContainer = document.querySelector('.panel-container');

panelToggleBtn?.addEventListener('click', () => {
  const toggle = () => {
    const expanded = panelContainer.classList.toggle('expanded');
    panelToggleBtn.setAttribute('aria-expanded', String(expanded));
  };

  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(toggle);
  } else {
    toggle();
  }
});
