const grid = document.querySelector('.grid');

async function withViewTransition(update, types) {
  if (typeof document.startViewTransition === 'function') {
    try {
      const transition = document.startViewTransition({ update, types });
      await transition.finished;
      return;
    } catch {
      /* Safari's older View Transition API takes a callback only */
      try {
        const transition = document.startViewTransition(update);
        await transition.finished;
        return;
      } catch {
        update();
        return;
      }
    }
  }
  update();
}

grid?.addEventListener('click', async (e) => {
  const path = e.composedPath();
  const item = path.find(el => el.classList?.contains('grid-item'));
  if (!item) return;

  const closeIcon = path.find(el => el.classList?.contains('close-icon'));
  const innerLink = e.target.closest?.('a.item');

  if (closeIcon) {
    item.classList.add('active');
    await withViewTransition(() => {
      item.classList.remove('expanded');
    }, ['collapse']);
    item.classList.remove('active');
    return;
  }

  if (!item.classList.contains('expanded')) {
    if (innerLink) e.preventDefault();
    item.classList.add('active');
    await withViewTransition(() => {
      item.classList.add('expanded');
    }, ['expand']);
    item.classList.remove('active');
  }
});
