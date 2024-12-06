const track = document.querySelector('.carousel-track');
let index = 0;
let autoSlideInterval;

// Function to move the slide for small screens
function moveSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  index = (index + 1) % slides.length; // Increment index in a loop
  track.style.transform = `translateX(-${index * 100}%)`; // Move to the next slide
}

// Initialize the carousel based on the screen size
function initCarousel() {
  const isSmallScreen = window.innerWidth <= 767;
  const currentTransform = track.style.transform;

  if (isSmallScreen) {
    // Enable sliding functionality for small screens
    if (!autoSlideInterval) {
      track.style.transition = 'transform 0.5s ease-in-out'; // Smooth slide transition
      autoSlideInterval = setInterval(moveSlide, 3000); // Slide every 3 seconds
    }
  } else {
    // Display all slides statically for large screens
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval); // Stop auto-sliding
      autoSlideInterval = null; // Reset the interval
    }
    // Reset transform if it isn't already in default
    if (currentTransform !== 'translateX(0)') {
      track.style.transition = 'none'; // Remove any animation
      track.style.transform = 'translateX(0)'; // Show all slides without transition
    }
  }
}

// Initialize carousel on page load and ensure a debounce for resize
window.addEventListener('load', initCarousel);

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initCarousel, 200); // Debounce to avoid rapid calls
});

// Intersection Observer for fade-in effect
const carousel = document.querySelector('.carousel');
const observerOptions = {
  root: null, // Use the viewport as the root
  threshold: 0.5 // Trigger the fade-in when 50% of the carousel is in view
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the visible class to trigger the fade-in effect
      carousel.classList.add('visible');
      observer.unobserve(entry.target); // Stop observing after it's in view
    }
  });
}, observerOptions);

// Start observing the carousel section
observer.observe(carousel);
