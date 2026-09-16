document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("boot-overlay");
  const logEl = document.getElementById("boot-log");
  const skipBtn = document.getElementById("skip-boot");
  const play = document.documentElement.classList.contains("boot-play");

  if (!play || !overlay) return;

  const LINES = [
    "INIT CRT ..................... OK",
    "OPTICS ....................... OK",
    "MOUNT /usr/rndm/core ......... OK",
    "",
    "PRIORITY ONE",
    "GOOD MORNING."
  ];

  let skipped = false;
  const pending = new Set();

  function wait(ms) {
    return new Promise((resolve) => {
      if (skipped) {
        resolve();
        return;
      }
      const id = setTimeout(() => {
        pending.delete(cancel);
        resolve();
      }, ms);
      const cancel = () => {
        clearTimeout(id);
        pending.delete(cancel);
        resolve();
      };
      pending.add(cancel);
    });
  }

  function markSeen() {
    try {
      sessionStorage.setItem("rndm-boot-v2", "1");
    } catch {
      /* ignore */
    }
  }

  function render(text) {
    logEl.textContent = text;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";
    logEl.appendChild(cursor);
  }

  async function typeLines() {
    let out = "";
    for (const line of LINES) {
      if (skipped) return;
      for (let i = 0; i < line.length; i++) {
        if (skipped) return;
        out += line[i];
        render(out);
        await wait(16);
      }
      out += "\n";
      render(out);
      await wait(line === "" ? 80 : 140);
    }
  }

  function finish() {
    if (skipped) return;
    skipped = true;
    pending.forEach((cancel) => cancel());
    pending.clear();
    markSeen();
    overlay.classList.add("is-done");
    overlay.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      document.documentElement.classList.remove("boot-play");
      document.documentElement.classList.add("boot-skip");
      overlay.remove();
    }, 900);
  }

  function trySound() {
    const audio = document.getElementById("boot-audio");
    if (!audio) return;
    audio.volume = 0.35;
    audio.play().catch(() => {});
  }

  skipBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    finish();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      finish();
    }
  });
  setTimeout(() => {
    overlay.addEventListener("click", finish, { once: true });
  }, 700);

  trySound();

  (async () => {
    await wait(1080);
    if (skipped) return;
    overlay.classList.add("is-ready");
    await typeLines();
    if (skipped) return;
    await wait(720);
    finish();
  })();
});
