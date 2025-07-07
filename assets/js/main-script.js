document.querySelectorAll('.show-hide-btn').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('.container');
    document.startViewTransition(() => {
      container.classList.toggle('expanded');
    });
  });
});

document.querySelectorAll('.container').forEach(container => {
  const cards = container.querySelectorAll('.link-card');
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const isExpanded = container.classList.contains('expanded');
      if (isExpanded || index === 0) {
        const url = card.getAttribute('data-url');
        if (url) window.open(url, '_blank');
      }
    });
  });
});