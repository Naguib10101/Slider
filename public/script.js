const slides = document.querySelectorAll('.slide__show');
const nxtBtn = document.querySelector('#btn__nxt__slide');
const prevBtn = document.querySelector('#btn__prv__slide');
const dotsContainer = document.querySelector('.dots');

let currentSlide = localStorage.getItem('current-idx')
  ? JSON.parse(localStorage.getItem('current-idx'))
  : 0;

const showSlides = slideNumber => {
  slides.forEach(
    (slide, idx) =>
      (slide.style.transform = `translateX(${(idx - slideNumber) * 100}%)`)
  );
};

const activateDot = slideNum => {
  document
    .querySelectorAll('.dot')
    .forEach(dot => dot.classList.remove('bg-blue-400'));
  const dot = document.querySelector(`.dot[data-slide="${slideNum}"]`);
  if (dot) dot.classList.add('bg-blue-400');
};

const initDots = () => {
  const dotsHTML = Array.from(slides)
    .map(
      (_, idx) =>
        `<button class="dot w-[1rem] h-[1rem] mr-4 rounded-full border-solid border-2 border-blue-400" data-slide="${idx}"></button>`
    )
    .join('');

  dotsContainer.innerHTML = dotsHTML;
};

const init = slideNum => {
  initDots();
  showSlides(slideNum);
  activateDot(slideNum);
};

const updateUI = slide => {
  showSlides(slide);
  activateDot(slide);
  localStorage.setItem('current-idx', slide);
};

const nxtSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateUI(currentSlide);
};

const prevSlide = () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateUI(currentSlide);
};

nxtBtn.addEventListener('click', nxtSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nxtSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

dotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dot')) {
    updateUI(parseInt(e.target.dataset.slide, 10));
  }
});

// Initialize
const storedSlide = localStorage.getItem('current-idx');
init(storedSlide ? JSON.parse(storedSlide) : 0);
