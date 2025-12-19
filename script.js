/* ===== PORTFOLIO ANIMATIONS & INTERACTIONS ===== */

document.addEventListener("DOMContentLoaded", () => {
  initDeepSpaceBackground()
  initScrollReveal()
  initSmoothScroll()
  initNavActiveState()
  initMobileMenu()
  initLetterHover()
})

/* ===== DEEP SPACE BACKGROUND WITH NEBULA & STARS ===== */
function initDeepSpaceBackground() {
  // Create small stars
  const starsSmall = document.getElementById("starsSmall")
  if (starsSmall) {
    for (let i = 0; i < 150; i++) {
      const star = document.createElement("div")
      star.className = "star star-small"
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 4}s`
      starsSmall.appendChild(star)
    }
  }

  // Create medium stars
  const starsMedium = document.getElementById("starsMedium")
  if (starsMedium) {
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div")
      star.className = "star star-medium"
      if (Math.random() > 0.7) star.classList.add("star-colored")
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 3}s`
      starsMedium.appendChild(star)
    }
  }

  // Create large bright stars
  const starsLarge = document.getElementById("starsLarge")
  if (starsLarge) {
    for (let i = 0; i < 30; i++) {
      const star = document.createElement("div")
      const colorClass = Math.random() > 0.6 ? (Math.random() > 0.5 ? "star-colored" : "star-purple") : ""
      star.className = `star star-large ${colorClass}`
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 2.5}s`
      starsLarge.appendChild(star)
    }
  }

  // Create floating dust particles
  const dustContainer = document.getElementById("dustContainer")
  if (dustContainer) {
    for (let i = 0; i < 50; i++) {
      const dust = document.createElement("div")
      dust.className = "dust-particle"
      dust.style.left = `${Math.random() * 100}%`
      dust.style.top = `${100 + Math.random() * 20}%`
      dust.style.animationDuration = `${15 + Math.random() * 20}s`
      dust.style.animationDelay = `${Math.random() * 15}s`
      dustContainer.appendChild(dust)
    }
  }
}

/* ===== LETTER HOVER EFFECT ===== */
function initLetterHover() {
  const letters = document.querySelectorAll(".letter")
  letters.forEach((letter) => {
    letter.addEventListener("mouseenter", () => {
      letter.style.animation = "letterHover 0.3s forwards"
    })
    letter.addEventListener("animationend", (e) => {
      if (e.animationName === "letterHover") {
        letter.style.animation = ""
      }
    })
  })
}

/* ===== SCROLL REVEAL ANIMATION ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal-up")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  reveals.forEach((el) => observer.observe(el))

  // Trigger hero elements immediately
  document.querySelectorAll(".hero .reveal-up").forEach((el) => {
    setTimeout(() => el.classList.add("visible"), 100)
  })
}

/* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const navHeight = document.querySelector(".nav").offsetHeight
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        document.querySelector(".nav-list")?.classList.remove("active")
      }
    })
  })
}

/* ===== ACTIVE NAV STATE ON SCROLL ===== */
function initNavActiveState() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active")
            }
          })
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: "-100px 0px -50% 0px",
    },
  )

  sections.forEach((section) => observer.observe(section))
}

/* ===== MOBILE MENU TOGGLE ===== */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn")
  const navList = document.querySelector(".nav-list")

  if (menuBtn && navList) {
    menuBtn.addEventListener("click", () => {
      navList.classList.toggle("active")
      menuBtn.classList.toggle("active")
    })
  }
}


/* ==========================
   🌗 LIGHT / DARK MODE
   ========================== */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle")
  const icon = toggle.querySelector("i")

  // Load saved preference
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode")
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode")

    const isLight = document.body.classList.contains("light-mode")
    localStorage.setItem("theme", isLight ? "light" : "dark")

    icon.classList.toggle("fa-sun")
    icon.classList.toggle("fa-moon")
  })
})
/* ===== GALLERY LIGHTBOX ===== */

const galleryImages = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".lightbox-close");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});
