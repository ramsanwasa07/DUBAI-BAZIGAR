// ===================================================================
// GUJARATI TRADER (SEBI REGISTERED) - Ultra-Fast Mobile Script
// Optimized for Instant Click Open & 0-Second Delay on Slow Networks
// ===================================================================

const TG_INVITE_CODE = "StqiZxiJc1EwNzQ1";
const TG_WEB_URL = `https://t.me/+${TG_INVITE_CODE}`;
const TG_APP_URL = `tg://join?invite=${TG_INVITE_CODE}`;

// Initialize when DOM is ready, or immediately if already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

function initApp() {
  initTelegramInstantLinks();
  initFaqAccordion();
  initAudioSimulator();
  initCounters();
  initRippleEffect();
  initServiceWorker();
}

/**
 * 1. Sabhi Buttons aur CTA par click hone par INSTANT Telegram App Open karna
 * Slow 2G/3G network par bhi 0 second delay me khulta hai.
 */
function initTelegramInstantLinks() {
  const telegramButtons = document.querySelectorAll(".track-tg-btn");

  telegramButtons.forEach((btn) => {
    // Standard href rakha gaya hai taaki SEO aur fallback 100% reliable rahe
    btn.setAttribute("href", TG_WEB_URL);
    btn.setAttribute("rel", "noopener noreferrer");

    // Passive touch preconnect for ultra-fast DNS resolution
    btn.addEventListener("touchstart", prewarmConnection, { passive: true });
    btn.addEventListener("mouseenter", prewarmConnection, { passive: true });

    // Click handler with instant OS app launch
    btn.addEventListener("click", handleTelegramClick);
  });
}

let hasPrewarmed = false;
function prewarmConnection() {
  if (hasPrewarmed) return;
  hasPrewarmed = true;

  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = "https://t.me";
  document.head.appendChild(link);
}

let lastClickTime = 0;
function handleTelegramClick(e) {
  // Prevent double click within 800ms
  const now = Date.now();
  if (now - lastClickTime < 800) {
    if (e) e.preventDefault();
    return;
  }
  lastClickTime = now;

  // Haptic feedback for tactile feel on mobile
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate([25, 40, 25]);
    } catch (_) {}
  }

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS;

  if (isMobile) {
    if (e) e.preventDefault();

    // Show brief instant visual feedback on button
    const btn = e.currentTarget;
    if (btn) {
      btn.classList.add("btn-active-opening");
      setTimeout(() => btn.classList.remove("btn-active-opening"), 1500);
    }

    let appLaunched = false;
    const startTime = Date.now();

    // Agar Telegram app open ho gaya to window blur/hidden ho jayegi
    const handleVisibilityChange = () => {
      if (document.hidden || document.webkitHidden) {
        appLaunched = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, { once: true });
    window.addEventListener("pagehide", () => { appLaunched = true; }, { once: true });
    window.addEventListener("blur", () => { appLaunched = true; }, { once: true });

    // Fallback: Agar Telegram app installed nahi hai to 650ms baad web browser me open hoga
    setTimeout(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!appLaunched && Date.now() - startTime < 1600) {
        window.location.href = TG_WEB_URL;
      }
    }, 650);

    // Instant OS-level deep-link (no network wait required)
    window.location.href = TG_APP_URL;
  } else {
    // Desktop: Web link in new tab
    if (e) e.preventDefault();
    window.open(TG_WEB_URL, "_blank", "noopener,noreferrer");
  }
}

/**
 * 2. FAQ Accordion Toggle
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other open items
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
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
  if (!counters.length) return;

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
    { threshold: 0.2 }
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
      circle.style.left = `${(e.clientX || rect.left + radius) - rect.left - radius}px`;
      circle.style.top = `${(e.clientY || rect.top + radius) - rect.top - radius}px`;
      circle.classList.add("ripple-circle");

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

/**
 * 6. Register Service Worker for Instant Cache on Slow Networks
 */
function initServiceWorker() {
  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // Fallback gracefully if service worker is unsupported
      });
    });
  }
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
.btn-active-opening {
  filter: brightness(1.15) !important;
  transform: scale(0.97) !important;
  transition: transform 0.1s ease, filter 0.1s ease !important;
}
`;
document.head.appendChild(styleSheet);
