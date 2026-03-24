/**
 * Terraform Blog — script.js
 */

/* ─── READING PROGRESS BAR ─── */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
});

/* ─── BACK TO TOP ─── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── MOBILE NAV ─── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
function closeMobileNav() {
  mobileNav.classList.remove('open');
}

/* ─── ACTIVE NAV ON SCROLL ─── */
const sections = document.querySelectorAll('.blog-section');
const navLinks = document.querySelectorAll('.site-nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const active = document.querySelector(`.site-nav a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ─── SCROLL FADE IN ─── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => fadeObserver.observe(s));

/* ─── COPY CODE BUTTONS ─── */
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  // Get plain text without HTML tags
  const text = pre.innerText || pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = 'Failed';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
}
