// TERESA TURÉGANO — interacciones
(function () {
  // Intro de carga (solo en la home)
  const intro = document.querySelector('.intro');
  if (intro) {
    let seen = false;
    try { seen = sessionStorage.getItem('tt-intro') === '1'; } catch (e) {}
    if (seen) {
      intro.remove();
    } else {
      document.body.classList.add('is-loading');
      const finish = () => {
        intro.classList.add('is-done');
        document.body.classList.remove('is-loading');
        try { sessionStorage.setItem('tt-intro', '1'); } catch (e) {}
        setTimeout(() => intro.remove(), 1000);
      };
      const minTime = new Promise(r => setTimeout(r, 2600));
      const loaded = new Promise(r => {
        if (document.readyState === 'complete') r();
        else window.addEventListener('load', r, { once: true });
      });
      // espera al logo + carga de la página (máx. 5 s)
      Promise.race([Promise.all([minTime, loaded]), new Promise(r => setTimeout(r, 5000))]).then(finish);
    }
  }

  // Cabecera: pasa a sólida al salir del vídeo
  const header = document.querySelector('.header--over');
  const hero = document.querySelector('.hero');
  if (header && hero) {
    const onScroll = () => header.classList.toggle('is-solid', window.scrollY > hero.offsetHeight - 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Vídeo: asegura reproducción en móvil
  const video = document.querySelector('.hero video');
  if (video) {
    video.muted = true;
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
    video.addEventListener('error', () => video.remove(), true);
  }

  // Aparición al hacer scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-in'));
  }

  // Carruseles laterales (Emestudios)
  document.querySelectorAll('.subblock').forEach(block => {
    const rail = block.querySelector('.rail');
    const btns = block.querySelectorAll('.rail-btn');
    if (!rail || !btns.length) return;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      btns[0].disabled = rail.scrollLeft <= 2;
      btns[1].disabled = rail.scrollLeft >= max;
    };
    btns.forEach(b => b.addEventListener('click', () => {
      rail.scrollBy({ left: Number(b.dataset.dir) * rail.clientWidth, behavior: 'smooth' });
    }));
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // Año en el pie
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
