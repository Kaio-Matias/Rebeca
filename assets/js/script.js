document.addEventListener("DOMContentLoaded", function() {
    const slidesContainer = document.querySelector(".carousel-slides");
    const slides = Array.from(slidesContainer.children);
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
    let currentIndex = 0;

    // Clone first and last slides
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);

    // Update slides array after cloning
    const allSlides = slidesContainer.children;
    const slideWidth = slides[0].offsetWidth;
    slidesContainer.style.transform = `translateX(-${slideWidth}px)`;

    function updateSlide(index) {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(-${(index + 1) * slideWidth}px)`;
        currentIndex = index;

        if (index === slides.length) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = `translateX(-${slideWidth}px)`;
                currentIndex = 0;
            }, 500);
        }

        if (index === -1) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = `translateX(-${slides.length * slideWidth}px)`;
                currentIndex = slides.length - 1;
            }, 500);
        }
    }

    function showNextSlide() {
        updateSlide(currentIndex + 1);
    }

    function showPreviousSlide() {
        updateSlide(currentIndex - 1);
    }

    nextButton.addEventListener("click", showNextSlide);
    prevButton.addEventListener("click", showPreviousSlide);

    setInterval(showNextSlide, 5000); // Muda de slide a cada 5 segundos
});