document.getElementById('taco-link')?.addEventListener('click', (e) => {
  e.preventDefault();

  const encoded = "cm9iYmllQHJuZG0uc2l0ZQ=="; // base64 for robbie@rndm.site
  const decoded = atob(encoded);
  window.location.href = `mailto:${decoded}`;
});
