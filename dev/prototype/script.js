// OH Radical Prototype Interactive Script (v2.0)

document.addEventListener("DOMContentLoaded", () => {
  // --- Canvas Particle Field (Clean Air Flows) ---
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

    // Subtle particles count based on screen size
    const count = Math.min(60, Math.floor((width * height) / 25000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.2 + 0.05,
      baseAlpha: 0,
    }));
    particles.forEach(p => p.baseAlpha = p.alpha);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      // Gentle movement interaction with mouse pointer
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        particle.x += (dx / distance) * force * 1.2;
        particle.y += (dy / distance) * force * 1.2;
        particle.alpha = particle.baseAlpha * 1.6;
      } else {
        if (particle.alpha > particle.baseAlpha) {
          particle.alpha -= 0.005;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Screen boundary wrap
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      // Soft Mint Active Dispersal Particles Color
      ctx.fillStyle = `rgba(46, 201, 160, ${particle.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });
  window.addEventListener("pointerleave", () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });

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

  // --- Interactive Slides (Why Clean Air & Technology Preview) ---
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
      if (counter) {
        counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(totalCount).padStart(2, '0')}`;
      }
      dots.forEach((dot, idx) => dot.classList.toggle("active", idx === activeIndex));
      items.forEach((item, idx) => item.classList.toggle("active", idx === activeIndex));
      panels.forEach((panel, idx) => panel.classList.toggle("active", idx === activeIndex));
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        let nextIndex = (activeIndex + 1) % totalCount;
        activateSlide(nextIndex);
      }, 5500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"), 10);
        activateSlide(index);
        startAutoPlay();
      });
    });

    startAutoPlay();

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

  // Setup Section 3: Why Clean Air
  setupInteractiveSection("why", "why-counter", ".threat-indicators .dot", ".threat-item", "#why .split-right .visual-panel");
  
  // Setup Section 4: Technology Preview
  setupInteractiveSection("tech", "tech-counter", ".tech-indicators .dot", ".tech-item", "#tech .split-right .visual-panel");


  // --- Solutions Horizontal Slider & Tabs (Section 5) ---
  const slider = document.getElementById("solutions-slider");
  const slides = document.querySelectorAll(".solution-slide");
  const tabs = document.querySelectorAll(".sol-tab");
  const btnNext = document.getElementById("slider-btn-next");
  let activeSlideIndex = 0;

  function updateSlider(index) {
    activeSlideIndex = index;
    
    // Slide transition offset calculation
    const gap = 16;
    const slideWidth = slides[0].offsetWidth;
    const offset = -(slideWidth + gap) * activeSlideIndex;
    
    slider.style.transform = `translateX(${offset}px)`;

    // Update active classes
    slides.forEach((slide, idx) => slide.classList.toggle("active", idx === activeSlideIndex));
    tabs.forEach((tab, idx) => tab.classList.toggle("active", idx === activeSlideIndex));
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const index = parseInt(tab.getAttribute("data-index"), 10);
      updateSlider(index);
    });
  });

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      const nextIndex = (activeSlideIndex + 1) % slides.length;
      updateSlider(nextIndex);
    });
  }


  // --- Space Simulator Logic (Section 5.5) ---
  const simTypeBtns = document.querySelectorAll(".sim-type-btn");
  const simAreaSlider = document.getElementById("sim-area");
  const simAreaVal = document.getElementById("sim-area-val");
  const simRunBtn = document.getElementById("sim-run");
  const simResultBadge = document.getElementById("sim-result-badge");
  const simResultType = document.getElementById("sim-result-type");
  
  const valKill = document.getElementById("sim-kill");
  const valCost = document.getElementById("sim-cost");
  const valModules = document.getElementById("sim-modules");
  const valResidue = document.getElementById("sim-residue");

  let selectedType = "farm";
  let selectedTypeName = "스마트팜";

  // Type selection handler
  simTypeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      simTypeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedType = btn.getAttribute("data-type");
      selectedTypeName = btn.textContent.trim().substring(2); // Strip icon prefix
      updateResultText();
    });
  });

  // Slider update
  simAreaSlider.addEventListener("input", (e) => {
    simAreaVal.textContent = `${e.target.value} m²`;
    updateResultText();
  });

  function updateResultText() {
    simResultType.textContent = `${selectedTypeName} · ${simAreaSlider.value} m²`;
  }

  simRunBtn.addEventListener("click", () => {
    // Show Running State
    simResultBadge.textContent = "RUNNING";
    simResultBadge.style.background = "#FFC107";
    
    valKill.textContent = "Analyzing...";
    valCost.textContent = "Calculating...";
    valModules.textContent = "Estimating...";
    valResidue.textContent = "Measuring...";

    setTimeout(() => {
      const area = parseInt(simAreaSlider.value, 10);
      
      // 1. Virus Kill rate
      let killRate = "99.90%";
      if (selectedType === "hospital") killRate = "99.99%";
      else if (selectedType === "farm") killRate = "99.95%";
      
      // 2. Cost Saved (est. 12,000 KRW per m2 annually)
      const costSaved = area * 12000;
      const formattedCost = new Intl.NumberFormat('ko-KR').format(costSaved) + " 원";

      // 3. Recommended Modules (1 module covers ~60m2)
      const modules = Math.ceil(area / 60) + " EA";

      // 4. Chemical Residue
      const residue = "0.00% (Clean H<sub>2</sub>O)";

      // Update Results HUD
      valKill.textContent = killRate;
      valCost.textContent = formattedCost;
      valModules.textContent = modules;
      valResidue.innerHTML = residue;

      simResultBadge.textContent = "COMPLETE";
      simResultBadge.style.background = "var(--mint-core)";
    }, 700);
  });


  // --- Counter Animations for Proof & Data (Section 6) ---
  const proofSection = document.getElementById("proof");
  const countElements = document.querySelectorAll(".count-num");
  let countsAnimated = false;

  function animateCounts() {
    if (countsAnimated) return;
    countsAnimated = true;

    countElements.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target"));
      const isDecimal = target % 1 !== 0;
      const duration = 1500;
      const startTime = performance.now();

      function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out quad
        const easeProgress = progress * (2 - progress);
        const val = easeProgress * target;

        el.textContent = isDecimal ? val.toFixed(2) : Math.floor(val);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = isDecimal ? target.toFixed(2) : target;
        }
      }
      
      requestAnimationFrame(updateCount);
    });
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounts();
      }
    });
  }, { threshold: 0.2 });
  
  if (proofSection) {
    countObserver.observe(proofSection);
  }

  // --- General Fade In on Scroll ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));
});
