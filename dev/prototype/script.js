// OH Radical Prototype Interactive Script

document.addEventListener("DOMContentLoaded", () => {
  // --- Canvas Particle Field (Invisible Protection) ---
  const canvas = document.getElementById("particle-field");
  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  let particles = [];
  const pointer = { x: -9999, y: -9999 };

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Number of particles depends on screen size
    const count = Math.min(100, Math.floor((width * height) / 15000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: Math.random() * 2.2 + 0.4,
      alpha: Math.random() * 0.4 + 0.08,
      baseAlpha: 0,
    }));
    particles.forEach(p => p.baseAlpha = p.alpha);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      // Calculate distance to mouse pointer
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);

      // Smooth repulsion force from mouse
      if (distance < 120) {
        const force = (120 - distance) / 120;
        // Ease the movement away
        particle.x += (dx / distance) * force * 1.5;
        particle.y += (dy / distance) * force * 1.5;
        particle.alpha = particle.baseAlpha * 1.8; // Brighten near mouse
      } else {
        // Slow recovery back to base alpha
        if (particle.alpha > particle.baseAlpha) {
          particle.alpha -= 0.01;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen edges
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(115, 247, 212, ${particle.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  // Set listeners for canvas
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });
  window.addEventListener("pointerleave", () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });

  // Initialize Canvas
  resizeCanvas();
  drawParticles();

  // --- Sticky Header Scroll ---
  const header = document.querySelector("[data-header]");
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav-overlay");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

  function toggleMenu() {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
    document.body.style.overflow = isExpanded ? "" : "hidden";
  }

  hamburger.addEventListener("click", toggleMenu);
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // --- Interactive Slides (Why It Matters, 3-Zero, Technology) ---
  function setupInteractiveSection(sectionId, counterId, dotSelector, itemSelector, panelSelector) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const dots = section.querySelectorAll(dotSelector);
    const items = section.querySelectorAll(itemSelector);
    const panels = section.querySelectorAll(panelSelector);
    const counter = document.getElementById(counterId);

    let activeIndex = 0;
    const totalCount = items.length;
    let autoPlayTimer = null;

    function activateSlide(index) {
      activeIndex = index;

      // Update counters (e.g., 01/05)
      if (counter) {
        counter.textContent = `${String(activeIndex + 1).padStart(2, '0')}/${String(totalCount).padStart(2, '0')}`;
      }

      // Update active classes for dots, text items, visual panels
      dots.forEach((dot, idx) => dot.classList.toggle("active", idx === activeIndex));
      items.forEach((item, idx) => item.classList.toggle("active", idx === activeIndex));
      panels.forEach((panel, idx) => panel.classList.toggle("active", idx === activeIndex));
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        let nextIndex = (activeIndex + 1) % totalCount;
        activateSlide(nextIndex);
      }, 5500); // 5.5 seconds per slide
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    // Dot click listeners
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"), 10);
        activateSlide(index);
        startAutoPlay(); // Reset timer on manual click
      });
    });

    // Start auto cycle
    startAutoPlay();

    // Pause auto play when section is not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAutoPlay();
        } else {
          stopAutoPlay();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(section);
  }

  // Setup Section 2: Why It Matters
  setupInteractiveSection("why", "why-counter", ".threat-indicators .dot", ".threat-item", ".split-right .visual-panel");
  
  // Setup Section 3: 3-Zero System
  setupInteractiveSection("three-zero", "zero-counter", ".zero-indicators .dot", ".zero-item", "#three-zero .split-right .visual-panel");

  // Setup Section 4: Technology Preview
  setupInteractiveSection("tech", "tech-counter", ".tech-indicators .dot", ".tech-item", "#tech .split-right .visual-panel");


  // --- Counter Animations for Proof & Data (Section 5) ---
  const proofSection = document.getElementById("proof");
  const countElements = document.querySelectorAll(".count-num");
  let countsAnimated = false;

  function animateCounts() {
    if (countsAnimated) return;
    countsAnimated = true;

    countElements.forEach((el) => {
      const isInfinite = el.getAttribute("data-infinite") === "true";
      
      if (isInfinite) {
        // For Infinity symbol, count to 10 and then fade in the infinity symbol
        let current = 0;
        const timer = setInterval(() => {
          current++;
          el.textContent = current;
          if (current >= 10) {
            clearInterval(timer);
            el.textContent = "∞";
          }
        }, 80);
      } else {
        const target = parseFloat(el.getAttribute("data-target"));
        const isDecimal = target % 1 !== 0;
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease-out quad
          const easeProgress = progress * (2 - progress);
          const val = easeProgress * target;

          el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val);

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = isDecimal ? target.toFixed(1) : target;
          }
        }
        
        requestAnimationFrame(updateCount);
      }
    });
  }

  // Intersection Observer for Proof Section Counter
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounts();
      }
    });
  }, { threshold: 0.25 });
  
  if (proofSection) {
    countObserver.observe(proofSection);
  }


  // --- General Fade In on Scroll (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
});
