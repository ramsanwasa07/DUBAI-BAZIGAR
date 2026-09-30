// ===================================================================
// DUBAI BAZIGAR - Interactive High-Converting Landing Page Script
// ===================================================================

// 🔗 TARGET LINK: Click karne par yeh link open hoga
const TARGET_LINK = "https://t.me/+StqiZxiJc1EwNzQ1";

document.addEventListener("DOMContentLoaded", () => {
  initTelegramLinks();
  initFaqAccordion();
  initAudioSimulator();
  initCounters();
  initRippleEffect();
});

/**
 * 1. Sabhi Buttons aur CTA par click hone par Link Open karna
 */
function initTelegramLinks() {
  const telegramButtons = document.querySelectorAll(".track-tg-btn");

  telegramButtons.forEach((btn) => {
    // Ensure href is set properly
    btn.setAttribute("href", TARGET_LINK);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");

    btn.addEventListener("click", (e) => {
      // Optional analytics / tracking event could go here
      console.log("🔗 User clicked CTA -> Opening target link:", TARGET_LINK);
      // Small tactile vibration on mobile devices that support it
      if ("vibrate" in navigator) {
        navigator.vibrate(30);
      }
    });
  });
}

/**
 * 2. FAQ Accordion Toggle
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other open items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * 3. Interactive Voice Note Simulator (Audio Player Demo)
 */
function initAudioSimulator() {
  const playBtn = document.getElementById("audioPlayBtn");
  const playerDemo = document.getElementById("audioPlayerDemo");
  const audioTimer = document.getElementById("audioTimer");

  if (!playBtn || !playerDemo || !audioTimer) return;

  let isPlaying = false;
  let currentSeconds = 0;
  let interval = null;

  playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    isPlaying = !isPlaying;

    if (isPlaying) {
      playerDemo.classList.add("audio-playing");
      playBtn.innerHTML = "❚❚"; // Pause icon
      playBtn.style.background = "#ffd700";

      // Increment simulated audio timer
      interval = setInterval(() => {
        currentSeconds++;
        const mins = Math.floor(currentSeconds / 60);
        const secs = currentSeconds % 60;
        const formatted = `${mins}:${secs < 10 ? "0" : ""}${secs} Playing...`;
        audioTimer.textContent = formatted;

        if (currentSeconds >= 45) {
          resetAudio();
        }
      }, 1000);
    } else {
      pauseAudio();
    }
  });

  function pauseAudio() {
    isPlaying = false;
    playerDemo.classList.remove("audio-playing");
    playBtn.innerHTML = '<span class="play-icon">▶</span>';
    playBtn.style.background = "#00ff88";
    clearInterval(interval);
    audioTimer.textContent = "0:42 Gujarati Audio Guide";
  }

  function resetAudio() {
    currentSeconds = 0;
    pauseAudio();
  }
}

/**
 * 4. Animated Stats Counter (Triggered when scrolled into view)
 */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const isPercent = counter.textContent.includes("%");
            const isPlus = counter.textContent.includes("+");
            let count = 0;
            const step = target / 40;

            const timer = setInterval(() => {
              count += step;
              if (count >= target) {
                count = target;
                clearInterval(timer);
              }
              if (isPercent) {
                counter.textContent = count.toFixed(1) + "%";
              } else if (isPlus) {
                counter.textContent = Math.floor(count) + (target > 50 ? "K+" : "+ Yrs");
              }
            }, 30);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const heroSection = document.getElementById("hero");
  if (heroSection) {
    observer.observe(heroSection);
  }
}

/**
 * 5. Interactive Click Ripple Effect for Buttons
 */
function initRippleEffect() {
  const buttons = document.querySelectorAll(".btn-mega-telegram, .btn-gold-action, .btn-card-action, .btn-floating-join");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;
      const rect = btn.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple-circle");

      // Inject custom inline style for ripple animation
      circle.style.position = "absolute";
      circle.style.borderRadius = "50%";
      circle.style.background = "rgba(255, 255, 255, 0.4)";
      circle.style.transform = "scale(0)";
      circle.style.animation = "rippleAnim 600ms linear";
      circle.style.pointerEvents = "none";

      const ripple = btn.querySelector(".ripple-circle");
      if (ripple) {
        ripple.remove();
      }

      btn.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    });
  });
}

// Add CSS keyframe dynamically for ripple animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes rippleAnim {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;
document.head.appendChild(styleSheet);
