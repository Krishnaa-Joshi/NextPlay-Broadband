// Notification
document.addEventListener("DOMContentLoaded", () => {
  if (typeof toastr !== "undefined") {
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: "toast-top-right",
      timeOut: "4000",
      extendedTimeOut: "1500",
      showDuration: "300",
      hideDuration: "300",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
});

//  PAGE LOADER
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 600);
  }, 400);
});

// LOADER 
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto") ||
    href.startsWith("tel")
  ) {
    return;
  }

  const loader = document.getElementById("page-loader");
  if (loader) {
    loader.classList.remove("hide");
  }
});

//  ACTIVE NAV LINK HIGHLIGHTING
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.getAttribute("data-page");
  if (!currentPage) return;

  document.querySelectorAll(".nav-link-custom[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("nav-active");
    }
  });
});

//  MOBILE MENU TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
});

// Faq Toggle
const faqBtns = document.querySelectorAll(".faq-btn");

if (faqBtns.length) {
  faqBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;

      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("active");
        const icon = i.querySelector(".faq-icon");
        if (icon) icon.textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("active");
      }
    });
  });
}

//  SPEED TEST MODAL
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("speedTestModal");
  const openBtn = document.getElementById("openSpeedTest");
  const openBtnMobile = document.getElementById("openSpeedTestMobile");
  const closeBtn = document.getElementById("closeSpeedTest");

  const openModal = () => {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  openBtn?.addEventListener("click", openModal);
  openBtnMobile?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);

  modal
    .querySelector(".speedtest-backdrop")
    ?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});


//  INFOGRAPHIC VIEW & DOWNLOAD
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("infographicModal");
  const modalImage = document.getElementById("infographicModalImage");
  const closeBtn = document.querySelector(".infographic-close");
  const backdrop = document.querySelector(".infographic-backdrop");

  if (!modal || !modalImage) return;

  // VIEW IMAGE
  document.querySelectorAll(".infographic-actions .view").forEach((btn) => {
    btn.addEventListener("click", () => {
      const imgSrc = btn.dataset.image;
      if (!imgSrc) return;

      modalImage.src = imgSrc;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // CLOSE MODAL
  const closeModal = () => {
    modal.classList.remove("active");
    modalImage.src = "";
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // DOWNLOAD IMAGE
  document.querySelectorAll(".infographic-actions .download").forEach((btn) => {
    btn.addEventListener("click", () => {
      const imgSrc = btn.dataset.image;
      if (!imgSrc) return;

      const link = document.createElement("a");
      link.href = imgSrc;
      link.download = imgSrc.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
});

// Form submit 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("connectionForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      mobile: form.mobile.value,
      sector: form.sector.value,
      speed: form.speed.value,
    };

    // Basic validation
    if (!data.name || !data.mobile || !data.sector || !data.speed) {
      toastr.error("Please fill all details");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/get-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toastr.success("Request submitted! Our team will contact you shortly.");
        form.reset();
      } else {
        toastr.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toastr.error("Server error. Please try again later.");
    }
  });
});

// Home page Form 
document.addEventListener("DOMContentLoaded", () => {
  const homeForm = document.getElementById("homeConnectionForm");
  if (!homeForm) return;

  homeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: homeForm.name.value,
      mobile: homeForm.mobile.value,
      sector: homeForm.sector.value,
      speed: homeForm.speed.value,
    };

    // Basic validation
    if (!data.name || !data.mobile || !data.sector || !data.speed) {
      toastr.error("Please fill all details");
      return;
    }


    try {
      const res = await fetch("http://localhost:5000/api/get-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toastr.success("Request submitted! Our team will contact you shortly.");
        homeForm.reset();
      } else {
        toastr.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toastr.error("Server error. Please try again later.");
    }
  });
});

// Account Model
document.addEventListener("DOMContentLoaded", () => {
  const accountToggle = document.getElementById("accountToggle");
  const accountModal = document.getElementById("accountModal");
  const backdrop = document.querySelector(".account-backdrop");

  if (!accountToggle || !accountModal) return;

  accountToggle.addEventListener("click", () => {
    accountModal.classList.toggle("active");
  });

  backdrop.addEventListener("click", () => {
    accountModal.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      accountModal.classList.remove("active");
    }
  });
});


// BoardOfDirector 
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".leadership-v2-track");
  const slides = document.querySelectorAll(".leadership-v2-slide");
  const prevBtn = document.getElementById("leaderPrev");
  const nextBtn = document.getElementById("leaderNext");

  if (!track || !slides.length) return;

  let index = 0;

  const updateSlide = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  });
});


// Plans Card Animation
document.addEventListener("DOMContentLoaded", () => {
  const planCards = document.querySelectorAll(".plan-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 180); // stagger delay
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  planCards.forEach((card) => observer.observe(card));
});

// About page
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".about-animate");
  if (!section) return;

  const title = section.querySelector(".about-animate-title");
  const subtitle = section.querySelector(".about-animate-subtitle");
  const cards = section.querySelectorAll(".about-animate-card");

  // Apply hidden state after JS loads
  title?.classList.add("about-hidden");
  subtitle?.classList.add("about-hidden");
  cards.forEach(card => card.classList.add("about-hidden"));

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      // Heading
      title?.classList.add("about-show");
      subtitle?.classList.add("about-show");

      // Cards stagger
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("about-show");
          card.classList.remove("about-hidden");
        }, index * 200);
      });

      observer.unobserve(section);
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
});

// Speed and Features
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".speed-animate");
  if (!section) return;

  const badge = section.querySelector(".speed-animate-badge");
  const title = section.querySelector(".speed-animate-title");
  const desc = section.querySelector(".speed-animate-desc");
  const features = section.querySelectorAll(".speed-animate-feature");
  const image = section.querySelector(".speed-animate-image");

  [badge, title, desc, image].forEach(el => el?.classList.add("speed-hidden"));
  features.forEach(f => f.classList.add("speed-hidden"));

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      badge?.classList.add("speed-show");
      title?.classList.add("speed-show");
      desc?.classList.add("speed-show");
      image?.classList.add("speed-show");

      features.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("speed-show");
          card.classList.remove("speed-hidden");
        }, i * 140);
      });

      observer.unobserve(section);
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
});

// Ott AddOn Animation
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".ott-animate");
  if (!section) return;

  const title = section.querySelector(".ott-animate-title");
  const subtitle = section.querySelector(".ott-animate-subtitle");
  const cards = section.querySelectorAll(".ott-animate-card");
  const note = section.querySelector(".ott-animate-note");

  [title, subtitle, note].forEach(el => el?.classList.add("ott-hidden"));
  cards.forEach(card => card.classList.add("ott-hidden"));

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      title?.classList.add("ott-show");
      subtitle?.classList.add("ott-show");

      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("ott-show");
          card.classList.remove("ott-hidden");
        }, index * 180);
      });

      note?.classList.add("ott-show");

      observer.unobserve(section);
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
});

// Check Availability Section Animation
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".check-animate");
  if (!section) return;

  const bg = section.querySelector(".check-animate-bg");
  const left = section.querySelector(".check-animate-left");
  const form = section.querySelector(".check-animate-form");
  const inputs = section.querySelectorAll(".check-input");
  const btn = section.querySelector(".check-animate-btn");

  [bg, left, form, btn].forEach(el => el?.classList.add("check-hidden"));

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      bg?.classList.add("check-show");
      left?.classList.add("check-show");
      form?.classList.add("check-show");

      inputs.forEach((input, i) => {
        setTimeout(() => input.classList.add("show"), i * 120);
      });

      btn?.classList.add("show");

      observer.unobserve(section);
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
});

// Call to Local Support section Animation
document.addEventListener("DOMContentLoaded", () => {
  const cta = document.querySelector(".cta-animate");
  if (!cta) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        cta.classList.add("cta-show");
        observer.unobserve(cta);
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(cta);
});

// Review Section Animation
document.addEventListener("DOMContentLoaded", () => {
  const reviewsSection = document.querySelector(".reveal-reviews");
  if (!reviewsSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        reviewsSection.classList.add("show");
        observer.unobserve(reviewsSection);
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(reviewsSection);
});

// broadband plan page hero
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".reveal-plans-hero");
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hero.classList.add("show");
        observer.unobserve(hero);
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(hero);
});

// ======== About Page ==========

// About Page Hero
document.addEventListener("DOMContentLoaded", () => {
  const aboutHero = document.querySelector(".reveal-about-hero");
  if (!aboutHero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutHero.classList.add("show");
        observer.unobserve(aboutHero);
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(aboutHero);
});

// About Netfix section
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".about-reveal-v2").forEach(section => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("show");
          observer.unobserve(section);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
  });
});


// ======== Infographic Animation ============
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".infographic-animate");
  if (!section) return;

  const header = section.querySelector(".infographic-header");
  const items = section.querySelectorAll(".infographic-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Show heading
          section.classList.add("show");

          // Stagger cards
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("show");
            }, index * 180); // stagger delay
          });

          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(section);
});


// ========= Our Team Page =============

// Hero section
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".team-hero-animate");
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hero.classList.add("show");
        observer.unobserve(hero);
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(hero);
});

// Core Values section
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".core-values-animate");
  if (!section) return;

  const items = section.querySelectorAll(".animate-item");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("show");

        items.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.12}s`;
        });

        observer.unobserve(section);
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
});

// Board of Director
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".leadership-v2-animate");
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("show");
        observer.unobserve(section);
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(section);
});

// Slide between Directors
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".leadership-v2-slide");
  const prev = document.getElementById("leaderPrev");
  const next = document.getElementById("leaderNext");

  if (!slides.length) return;

  let current = 0;

  function showSlide(index) {
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  next?.addEventListener("click", () => {
    showSlide(current + 1);
  });

  prev?.addEventListener("click", () => {
    showSlide(current - 1);
  });
});

// Careers Page
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".careers-animate");
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add("show");
        observer.unobserve(section);
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(section);
});

// ========== FAQ Page ===============
document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.querySelector(".faq-animate");
  if (!faqSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        faqSection.classList.add("show");
        observer.unobserve(faqSection);
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(faqSection);
});


// ========= Contact Page =============
document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.querySelector(".contact-animate");
  if (!contactSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        contactSection.classList.add("show");
        observer.unobserve(contactSection);
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(contactSection);
});

// =========== get Connection PAge ===============
document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".connection-left-anim");
  const form = document.querySelector(".connection-form-anim");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (left) observer.observe(left);
  if (form) observer.observe(form);
});

// ========= Login Page =============
document.addEventListener("DOMContentLoaded", () => {
  const animatedBlocks = document.querySelectorAll(
    ".login-left-anim, .login-form-anim"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  animatedBlocks.forEach((el) => observer.observe(el));
});

