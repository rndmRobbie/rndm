document.addEventListener("DOMContentLoaded", () => {
  console.log("🟢 DOM loaded");

  const logoLines = [
    "██████╗ ███╗   ██╗██████╗ ███╗   ███╗",
    "██╔══██╗████╗  ██║██╔══██╗████╗ ████║",
    "██████╔╝██╔██╗ ██║██║  ██║██╔████╔██║",
    "██╔═╗██╗██║╚██╗██║██║  ██║██║╚██╔╝██║",
    "██║ ╚██║██║ ╚████║██████╔╝██║ ╚═╝ ██║",
    "╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝     ╚═╝"
  ];

  const bootTextLines = [
    "Initializing terminal graphics...",
    "Loading modules [██████████] 100%",
    "Mounting /usr/rndm/core...",
    "System ready_"
  ];

  const bootText = bootTextLines.join("\n"); // clean, no extra newlines

  const logoTarget = document.getElementById("logo-target");
  const target = document.querySelector(".boot-sequence");
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
    console.log("🚀 Boot sequence starting...");
    const charset = "ДЖЗЙЛПФЦЧШЩЪЫЬЭЮЯБВГЁЖЗИЙКアイウエオカキクケコサシスセソタチツテトナニヌネノ";
    const finalText = bootText;
    const output = Array(finalText.length).fill("");
    let currentIndex = 0;

    function updateDisplay() {
      const result = output.join("");
      target.innerHTML = result + '<span class="cursor">█</span>';
      target.setAttribute("data-content", result + "█");

      if (currentIndex >= finalText.length) {
        console.log("✅ Boot text complete");
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
    console.log("⚡ Initiating screen flash");
    const flash = document.querySelector(".boot-flash");
    if (flash) {
      flash.classList.add("active");
    }
    setTimeout(() => {
      console.log("➡️ Redirecting to main.html");
      window.location.href = "main.html";
    }, 400);
  }
});
