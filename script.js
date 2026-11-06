(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('is-open')));
  }

  const whatsappPickers = [...document.querySelectorAll('[data-whatsapp-picker]')];
  const closeWhatsappMenus = () => {
    whatsappPickers.forEach((picker) => {
      const toggle = picker.querySelector('[data-whatsapp-toggle]');
      const menu = picker.querySelector('[data-whatsapp-menu]');
      menu?.setAttribute('hidden', '');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  };
  whatsappPickers.forEach((picker) => {
    const toggle = picker.querySelector('[data-whatsapp-toggle]');
    const menu = picker.querySelector('[data-whatsapp-menu]');
    toggle?.addEventListener('click', (event) => {
      event.stopPropagation();
      const isClosed = menu?.hasAttribute('hidden');
      closeWhatsappMenus();
      if (isClosed) {
        menu?.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-whatsapp-picker]')) closeWhatsappMenus();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeWhatsappMenus();
  });

  const modal = document.querySelector('[data-modal]');
  const modalImage = modal?.querySelector('[data-modal-image]');
  const modalCaption = modal?.querySelector('[data-modal-caption]');
  const galleryItems = [...document.querySelectorAll('[data-gallery-item]')];
  let activeIndex = 0;

  const updateModal = () => {
    const item = galleryItems[activeIndex];
    if (!item || !modalImage) return;
    modalImage.src = item.dataset.full || item.querySelector('img')?.src || '';
    modalImage.alt = item.querySelector('img')?.alt || '';
    if (modalCaption) modalCaption.textContent = item.dataset.caption || modalImage.alt;
  };

  const openModal = (index) => {
    if (!modal || !galleryItems.length) return;
    activeIndex = index;
    updateModal();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  galleryItems.forEach((item, index) => item.addEventListener('click', () => openModal(index)));
  modal?.querySelector('[data-modal-close]')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  modal?.querySelector('[data-modal-prev]')?.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModal();
  });
  modal?.querySelector('[data-modal-next]')?.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % galleryItems.length;
    updateModal();
  });

  document.addEventListener('keydown', (event) => {
    if (!modal?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') modal.querySelector('[data-modal-prev]')?.click();
    if (event.key === 'ArrowRight') modal.querySelector('[data-modal-next]')?.click();
  });

  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
})();
