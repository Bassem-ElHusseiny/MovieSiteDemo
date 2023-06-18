let slide = document.querySelector(".slide");
let slides = document.querySelector(".slidesContainer");
let element = slides.querySelectorAll(".element");
let sliderPagination = document.querySelector(".sliderPagination");
let index = 1;
let step = 100;
let interval = 10000;

for (x of element) {
  let span = document.createElement("span");
  sliderPagination.appendChild(span);
}

const firstSlide = element[0].cloneNode(true);
const lastSlide = element[element.length - 1].cloneNode(true);
slides.append(firstSlide);
slides.prepend(lastSlide);
element = slides.querySelectorAll(".element");

let Swipe = () => {
  slides.style.setProperty('transform', `translateX(${index * -step}%)`);
}

let addActive = () => {
  element[index].classList.add("active");
}

let removeActive = () => {
  element[index].classList.remove("active");
}

let addActivePagination = (x) => {
  sliderPagination.children[x].classList.add("active")
}
let removeActivePagination = (x) => {
  sliderPagination.children[x].classList.remove("active")
}

let ActivePagination = (y) => {
  let x = 0;
  if (index === 0) {
    x = element.length - 3;
  }
  else if (index === element.length - 1) {
    x = 0
  } else {
    x = index - 1;
  }
  y(x);
}

let loop = (e) => {
  if (e.target !== slides) return;

  if (index === 0) {
    index = element.length - 2;
    slides.style.transition= "none";
    Swipe();
  }
  if (index === element.length - 1) {
    index = 1;
    slides.style.transition= "none";
    Swipe();
  }
  addActive();
}

slides.addEventListener("transitionend", loop);


let right = (event) => {
  if (index >= element.length - 1) return;
  ActivePagination(removeActivePagination);
  removeActive();
  slides.style.transition= "1s ease-in-out";
  index++;
  Swipe();
  ActivePagination(addActivePagination);
}

let left = (event) => {
  if (index <= 0) return;
  ActivePagination(removeActivePagination);
  removeActive();
  slides.style.transition= "1s ease-in-out";
  index--;
  Swipe()
  ActivePagination(addActivePagination);
}

let intervalSlide;
let last = index;
const autoMove = () => {
  intervalSlide = setInterval(() => {
    slides.style.transition= "none";
    removeActive();
    ActivePagination(removeActivePagination);
    index = index < element.length - 2 ? index + 1 : 1;
    element[last].classList.add("hideElement");
    ActivePagination(addActivePagination);
    let x = setTimeout(() => {
      element[index].classList.add("viewElement");
      Swipe();
      addActive();
      element[last].classList.remove("hideElement");
      last = index;
    }, 1000);
    setTimeout(() => { element[index].classList.remove("viewElement"); }, 2000);
  }, interval);
}
document.addEventListener("mousedown", () => {
  clearInterval(intervalSlide);
});

document.addEventListener('mouseup', autoMove);

Swipe();
ActivePagination(addActivePagination);
addActive();
autoMove();