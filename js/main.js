/* ===== ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ===== */
const sections = document.querySelectorAll("section, .card");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});


/* ===== ПАРАЛЛАКС ДЛЯ ИЗОБРАЖЕНИЯ ===== */
const planeImage = document.querySelector(".image img");

window.addEventListener("scroll", () => {
  if (!planeImage) return;

  const scrollY = window.scrollY;
  planeImage.style.transform = `translateY(${scrollY * 0.08}px) scale(1.03)`;
});


/* ===== ЭФФЕКТ «СВЕТА» НА КАРТОЧКАХ ===== */
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(9,132,227,0.15),
        white 60%
      )
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "white";
  });
});


/* ===== АНИМАЦИЯ ЦИФР (Mach 6) ===== */
function animateNumber(element, target) {
  let current = 0;
  const speed = target / 60;

  const interval = setInterval(() => {
    current += speed;
    if (current >= target) {
      element.textContent = target;
      clearInterval(interval);
    } else {
      element.textContent = current.toFixed(1);
    }
  }, 20);
}

const machText = document.querySelector(".card b");

if (machText && machText.textContent.includes("Mach")) {
  const span = document.createElement("span");
  span.textContent = "0";
  machText.innerHTML = "Mach ";
  machText.appendChild(span);

  animateNumber(span, 6);
}


/* =====================
   SR-72 FLYBY ANIMATION
===================== */
(() => {
  const prefersReducedMotion = matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  const plane = document.querySelector(".sr72-fly");
  if (!plane) return;

  let hasFlown = false;

  const triggerFlyby = () => {
    if (hasFlown) return;
    hasFlown = true;

    plane.style.animation = "sr72Fly 2.4s cubic-bezier(.4,.0,.2,1) forwards";

    setTimeout(() => {
      plane.remove();
    }, 2600);
  };

  // Запуск при скролле
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      triggerFlyby();
    }
  });
})();


// === ТВОЙ ОСНОВНОЙ КОД (оставляем) ===
(() => {
  "use strict";

  // fade, reveal, cards и т.д.
})();


// === SR-72 FLYBY + КОНДЕНСАТ (оставляем ТОЛЬКО ЭТО) ===
document.addEventListener("DOMContentLoaded", () => {
  const plane = document.querySelector(".sr72-fly");
  const trail = document.querySelector(".contrail");

  if (!plane || !trail) return;

  let launched = false;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300 && !launched) {
      launched = true;

      plane.style.opacity = "1";
      plane.style.animation = "fly 2.5s ease-out forwards";
      trail.style.opacity = "1";
      trail.style.animation = "trail 2.8s ease-out forwards";
    }
  });
});




/* =====================
   HUD TELEMETRY
===================== */
(() => {
  const speedEl = document.getElementById("speed");
  const altEl = document.getElementById("altitude");
  const machEl = document.getElementById("mach");

  if (!speedEl || !altEl || !machEl) return;

  let speed = 1200;
  let altitude = 18000;
  let mach = 2.5;

  setInterval(() => {
    speed += Math.random() * 40;
    altitude += Math.random() * 120;
    mach = speed / 1225;

    speedEl.textContent = Math.floor(speed);
    altEl.textContent = Math.floor(altitude);
    machEl.textContent = mach.toFixed(2);
  }, 500);
})();



/* =====================
   HUD WARNINGS SYSTEM
===================== */
(() => {
  const warning = document.getElementById("hudWarning");
  const lock = document.getElementById("hudLock");

  if (!warning || !lock) return;

  let warningShown = false;
  let lockShown = false;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    // WARNING — раннее обнаружение
    if (y > 400 && !warningShown) {
      warningShown = true;
      warning.style.opacity = "1";

      setTimeout(() => {
        warning.style.opacity = "0";
      }, 4000);
    }

    // LOCK — позднее, жёстко
    if (y > 800 && !lockShown) {
      lockShown = true;
      lock.style.opacity = "1";

      setTimeout(() => {
        lock.style.opacity = "0";
      }, 3500);
    }
  });
})();


/* =====================
   NAVIGATION SCROLL
===================== */
(() => {
  const links = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section");

  // Плавный скролл
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Подсветка активного раздела
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
})();



