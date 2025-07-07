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

  const bootText = `
Initializing terminal graphics...
Loading modules [██████████] 100%
Mounting /usr/rndm/core...
System ready_
`.trim();

  const logoTarget = document.getElementById("logo-target");
  const overlay = document.getElementById("boot-overlay");
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
    console.log("🚀 Starting boot sequence");
    const charset = "ДЖЗЙЛПФЦЧШЩЪЫЬЭЮЯБВГЁЖЗИЙКアイウエオカキクケコサシスセソタチツテトナニヌネノ";
    let output = Array(bootText.length).fill("");
    let currentIndex = 0;

    function updateDisplay() {
      const result = output.join("");
      target.innerHTML = result;
      target.setAttribute("data-content", result);
      if (currentIndex >= bootText.length) {
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
          if (currentIndex < bootText.length) {
            setTimeout(() => scrambleChar(currentIndex, bootText[currentIndex]), 1);
          }
        }
      }, 15);
    }

    target.textContent = "";
    scrambleChar(0, bootText[0]);
  }

  function closeOverlay() {
    console.log("✅ Boot sequence complete");
    setTimeout(() => {
      flashAndRedirect();
    }, 800);
  }

  function flashAndRedirect() {
    const flash = document.querySelector(".boot-flash");
    if (!flash) {
      console.error("❌ .boot-flash element not found!");
      return;
    }
    console.log("⚡ Triggering flash...");
    flash.classList.add("active");
    setTimeout(() => {
      console.log("➡️ Redirecting to main.html");
      window.location.href = "main.html";
    }, 400);
  }
});
