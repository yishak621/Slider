//VANILLA JS -using just js without frameworks
//import
import people from './data.js';

//declaration
const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

//set slide
container.innerHTML = people
  .map((person, slideIndex) => {
    //more logic later
    let position = 'next';
    //if the slideIndex is 0 =>active class,if the slideIndex is last =>last class,others next class
    if (slideIndex === 0) {
      position = 'active'; //for the first item
    }
    if (slideIndex === people.length - 1) {
      position = 'last'; //for the last item
    }
    const { img, name, job, text } = person;
    return `<article class="slide ${position}">
            <img
              src="${img}"
              alt="${img}"
              class="img"
            />
            <h4>${name}</h4>
            <p class="title">${job}</p>
            <p class="text">
             ${text}
            </p>
          </article>`;
  })
  .join('');

//Slider functionallity
//the type parameter will change the classlist change for prev btn
const startSlider = (type) => {
  const active = document.querySelector('.active');
  const last = document.querySelector('.last');
  let next = active.nextElementSibling;
  //when we run out of elments
  if (!next) {
    next = container.firstElementChild;
  }
  console.log(container);
  //remove
  active.classList.remove(['active']); //classlist returns in the form of array so we ['class'] syntax to specify the class we want to remove
  last.classList.remove(['last']);
  next.classList.remove(['next']);
  //<!--TODO: this is crucial to place it between removing and adding the classlist
  if (type === 'prev') {
    active.classList.add('next');
    last.classList.add('active');
    next = last.previousElementSibling;
    //if we run out of last
    if (!next) {
      next = container.lastElementChild; //first we assign the last elment to be next
    }
    next.classList.remove(['next']); //we remove the next class and assign it to be last
    next.classList.add('last');
    return; //important to return the function from here to ignore the rest of functionallity in the bottom
  }
  //add
  active.classList.add('last');
  last.classList.add('next');
  next.classList.add('active');
};
//next btn
nextBtn.addEventListener('click', () => {
  startSlider();
});
//prev btn
prevBtn.addEventListener('click', () => {
  startSlider('prev');
});
