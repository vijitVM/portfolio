// main.js

document.addEventListener("DOMContentLoaded", function() {
  /* 1. Dark Mode Toggle with Persistence */
  const toggleCheckbox = document.getElementById('checkbox');
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleCheckbox.checked = currentTheme === 'dark';

  toggleCheckbox.addEventListener('change', () => {
      const newTheme = toggleCheckbox.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
  });

  /* 2. Responsive Navigation Menu */
  const menuIcon = document.getElementById('icon-menu');
  const navbar = document.querySelector('.navbar');

  menuIcon.addEventListener('click', () => {
      navbar.classList.toggle('active');
  });

  /* Close Navbar when clicking on a link or scrolling */
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if(navbar.classList.contains('active')) {
              navbar.classList.remove('active');
          }
      });
  });

  window.addEventListener('scroll', () => {
      // Add shadow to header on scroll
      const header = document.querySelector('header');
      header.classList.toggle('shadow', window.scrollY > 0);

      // Hide navbar if scrolling
      if(navbar.classList.contains('active')) {
          navbar.classList.remove('active');
      }
  });

  /* 3. Back-to-Top Button Functionality */
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }
  });

  backToTopButton.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  /* 4. Modal Management for Project Details */
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close-button');

  viewDetailsButtons.forEach(button => {
      button.addEventListener('click', () => {
          const projectId = button.getAttribute('data-project');
          const modal = document.getElementById(projectId);
          if(modal) {
              modal.classList.add('active');
              // Prevent background scrolling
              document.body.style.overflow = 'hidden';
          }
      });
  });

  closeButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modal = button.closest('.modal');
          if(modal) {
              modal.classList.remove('active');
              // Restore background scrolling
              document.body.style.overflow = 'auto';
          }
      });
  });

  window.addEventListener('click', (e) => {
      modals.forEach(modal => {
          if(e.target === modal) {
              modal.classList.remove('active');
              document.body.style.overflow = 'auto';
          }
      });
  });

  /* 5. Animate Progress Bars on Scroll */
  const skillsSection = document.querySelector('.skills');
  const progressBars = document.querySelectorAll('.percent-bar');

  const options = {
      root: null,
      threshold: 0.1
  };

  const progressCallback = (entries, observer) => {
      entries.forEach(entry => {
          if(entry.isIntersecting){
              progressBars.forEach(bar => {
                  bar.style.width = bar.getAttribute('data-width');
              });
              observer.unobserve(skillsSection);
          }
      });
  };

  const progressObserver = new IntersectionObserver(progressCallback, options);
  if(skillsSection) {
      progressObserver.observe(skillsSection);
  }

  /* 6. Contact Form Submission with Feedback */
  const contactForm = document.getElementById('myform');
  const formResponse = document.getElementById('form-response');

  contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      formResponse.textContent = 'Sending...';
      formResponse.style.color = 'var(--primary-color)';

      try {
          const response = await fetch(contactForm.action, {
              method: contactForm.method,
              body: formData,
              headers: {
                  'Accept': 'application/json'
              }
          });

          if(response.ok){
              contactForm.reset();
              formResponse.textContent = 'Thank you! Your message has been sent.';
              formResponse.style.color = 'green';
          } else {
              const errorData = await response.json();
              formResponse.textContent = errorData.error || 'Oops! Something went wrong. Please try again.';
              formResponse.style.color = 'red';
          }
      } catch(error){
          formResponse.textContent = 'An error occurred. Please try again.';
          formResponse.style.color = 'red';
      }
  });
});
