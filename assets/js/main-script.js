document.addEventListener("DOMContentLoaded", () => {
  // Toggle Expand/Collapse Containers
  document.querySelectorAll(".show-hide-btn").forEach(button => {
    button.addEventListener("click", () => {
      const container = button.closest(".container");
      const isExpanded = container.classList.contains("expanded");

      if (isExpanded) {
        container.classList.remove("expanded");
        requestAnimationFrame(() => {
          container.classList.add("collapsing");
          setTimeout(() => container.classList.remove("collapsing"), 400);
        });
      } else {
        container.classList.add("expanded");
        requestAnimationFrame(() => {
          container.classList.add("expanding");
          setTimeout(() => container.classList.remove("expanding"), 400);
        });
      }
    });
  });

  // Handle .link-card click behavior
  document.querySelectorAll(".link-card").forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const url = card.getAttribute("data-url");
      if (url) {
        window.open(url, "_blank"); // 👈 change to location.href = url; for same-tab
      }
    });
  });
});
