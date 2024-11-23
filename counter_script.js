
         const defaultCount = 100;

// Retrieve the current count from localStorage or initialize it
let visitorCount = localStorage.getItem("visitorCount");
if (!visitorCount) {
  visitorCount = defaultCount; // Set to default if not present
} else {
  visitorCount = parseInt(visitorCount) + 1; // Increment count
}

// Update the count in localStorage
localStorage.setItem("visitorCount", visitorCount);

// Display the count on the page
document.getElementById("visitorCount").textContent = visitorCount;
// Function to display the counter digits
function displayCounter(count) {
  const countStr = count.toString().padStart(8, '0'); // Ensure 8 digits with leading zeros
  const counterDisplay = document.getElementById('visitorCount');
  counterDisplay.innerHTML = ''; // Clear previous content

  for (let digit of countStr) {
    const digitElement = document.createElement('span');
    digitElement.className = 'digit';
    digitElement.textContent = digit;
    counterDisplay.appendChild(digitElement);
  }
}

// Function to animate the counter from start to end
function animateCounter(start, end, duration) {
  const steps = Math.floor(duration / 16); // Approx. 60 frames per second
  const stepValue = (end - start) / steps;
  let current = start;
  let step = 0;

  function updateCounter() {
    if (step >= steps) {
      displayCounter(end); // Ensure final value is displayed
      return;
    }
    current += stepValue;
    displayCounter(Math.floor(current));
    step++;
    requestAnimationFrame(updateCounter);
  }

  updateCounter();
}

// Observer to animate counter when it becomes visible
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateCounter(0, visitorCount, 2000); // Animate from 0 to visitCount in 2 seconds
      observer.disconnect(); // Stop observing after animation
    }
  },
  { threshold: 0.5 } // Trigger when 50% of the element is visible
);

observer.observe(document.querySelector('.counter-container'));
      