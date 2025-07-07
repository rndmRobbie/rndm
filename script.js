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

  const bootText = bootTextLines.join("\n").replace(/\r?\n/g, "\n").trim();
  const bootChars = [...bootText];

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
    const output = Array(bootChars.length).fill("");
    let currentIndex = 0;

    function updateDisplay() {
      const result = output.join("");
      target.innerHTML = result + '<span class="cursor">█</span>';
      target.setAttribute("data-content", result + "█");
      console.log(`🔤 Progress: ${currentIndex}/${bootChars.length}`);
    }

    function scrambleChar(pos, realChar) {
      if (typeof realChar === "undefined") {
        console.error("🚨 Invalid character at position:", pos);
        return;
      }

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
          if (currentIndex < bootChars.length) {
            setTimeout(() => scrambleChar(currentIndex, bootChars[currentIndex]), 1);
          } else {
            console.log("✅ Boot text complete [final character resolved]");
            closeOverlay();
          }
        }
      }, 15);
    }

    if (bootChars.length > 0) {
      target.textContent = "";
      scrambleChar(0, bootChars[0]);
    } else {
      console.error("❌ Boot text is empty");
    }
  }

  function closeOverlay() {
    console.log("⚡ Initiating screen flash");
    const flash = document.querySelector(".boot-flash");
    if (flash) {
      flash.classList.add("active");
    } else {
      console.error("❌ Flash element not found");
    }

    setTimeout(() => {
      console.log("➡️ Redirecting to main.html");
      window.location.href = "main.html";
    }, 400);
  }
});
