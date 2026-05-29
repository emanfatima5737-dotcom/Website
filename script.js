
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

function addToCart(btn, name, price) {
  btn.innerHTML = '✅ Added!';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.innerHTML = '🛒 Add to Cart';
    btn.style.background = '#0a2540';
  }, 1500);
  showToast('🛒 ' + name + ' added to cart!');
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// Live Countdown Timer
const endTime = new Date().getTime() + (4 * 86400 + 13 * 3600 + 34 * 60 + 56) * 1000;

function updateCountdown() {
  if (!document.getElementById('cd-days')) return;
  const now = new Date().getTime();
  let diff = Math.max(0, endTime - now);

  const days = Math.floor(diff / 86400000); diff %= 86400000;
  const hrs  = Math.floor(diff / 3600000);  diff %= 3600000;
  const mins = Math.floor(diff / 60000);    diff %= 60000;
  const secs = Math.floor(diff / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hrs').textContent  = String(hrs).padStart(2,'0');
  document.getElementById('cd-min').textContent  = String(mins).padStart(2,'0');
  document.getElementById('cd-sec').textContent  = String(secs).padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ===== WISHLIST (listing cards) =====
document.querySelectorAll('.lst-wish, .wish-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.innerHTML === '♡') {
      this.innerHTML = '❤️';
      this.style.color = '#ef4444';
    } else {
      this.innerHTML = '♡';
      this.style.color = '';
    }
  });
});

// ===== BUY NOW TOAST =====
document.querySelectorAll('.lst-buy-btn, .buy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const name = this.closest('.lst-card, .listing-card')
      ?.querySelector('.lst-prod-name, h3')?.textContent || 'Item';
    showToast('✅ ' + name.substring(0, 30) + '... added!');
    this.textContent = '✅ Added!';
    this.style.background = '#22c55e';
    setTimeout(() => {
      this.textContent = 'Buy now';
      this.style.background = '';
    }, 1500);
  });
});

// ===== FILTER TAGS X BUTTON =====
document.querySelectorAll('.lst-remove').forEach(btn => {
  btn.addEventListener('click', function() {
    this.closest('.lst-filter-tag').remove();
  });
});

document.querySelector('.lst-clear-btn')?.addEventListener('click', function() {
  document.querySelectorAll('.lst-filter-tag').forEach(tag => tag.remove());
  this.style.display = 'none';
});

// ===== LOAD MORE =====
const allCards = document.querySelectorAll('.lst-card');
let visibleCount = 6;
allCards.forEach((card, i) => {
  if (i >= visibleCount) card.style.display = 'none';
});

document.querySelector('.lst-load-btn')?.addEventListener('click', function() {
  let count = 0;
  allCards.forEach((card, i) => {
    if (i >= visibleCount && count < 3) {
      card.style.display = 'block';
      card.style.animation = 'fadeUp 0.4s ease both';
      count++;
    }
  });
  visibleCount += 3;
  if (visibleCount >= allCards.length) {
    this.textContent = 'No more items';
    this.disabled = true;
    this.style.opacity = '0.5';
  }
});

// ===== PRICE RANGE SLIDER =====
const slider = document.querySelector('.lst-col-body input[type="range"], input[type="range"]');
if (slider) {
  const display = document.createElement('p');
  display.style.cssText = 'font-weight:600;color:#0a2540;margin-top:6px;font-size:14px;';
  display.textContent = 'Max: $' + slider.value;
  slider.parentNode.insertBefore(display, slider.nextSibling);
  slider.addEventListener('input', function() {
    display.textContent = 'Max: $' + this.value;
  });
}
