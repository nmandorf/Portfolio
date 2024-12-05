
//JS to MAKE HEADER HIDE AWAY
let lastScrollY = window.scrollY;
let threshold = 75; // Adjust this value for more or less sensitivity
let accumulatedScroll = 0;

window.addEventListener('scroll', () => {
  const banner = document.querySelector('.banner');

  // Calculate the amount of scroll since the last check
  const deltaY = window.scrollY - lastScrollY;
  accumulatedScroll += deltaY;

  // Hide the banner when scrolling down past the threshold
  if (accumulatedScroll > threshold && window.scrollY > lastScrollY) {
    banner.classList.add('hidden');
    accumulatedScroll = 0; // Reset the accumulated scroll after hiding
  }

  // Show the banner when scrolling up past the threshold
  if (accumulatedScroll < -threshold && window.scrollY < lastScrollY) {
    banner.classList.remove('hidden');
    accumulatedScroll = 0; // Reset the accumulated scroll after showing
  }

  lastScrollY = window.scrollY;
});


//JS TO GET SMOOTH TRANSITIONS
// On thumbnail click, save transition details
document.querySelectorAll('.workLink').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent immediate navigation

    const thumbnail = this.querySelector('.workThumbnail');

    // Get the initial position and size of the thumbnail
    const rect = thumbnail.getBoundingClientRect();

    // Save necessary data to sessionStorage
    sessionStorage.setItem('transitionImage', thumbnail.src); // Save the image source
    sessionStorage.setItem('transitionStart', JSON.stringify({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })); // Save start position and size

    // Clone the thumbnail for animation
    const animatedImage = thumbnail.cloneNode(true);
    document.body.appendChild(animatedImage);

    // Style the cloned image to match the thumbnail's position and size
    animatedImage.style.position = 'fixed';
    animatedImage.style.top = `${rect.top}px`;
    animatedImage.style.left = `${rect.left}px`;
    animatedImage.style.width = `${rect.width}px`;
    animatedImage.style.height = `${rect.height}px`;
    animatedImage.style.zIndex = '1000';
    animatedImage.style.objectFit = 'contain';
    animatedImage.style.transition = 'all 0.8s ease-in-out';

    // Animate the thumbnail to expand (max width 1492px) and center horizontally
    setTimeout(() => {
      const viewportWidth = window.innerWidth;
      const targetWidth = Math.min(1492, viewportWidth); // Cap the width to 1492px or viewport width
      const targetHeight = 992; // Fixed height
      const leftPosition = (viewportWidth - targetWidth) / 2; // Center horizontally

      animatedImage.style.top = '0px';
      animatedImage.style.left = `${leftPosition}px`;
      animatedImage.style.width = `${targetWidth}px`;
      animatedImage.style.height = `${targetHeight}px`;
      animatedImage.style.objectFit = 'cover';
    }, 50);

    // Navigate to the next page after animation
    setTimeout(() => {
      window.location.href = this.href; // Navigate to the target page
    }, 850); // Match the transition duration (800ms + small buffer)
  });
});

// On the next page load, handle the animation
window.addEventListener('DOMContentLoaded', () => {
  const transitionImageSrc = sessionStorage.getItem('transitionImage');
  const transitionStart = JSON.parse(sessionStorage.getItem('transitionStart'));

  if (transitionImageSrc && transitionStart) {
    const animatedImage = document.createElement('img');
    animatedImage.src = transitionImageSrc;
    document.body.appendChild(animatedImage);

    // Style the animated image to match the starting position
    animatedImage.style.position = 'absolute';
    animatedImage.style.top = `20px`;
    animatedImage.style.left = `${((window.innerWidth - 1492) / 2)}px`; // Center horizontally
    animatedImage.style.width = `1492px`;
    animatedImage.style.height = `992px`;
    animatedImage.style.zIndex = '1000';
    animatedImage.style.objectFit = 'cover';
    animatedImage.style.transition = 'all 0.8s ease-in-out';

    // Animate the image to the hero image's position or keep it centered
    setTimeout(() => {
      const heroImg = document.querySelector('.heroImgProj img');
      if (heroImg) {
        const heroRect = heroImg.getBoundingClientRect();

        animatedImage.style.position = 'absolute';
        animatedImage.style.top = `${heroRect.top + window.pageYOffset}px`; // Match hero image's top position
        animatedImage.style.left = `${heroRect.left}px`; // Match hero image's left position
        animatedImage.style.width = `${heroRect.width}px`; // Match hero image's width
        animatedImage.style.height = `${heroRect.height}px`; // Match hero image's height
      } else {
        // Default to 1492px x 992px and allow scrolling
        animatedImage.style.position = 'absolute';
        animatedImage.style.top = `${window.pageYOffset}px`;
        animatedImage.style.left = `${(window.innerWidth - 1492) / 2}px`; // Keep centered horizontally
        animatedImage.style.width = `1452px`;
        animatedImage.style.height = `992px`;
      }
    }, 50);

    animatedImage.onload = () => {
      animatedImage.style.opacity = '1'; // Make it visible after loading
    };
    // Ensure the image remains visible and scrolls with the page
    setTimeout(() => {
      animatedImage.style.opacity = '0'; // Keep the image visible
    }, 1000); // Slightly exceed transition duration
  }

  // Clear saved data
  sessionStorage.removeItem('transitionImage');
  sessionStorage.removeItem('transitionStart');
});


document.querySelectorAll('.workTransition').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href'); // Get the target section's ID
    const targetElement = document.querySelector(targetId); // Find the target element
    targetElement.scrollIntoView({
      behavior: 'smooth' // Smooth scrolling
    });
  });
});



