document.querySelectorAll('.show-hide-btn').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('.container');
    const isExpanded = container.classList.contains('expanded');

    if (isExpanded) {
      // Step 1: collapse immediately
      container.classList.remove('expanded');

      // Step 2: bounce AFTER collapse
      requestAnimationFrame(() => {
        container.classList.add('collapsing');
        setTimeout(() => {
          container.classList.remove('collapsing');
        }, 400);
      });
    } else {
      // Step 1: expand immediately
      container.classList.add('expanded');

      // Step 2: bounce AFTER expand
      requestAnimationFrame(() => {
        container.classList.add('expanding');
        setTimeout(() => {
          container.classList.remove('expanding');
        }, 400);
      });
    }
  });
});
