const slides = document.querySelectorAll('.slide__show');
const nxtBtn = document.querySelector('#btn__nxt__slide');
const prevBtn = document.querySelector('#btn__prv__slide');
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;

const Slides_show = slideNumber => {
  slides.forEach(
    (slide, idx) =>
      (slide.style.transform = `translateX(${(idx - slideNumber) * 100}%)`)
  );
};

const activateDot = slide_Num => {
  document
    .querySelectorAll('.dot')
    .forEach(dot => dot.classList.remove('bg-blue-400'));
  document
    .querySelector(`.dot[data-slide="${slide_Num}"]`)
    .classList.add('bg-blue-400');
};

const init = slide_num => {
  slides.forEach((_, idx) =>
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `       
      <button class="dot w-[1rem] h-[1rem] mr-4 rounded-full border-solid border-2 border-blue-400" data-slide = ${idx}></button>
      `
    )
  );
  Slides_show(slide_num);
  activateDot(slide_num);
};

if (localStorage.getItem('current-idx')) {
  currentSlide = JSON.parse(localStorage.getItem('current-idx'));
  init(currentSlide);
} else {
  init(0);
}

const UpdateUI = slide => {
  Slides_show(slide);
  activateDot(slide);
  localStorage.setItem('current-idx', slide);
};

const nxtSlide = () =>
  currentSlide === slides.length - 1
    ? UpdateUI((currentSlide = 0))
    : UpdateUI(++currentSlide);

const prevSlide = () =>
  currentSlide === 0
    ? UpdateUI((currentSlide = slides.length - 1))
    : UpdateUI(--currentSlide);

nxtBtn.addEventListener('click', nxtSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  e.key === 'ArrowRight' && nxtSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

dotsContainer.addEventListener('click', e =>
  e.target.classList.contains('dot') ? UpdateUI(e.target.dataset.slide) : null
);
