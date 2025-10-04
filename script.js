document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              hamburger.classList.remove('active');
          }
      });
  });

  // --- Smooth Scrolling for Navigation Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          const headerOffset = document.querySelector('.header').offsetHeight; // Get header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
          });
      });
  });

  // --- Section Entry Animation on Scroll (Intersection Observer) ---
  const sections = document.querySelectorAll('section');

  const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // 10% of the section must be visible
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('section-visible');
              entry.target.classList.remove('section-hidden');
              // Optionally, stop observing once it's visible
              // observer.unobserve(entry.target);
          } else {
              // Optional: remove class when out of view to re-animate on scroll back
              entry.target.classList.remove('section-visible');
              entry.target.classList.add('section-hidden');
          }
      });
  }, observerOptions);

  // Add initial hidden class and observe
  sections.forEach(section => {
      section.classList.add('section-hidden');
      sectionObserver.observe(section);
  });

  // --- Contact Form Submission (Dummy Link) ---
  const contactForm = document.querySelector('.contact-form');
  const sendMessageButton = document.querySelector('.btn-send-message');

  contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent actual form submission

      // Simulate sending message by opening LinkedIn
      window.open('https://www.linkedin.com/in/amit-kumar-dummy', '_blank');

      // Optionally, clear the form or show a message
      alert('Thank you for your message! (This is a demo, opening LinkedIn profile)');
      contactForm.reset();
  });
});
