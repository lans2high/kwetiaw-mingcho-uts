// Script.js untuk interaksi umum di semua halaman
console.log('✅ script.js loaded');

// Contoh: menandai link aktif di navbar
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.style.textDecoration = 'underline';
      link.style.fontWeight = 'bold';
    }
  });
});

// Contoh: scroll to top saat ganti halaman (opsional)
window.onpageshow = () => {
  window.scrollTo(0, 0);
};
