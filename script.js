// ========== NAVBAR SCROLL SHADOW ==========
const navbar = document.querySelector('.navbar');

function handleNavScroll() {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);
handleNavScroll();

// ========== MOBILE NAV TOGGLE ==========
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ========== SMOOTH SCROLL WITH OFFSET ==========
const navHeight = 72;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset - navHeight + 4;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  });
});

// ========== REVEAL ON SCROLL ==========
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// ========== SIMPLE PARALLAX FOR HERO CONTENT ==========
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

function handleParallax() {
  if (!hero || !heroContent) return;
  const rect = hero.getBoundingClientRect();
  const progress =
    1 - Math.max(0, rect.bottom) / (window.innerHeight + rect.height);
  const translate = progress * 18;
  heroContent.style.transform = `translateY(${translate}px)`;
}

window.addEventListener('scroll', handleParallax);

// ========== STORY IMAGE SCALE ON SCROLL ==========
const storyImage = document.getElementById('story-image');
let storyImageTicking = false;

function updateStoryImageScale() {
  if (!storyImage) return;

  const rect = storyImage.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  const elementCenter = rect.top + rect.height / 2;
  const viewportCenter = windowHeight / 2;

  const distance = Math.abs(elementCenter - viewportCenter);
  const maxDistance = windowHeight * 0.8;
  const normalized = Math.min(distance / maxDistance, 1);

  const maxScale = 1.15;
  const minScale = 0.8;
  const scale = maxScale - normalized * (maxScale - minScale);

  storyImage.style.transform = `scale(${scale})`;
  storyImageTicking = false;
}

if (storyImage) {
  updateStoryImageScale();

  window.addEventListener('scroll', () => {
    if (!storyImageTicking) {
      storyImageTicking = true;
      requestAnimationFrame(updateStoryImageScale);
    }
  });
}

// ========== CONTACT FORM (FAKE HANDLER) ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Thanks! Your message has been received.';
    contactForm.reset();
    setTimeout(() => {
      formStatus.textContent = '';
    }, 4000);
  });
}