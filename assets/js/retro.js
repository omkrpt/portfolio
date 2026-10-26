/* Small, dependency-free interactions for the retro portfolio. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (menu && nav) {
    menu.hidden = false;
    const closeMenu = () => {
      menu.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };
    menu.addEventListener('click', () => {
      const isOpen = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        menu.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header') || event.target.closest('a')) closeMenu();
    });
  }

  const filters = document.querySelector('.project-filters');
  const projects = [...document.querySelectorAll('.project-card')];
  const count = document.getElementById('project-count');
  const showCategory = category => {
    let visible = 0;
    projects.forEach(project => {
      project.hidden = category !== 'all' && project.dataset.category !== category;
      if (!project.hidden) visible += 1;
    });
    filters?.querySelectorAll('button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    });
    if (count) count.textContent = `Showing ${visible} ${visible === 1 ? 'project' : 'projects'}`;
  };
  if (filters) {
    filters.hidden = false;
    filters.addEventListener('click', event => {
      const button = event.target.closest('button[data-filter]');
      if (button) showCategory(button.dataset.filter);
    });
  }

  // Preserve direct links to a project, even after filtering the archive.
  const revealHashTarget = () => {
    const fragment = location.hash.slice(1);
    let targetId = fragment;
    try {
      targetId = decodeURIComponent(fragment);
    } catch {
      // An incomplete escape in a shared URL must not stop the other controls.
    }
    const target = document.getElementById(targetId);
    if (target?.classList.contains('project-card') && target.hidden) {
      showCategory('all');
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    }
  };
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();

  // A local HTML file cannot supply YouTube's required HTTP referrer.
  if (window.location.protocol === 'file:') {
    const video = document.getElementById('snakevid');
    const link = document.querySelector('#snake .video-link a');
    if (video && link) {
      const preview = link.cloneNode(true);
      preview.className = 'video-preview';
      preview.innerHTML = '<span class="video-preview-play" aria-hidden="true">&#9654;</span>' +
        '<span class="video-preview-title">Watch Snake on YouTube</span>' +
        '<span class="video-preview-note">Opens in a new tab</span>';
      video.replaceWith(preview);
      link.parentElement.hidden = true;
    }
  }

  const sections = [...document.querySelectorAll('main > section[id]')];
  if ('IntersectionObserver' in window && nav) {
    const visibleSections = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      });
      const currentSection = sections.find(section => visibleSections.has(section));
      if (!currentSection) return;
      nav.querySelectorAll('a[href^="#"]').forEach(link => {
        if (link.hash === '#' + currentSection.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
