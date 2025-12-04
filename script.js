/* ===== PORTFOLIO ANIMATIONS & INTERACTIONS ===== */

document.addEventListener("DOMContentLoaded", () => {
  initStars()
  initScrollReveal()
  initSmoothScroll()
  initNavActiveState()
  initMobileMenu()
})

/* ===== ANIMATED STARS BACKGROUND ===== */
function initStars() {
  const starsContainer = document.getElementById("stars")
  if (!starsContainer) return

  const starCount = window.innerWidth < 768 ? 30 : 60

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div")
    star.className = `star ${Math.random() > 0.8 ? "large" : ""}`
    star.style.left = `${Math.random() * 100}%`
    star.style.top = `${Math.random() * 100}%`
    star.style.setProperty("--duration", `${2 + Math.random() * 4}s`)
    star.style.animationDelay = `${Math.random() * 3}s`
    starsContainer.appendChild(star)
  }
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
