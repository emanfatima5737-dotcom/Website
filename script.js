function updateBodyPadding() {
  const header = document.querySelector('.site-header');
  if (header) {
    const bodyPadding = header.offsetHeight + 20;
    document.body.style.paddingTop = bodyPadding + 'px';
  }
}

// Initialize on load & resize
window.addEventListener('load', updateBodyPadding);
window.addEventListener('resize', updateBodyPadding);

// Mobile Search Toggle
function toggleMobileSearch() {
  const ms = document.getElementById('mobileSearch');
  ms.style.display = ms.style.display === 'block' ? 'none' : 'block';
  setTimeout(updateBodyPadding, 50);
}

// Category functions
function toggleCat() {
  document.getElementById('catBtn').classList.toggle('open');
  document.getElementById('catMenu').classList.toggle('open');
}

function toggleCat2() {
  document.getElementById('catBtn2').classList.toggle('open');
  document.getElementById('catMenu2').classList.toggle('open');
}

function selectCat(el) {
  document.getElementById('catBtn').childNodes[0].textContent = el.innerText.trim() + ' ';
  toggleCat();
}

function selectCat2(el) {
  document.getElementById('catBtn2').childNodes[0].textContent = el.innerText.trim() + ' ';
  toggleCat2();
}

// Close dropdowns on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.cat-dropdown')) {
    document.querySelectorAll('.cat-menu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('open'));
  }
});