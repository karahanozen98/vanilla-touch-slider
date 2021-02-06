const container = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const width = window.innerWidth;
let transformIndex = 0;
const minTransformIndex = -(width * (slides.length - 1));

const maxTransformIndex = 0;
let touchStart = 0;
let touchEnd = 0;

function handleSlide(diff) {
  transformIndex += diff;
  container.style.transform = `translateX(${transformIndex}px)`;
}

function handleChange() {
  transformIndex = width * Math.round(transformIndex / width);
  if (transformIndex > 0) transformIndex = 0;
  if (transformIndex < -width * (slides.length - 1))
    transformIndex = -width * (slides.length - 1);
  container.style.transform = `translateX(${transformIndex}px)`;
}

slides.forEach((doc) => {
   // Touch events for mobile   
  doc.addEventListener("touchstart", (e) => {
    e.preventDefault();
    container.classList.add("grabbing");
    touchStart = e.touches[0].clientX;
  });
  doc.addEventListener("touchmove", (e) => {
    e.preventDefault();
    container.classList.add("grabbing");
    touchEnd = e.touches[0].clientX;
    const diff = touchEnd - touchStart;
     handleSlide(diff*2);
    touchStart = touchEnd;
  });
  doc.addEventListener("touchend", () => {
    container.classList.remove("grabbing");
    const diff = touchEnd - touchStart;
    handleChange(diff);
  });
});
