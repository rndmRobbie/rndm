(() => {
  const toggleBtn = document.querySelector('.panel-toggle-btn');
  const panelContainer = document.querySelector('.panel-container');

  toggleBtn?.addEventListener('click', () => {
    document.startViewTransition(() => {
      panelContainer.classList.toggle('expanded');
    });
  });
})();
