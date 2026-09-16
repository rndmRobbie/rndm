document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("boot-overlay");
  const logoTarget = document.getElementById("logo-target");
  const bootTarget = document.getElementById("boot-sequence");
  const skipButton = document.getElementById("skip-boot");

  if (!overlay || document.documentElement.classList.contains("boot-skip")) {
    return;
  }

  document.documentElement.classList.add("boot-play");

  const CHARSET = "ДЖЗЙЛПФЦЧШЩЪЫЬЭЮЯБВГЁЖЗИЙКアイウエオカキクケコサシスセソタチツテトナニヌネノ";

  const logoLines = [
    "██████╗ ███╗   ██╗██████╗ ███╗   ███╗",
    "██╔══██╗████╗  ██║██╔══██╗████╗ ████║",
    "██████╔╝██╔██╗ ██║██║  ██║██╔████╔██║",
    "██╔═╗██╗██║╚██╗██║██║  ██║██║╚██╔╝██║",
    "██║ ╚██║██║ ╚████║██████╔╝██║ ╚═╝ ██║",
    "╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝     ╚═╝"
  ];

  let skipped = false;
  const pendingWaits = new Set();

  function wait(ms) {
    return new Promise((resolve) => {
      if (skipped) {
        resolve();
        return;
      }
      const id = setTimeout(() => {
        pendingWaits.delete(entry);
        resolve();
      }, ms);
      const entry = () => {
        clearTimeout(id);
        pendingWaits.delete(entry);
        resolve();
      };
      pendingWaits.add(entry);
    });
  }

  function finish() {
    if (skipped) return;
    skipped = true;
    pendingWaits.forEach((cancel) => cancel());
    pendingWaits.clear();

    const box = overlay.querySelector(".boot-box");
    box?.classList.add("boot-hide");
    overlay.setAttribute("aria-busy", "false");
    overlay.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      document.documentElement.classList.remove("boot-play");
      document.documentElement.classList.add("boot-skip");
      overlay.remove();
    }, 580);
  }

  function tryBootSound() {
    const audio = document.getElementById("boot-audio");
    if (!audio) return;
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }

  function renderBoot(text) {
    bootTarget.textContent = text;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";
    bootTarget.appendChild(cursor);
    bootTarget.setAttribute("data-content", text);
  }

  function scrambleFrame(text) {
    return [...text]
      .map((ch) => {
        if (/[\s\[\]%./:_-]/.test(ch) || ch === "█" || ch === "░") return ch;
        return CHARSET[Math.floor(Math.random() * CHARSET.length)];
      })
      .join("");
  }

  async function decodeLine(previous, nextLine) {
    const prefix = previous ? `${previous}\n` : "";
    for (let i = 0; i < 6; i++) {
      if (skipped) return;
      renderBoot(prefix + scrambleFrame(nextLine));
      await wait(28);
    }
    if (skipped) return;
    renderBoot(prefix + nextLine);
  }

  async function fillProgress(previous) {
    const prefix = previous ? `${previous}\nLoading modules [` : "Loading modules [";
    for (let i = 0; i <= 10; i++) {
      if (skipped) return;
      const bar = "█".repeat(i) + "░".repeat(10 - i);
      renderBoot(`${prefix}${bar}] ${String(i * 10).padStart(3, " ")}%`);
      await wait(48);
    }
  }

  async function writeLogo() {
    for (const line of logoLines) {
      if (skipped) return;
      logoTarget.textContent += `${line}\n`;
      await wait(70);
    }
    logoTarget.classList.add("active-glow");
  }

  async function runBootSequence() {
    overlay.setAttribute("aria-busy", "true");
    tryBootSound();
    await writeLogo();
    if (skipped) return;

    await decodeLine("", "Initializing terminal graphics...");
    if (skipped) return;
    await wait(90);

    const afterInit = "Initializing terminal graphics...";
    await fillProgress(afterInit);
    if (skipped) return;

    const afterLoad = `${afterInit}\nLoading modules [██████████] 100%`;
    await decodeLine(afterLoad, "Mounting /usr/rndm/core...");
    if (skipped) return;
    await wait(80);

    const afterMount = `${afterLoad}\nMounting /usr/rndm/core...`;
    await decodeLine(afterMount, "System ready");
    if (skipped) return;

    renderBoot(`${afterMount}\nSystem ready`);
    await wait(420);
    if (skipped) return;

    finish();
  }

  skipButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    finish();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      finish();
    }
  });

  runBootSequence();
});
