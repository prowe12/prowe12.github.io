
// Functions for a carousel (https://programmingduck.com/articles/javascript-carousel)
function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
        result += mod;
    }
    return result;
}

function setUpCarousel(carousel) {
    function handleNext() {
        currentSlide = modulo(currentSlide + 1, numSlides);
        changeSlide(currentSlide);
    }

    function handlePrevious() {
        currentSlide = modulo(currentSlide - 1, numSlides);
        changeSlide(currentSlide);
    }

    function changeSlide(slideNumber) {
        // change current slide visually
        carousel.style.setProperty('--current-slide', slideNumber);

        // handle screen reader accessibility
        // here we're getting the elements for the previous slide, current slide and next slide
        const previousSlideNumber = modulo(slideNumber - 1, numSlides);
        const nextSlideNumber = modulo(slideNumber + 1, numSlides);
        const previousSlide = slidesContainer.children[previousSlideNumber];
        const currentSlideElement = slidesContainer.children[slideNumber];
        const nextSlide = slidesContainer.children[nextSlideNumber];

        // here, we're hiding the previous and next slides and unhiding the current slide
        previousSlide.setAttribute('aria-hidden', true);
        nextSlide.setAttribute('aria-hidden', true);
        currentSlideElement.setAttribute('aria-hidden', false);
    }

    // get elements
    const buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
    const buttonNext = carousel.querySelector('[data-carousel-button-next]');
    const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');

    // carousel state we need to remember
    let currentSlide = 0;
    const numSlides = slidesContainer.children.length;

    // set up events
    buttonPrevious.addEventListener('click', handlePrevious);
    buttonNext.addEventListener('click', handleNext);
}

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(setUpCarousel);

