document.addEventListener("DOMContentLoaded", () => {
  const logoLines = [
    "██████╗ ███╗   ██╗██████╗ ███╗   ███╗",
    "██╔══██╗████╗  ██║██╔══██╗████╗ ████║",
    "██████╔╝██╔██╗ ██║██║  ██║██╔████╔██║",
    "██╔═╗██╗██║╚██╗██║██║  ██║██║╚██╔╝██║",
    "██║ ╚██║██║ ╚████║██████╔╝██║ ╚═╝ ██║",
    "╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝     ╚═╝"
  ];

  const logoTarget = document.getElementById("logo-target");
  const overlay = document.getElementById("boot-overlay");
  const target = document.querySelector(".boot-sequence");
  const rawText = target.textContent.trim();
  let lineIndex = 0;

  function writeLogoLine() {
    if (lineIndex < logoLines.length) {
      logoTarget.textContent += logoLines[lineIndex] + "\n";
      lineIndex++;
      setTimeout(writeLogoLine, 100);
    } else {
      logoTarget.classList.add("active-glow");
      startBootSequence();
    }
  }

  writeLogoLine();

  function startBootSequence() {
    const finalText = rawText;
    const skipMap = new Array(finalText.length).fill(false);
    const cyrillic = "ДЖЗЙЛПФЦЧШЩЪЫЬЭЮЯБВГЁЖЗИЙК";
    const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノ";
    const charset = cyrillic + katakana;
    let output = Array(finalText.length).fill("");
    let currentIndex = 0;

    function updateDisplay() {
      const result = output.join("");
      target.innerHTML = result;
      target.setAttribute("data-content", result);
      if (currentIndex >= finalText.length) {
        target.innerHTML += '<span class="cursor">█</span>';
        target.setAttribute("data-content", result + "█");
        closeOverlay();
      }
    }

    function scrambleChar(pos, realChar) {
      let cycles = 0;
      const maxCycles = 2 + Math.floor(Math.random() * 2);
      const cycle = setInterval(() => {
        output[pos] = charset[Math.floor(Math.random() * charset.length)];
        updateDisplay();
        cycles++;
        if (cycles >= maxCycles) {
          clearInterval(cycle);
          output[pos] = realChar;
          updateDisplay();
          currentIndex++;
          if (currentIndex < finalText.length) {
            setTimeout(() => scrambleChar(currentIndex, finalText[currentIndex]), 1);
          }
        }
      }, 15);
    }

    target.textContent = "";
    scrambleChar(0, finalText[0]);
  }

  function closeOverlay() {
    setTimeout(() => {
      overlay.classList.add("boot-hide");
      setTimeout(() => overlay.remove(), 600);
    }, 600);
  }
});