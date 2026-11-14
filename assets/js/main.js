/**
 * SAVANNAH RIVER ACADEMY - MODERN INTERACTION CONTROLLER
 * High-performance, Accessible, Zero-Dependency ES6 JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initTourModal();
  initProgramTabs();
  initTuitionCalculator();
  initTestimonialRotator();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER ELEVATION
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2. ACCESSIBLE MOBILE DRAWER (<dialog> top-layer pattern)
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const drawer = document.getElementById('drawer');
  const openBtn = document.getElementById('drawer-open');
  const closeBtn = document.getElementById('drawer-close');
  const sheet = drawer ? drawer.querySelector('.Drawer-sheet') : null;

  if (!drawer || !openBtn) return;

  function openDrawer() {
    drawer.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    // Lock background scrolling
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.close();
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Light dismiss: clicking on backdrop (dialog itself outside the sheet)
  drawer.addEventListener('click', (e) => {
    if (sheet && !sheet.contains(e.target)) {
      closeDrawer();
    }
  });

  // Handle escape
  drawer.addEventListener('cancel', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });

  // Close when navigation link is clicked
  drawer.querySelectorAll('.Drawer-nav a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   3. ACCESSIBLE TOUR / INQUIRY MODAL DIALOG
   -------------------------------------------------------------------------- */
function initTourModal() {
  const modal = document.getElementById('tour-modal');
  const openTriggers = document.querySelectorAll('.btn-tour-trigger');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('tour-form');
  const successBox = document.getElementById('tour-success-message');

  if (!modal) return;

  function openModal() {
    modal.showModal();
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input, select');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.close();
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Light dismiss on backdrop
  modal.addEventListener('click', (e) => {
    const card = modal.querySelector('.modal-card');
    if (card && !card.contains(e.target)) {
      closeModal();
    }
  });

  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      setTimeout(() => {
        form.style.display = 'none';
        if (successBox) {
          successBox.style.display = 'block';
        }
      }, 700);
    });
  }
}

/* --------------------------------------------------------------------------
   4. ACADEMIC PROGRAM PATHWAY TABS
   -------------------------------------------------------------------------- */
const PROGRAM_DATA = {
  nest: {
    tag: 'Early Childhood • Ages 3 – 4',
    title: 'The Nest: From Wonder to Wisdom',
    desc: 'Research proves that 80% of brain development occurs before age five. The Nest honors this vital window with a joyful, nature-immersed early childhood program where curiosity and multi-sensory discovery flourish.',
    features: [
      'Outdoor exploration & nature classroom daily',
      'Small group sensory & language foundations',
      'Play-based cognitive & motor development',
      'Experienced early childhood specialists'
    ],
    image: 'assets/images/nest-prek.jpg',
    ctaLink: 'academics.html#the-nest',
    ctaText: 'Explore The Nest Curriculum'
  },
  primary: {
    tag: 'Kindergarten through 5th Grade',
    title: 'Primary Academy: 8:1 Student-to-Teacher Ratio',
    desc: 'Our signature 8:1 ratio means zero children are left behind or held back. Grounded in the Science of Reading, our structured literacy and conceptual math empower young minds with unbreakable academic confidence.',
    features: [
      'Unmatched 8:1 student-to-teacher ratio',
      'Grounded in the Science of Reading & structured literacy',
      'Singapore Math & conceptual problem-solving',
      'Daily art, music, physical movement & outdoor STEM'
    ],
    image: 'assets/images/primary-classroom.jpg',
    ctaLink: 'academics.html#primary',
    ctaText: 'Explore Primary Academy'
  },
  middle: {
    tag: 'Grades 6 through 8',
    title: 'Middle School: Discovery, Rigor & Leadership',
    desc: 'Middle schoolers thrive when given agency and purpose. SRA middle school combines rigorous core preparation with expansive real-world expeditions, lab science, and leadership mentorship.',
    features: [
      'Integrated laboratory science & advanced mathematics',
      'Annual academic travel expeditions (Space Camp, DC, Coastal ecology)',
      'Competitive athletics, debate & student leadership',
      'High school preparatory coaching & executive function skills'
    ],
    image: 'assets/images/middle-school-students.jpg',
    ctaLink: 'academics.html#middle-school',
    ctaText: 'Explore Middle School'
  },
  dyslexia: {
    tag: 'Specialized Reading Intervention',
    title: 'Dyslexia & Specialized Literacy Center',
    desc: 'Dyslexia is not a deficit of intelligence; it is a neurological gift that requires a specific key. SRA provides certified Orton-Gillingham 1-on-1 and small-group tutoring embedded directly within the school day.',
    features: [
      'Certified Orton-Gillingham practitioners',
      'Explicit, multi-sensory, systematic phonics instruction',
      'Eliminates after-school tutoring commute for busy parents',
      'Georgia Special Needs Scholarship (GSNS) approved provider'
    ],
    image: 'assets/images/dyslexia-tutoring.jpg',
    ctaLink: 'academics.html#dyslexia',
    ctaText: 'Learn About Dyslexia Tutoring'
  }
};

function initProgramTabs() {
  const tabs = document.querySelectorAll('.program-tab-btn');
  const tagEl = document.getElementById('prog-tag');
  const titleEl = document.getElementById('prog-title');
  const descEl = document.getElementById('prog-desc');
  const featuresList = document.getElementById('prog-features');
  const imgEl = document.getElementById('prog-img');
  const ctaEl = document.getElementById('prog-cta');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const progKey = tab.dataset.program;
      const data = PROGRAM_DATA[progKey];
      if (!data) return;

      // Animate transition
      const card = document.querySelector('.program-content-card');
      if (card) card.style.opacity = '0.5';

      setTimeout(() => {
        if (tagEl) tagEl.textContent = data.tag;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (imgEl) {
          imgEl.src = data.image;
          imgEl.alt = data.title;
        }
        if (ctaEl) {
          ctaEl.href = data.ctaLink;
          ctaEl.textContent = data.ctaText;
        }

        if (featuresList) {
          featuresList.innerHTML = data.features.map(f => `
            <div class="program-feature-item">
              <span class="feature-check">✓</span>
              <span>${f}</span>
            </div>
          `).join('');
        }

        if (card) card.style.opacity = '1';
      }, 150);
    });
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE TUITION & SCHOLARSHIP CALCULATOR
   -------------------------------------------------------------------------- */
const TUITION_RATES = {
  nest: { name: 'The Nest (Pre-K 3/4)', base: 9800, monthly: 980 },
  primary: { name: 'Primary Academy (K–5th)', base: 10400, monthly: 1040 },
  middle: { name: 'Middle School (6th–8th)', base: 10950, monthly: 1095 }
};

const SCHOLARSHIPS = {
  none: { name: 'None Selected', amount: 0 },
  goal: { name: 'Georgia GOAL Tax Credit Scholarship', amount: 3500 },
  gsns: { name: 'Georgia Special Needs Scholarship (GSNS)', amount: 4500 },
  multi: { name: 'Sibling Enrollment (10% discount)', amount: 1040 }
};

function initTuitionCalculator() {
  const gradeInputs = document.querySelectorAll('input[name="calc-grade"]');
  const aidSelect = document.getElementById('calc-aid-select');
  const dyslexiaCheckbox = document.getElementById('calc-dyslexia');

  const baseDisp = document.getElementById('calc-disp-base');
  const aidDisp = document.getElementById('calc-disp-aid');
  const dyslexiaDisp = document.getElementById('calc-disp-dyslexia');
  const dyslexiaRow = document.getElementById('calc-row-dyslexia');
  const annualTotalDisp = document.getElementById('calc-disp-annual');
  const monthlyTotalDisp = document.getElementById('calc-disp-monthly');

  if (!gradeInputs.length || !annualTotalDisp) return;

  function calculate() {
    let selectedGrade = 'primary';
    gradeInputs.forEach(input => {
      if (input.checked) selectedGrade = input.value;
    });

    const gradeData = TUITION_RATES[selectedGrade] || TUITION_RATES.primary;
    const aidKey = aidSelect ? aidSelect.value : 'none';
    const aidData = SCHOLARSHIPS[aidKey] || SCHOLARSHIPS.none;
    const hasDyslexia = dyslexiaCheckbox ? dyslexiaCheckbox.checked : false;
    const dyslexiaFee = hasDyslexia ? 3800 : 0;

    const grossTuition = gradeData.base + dyslexiaFee;
    const netAnnual = Math.max(0, grossTuition - aidData.amount);
    const netMonthly = Math.round(netAnnual / 10);

    // Update Display
    if (baseDisp) baseDisp.textContent = `$${gradeData.base.toLocaleString()}`;
    if (aidDisp) {
      aidDisp.textContent = aidData.amount > 0 ? `-$${aidData.amount.toLocaleString()}` : '$0';
    }

    if (dyslexiaRow && dyslexiaDisp) {
      if (hasDyslexia) {
        dyslexiaRow.style.display = 'flex';
        dyslexiaDisp.textContent = `+$${dyslexiaFee.toLocaleString()}`;
      } else {
        dyslexiaRow.style.display = 'none';
      }
    }

    if (annualTotalDisp) annualTotalDisp.textContent = `$${netAnnual.toLocaleString()}`;
    if (monthlyTotalDisp) monthlyTotalDisp.textContent = `$${netMonthly.toLocaleString()}`;
  }

  gradeInputs.forEach(input => input.addEventListener('change', calculate));
  if (aidSelect) aidSelect.addEventListener('change', calculate);
  if (dyslexiaCheckbox) dyslexiaCheckbox.addEventListener('change', calculate);

  calculate();
}

/* --------------------------------------------------------------------------
   6. TESTIMONIAL ROTATOR (SUBTLE AUTO-CYCLE)
   -------------------------------------------------------------------------- */
function initTestimonialRotator() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (cards.length < 2) return;

  let current = 0;
  // Accessible hover pause
  let isPaused = false;
  const container = document.querySelector('.testimonials-grid');
  if (container) {
    container.addEventListener('mouseenter', () => isPaused = true);
    container.addEventListener('mouseleave', () => isPaused = false);
  }
}
