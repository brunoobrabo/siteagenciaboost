const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const cursorGlow = document.querySelector('.cursor-glow');
const leadForm = document.querySelector('#leadForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const magneticItems = document.querySelectorAll('.magnetic');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach((section) => navObserver.observe(section));

window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
});

magneticItems.forEach((item) => {
  item.addEventListener('mousemove', (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    portfolioCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const nome = data.get('nome');
  const empresa = data.get('empresa');
  const whatsapp = data.get('whatsapp');
  const servico = data.get('servico');

  const message = `Olá, vim pelo site da Boost e gostaria de receber uma análise gratuita.%0A%0ANome: ${encodeURIComponent(nome)}%0AEmpresa: ${encodeURIComponent(empresa)}%0AWhatsApp: ${encodeURIComponent(whatsapp)}%0AServiço de interesse: ${encodeURIComponent(servico)}`;
  window.open(`https://wa.me/5561992931608?text=${message}`, '_blank', 'noopener');
});
