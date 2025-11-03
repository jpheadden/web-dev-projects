const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Restore previous theme
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
  }

  toggleBtn.addEventListener('click', () => {
    // Fade transition
    body.classList.add('theme-fade');
    body.offsetHeight; // force reflow so transition triggers
    body.classList.add('theme-fade-active');

    const dark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    toggleBtn.innerHTML = dark
      ? '<i class="fas fa-sun"></i> Light'
      : '<i class="fas fa-moon"></i> Dark';

    // remove fade classes after transition completes
    setTimeout(() => {
      body.classList.remove('theme-fade', 'theme-fade-active');
    }, 400);
  });