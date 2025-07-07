document.addEventListener("DOMContentLoaded", () => {
  // === Expand / Collapse Buttons ===
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

  // === Make link-cards clickable ===
  document.querySelectorAll(".link-card").forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const url = card.getAttribute("data-url");
      if (url) {
        window.open(url, "_blank"); // Use "_self" to open in same tab
      }
    });
  });
});
