
const ANIM_SPEED = {
    fast: 200,
    medium: 400,
    slow: 800
  };

  function initScrollAnimations() {

    const animElements = document.querySelectorAll('.project-card, .education-card, .experience-content, .interest-item, .skill-category');
    
   
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, 100 * Array.from(animElements).indexOf(entry.target) % 5);
          
        
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
  
    animElements.forEach(element => {
   
      element.classList.add('anim-ready');
      observer.observe(element);
    });
  }
  

  function initParallaxEffect() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        const yPos = scrollPosition * 0.2;
        header.style.backgroundPosition = `50% ${yPos}px`;
      }
    });
  }
  
 
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
         
          const targetWidth = entry.target.style.width;
          
          
          entry.target.style.width = '0';
          
         
          entry.target.offsetWidth;
          
          
          setTimeout(() => {
            entry.target.style.transition = `width 1s ease-out`;
            entry.target.style.width = targetWidth;
          }, 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }
  
  function typeWriterEffect() {
    const titleElement = document.querySelector('.header-text .title');
    const text = titleElement.textContent;
    
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    titleElement.textContent = '';
    titleElement.style.visibility = 'visible';
    
    let i = 0;
    const speed = 50; 
    
    function type() {
      if (i < text.length) {
        titleElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    
    setTimeout(type, 500);
  }
  
  
  function addHoverEffects() {
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        if (window.innerWidth >= 768) {
          const x = e.clientX - card.getBoundingClientRect().left;
          const y = e.clientY - card.getBoundingClientRect().top;
          
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          card.classList.add('card-hover');
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('card-hover');
      });
    });
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
   
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      initScrollAnimations();
      initParallaxEffect();
      animateSkillBars();
      typeWriterEffect();
      addHoverEffects();
      
     
      document.querySelectorAll('.section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
      });
    }
  });
  
  
  (function() {
    const style = document.createElement('style');
    style.textContent = `
      .anim-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
      }
      
      .animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .card-hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
      }
      
      .card-hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        background: radial-gradient(
          circle at var(--mouse-x) var(--mouse-y),
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0) 60%
        );
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  })();


const themeToggleBtn = document.getElementById('theme-toggle-btn');
const printBtn = document.getElementById('print-btn');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');



function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function printResume() {
    window.print();
}

function setActiveSection() {
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
                
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function animateOnScroll() {
    const animateElements = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

function handleStickyNav() {
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    
    const observer = new IntersectionObserver(
        ([entry]) => {
            nav.classList.toggle('sticky', !entry.isIntersecting);
        }, 
        { threshold: 0, rootMargin: `-${nav.offsetHeight}px 0px 0px 0px` }
    );
    
    observer.observe(header);
}

function init() {
    initTheme();
    themeToggleBtn.addEventListener('click', toggleTheme);
    printBtn.addEventListener('click', printResume);
    window.addEventListener('scroll', setActiveSection);
    initSmoothScroll();
    animateOnScroll();
    handleStickyNav();
    setActiveSection();
    
    if (window.location.hash) {
        const initialLink = document.querySelector(`a[href="${window.location.hash}"]`);
        if (initialLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            initialLink.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', init);






//dnew
// Icons for the resume page using SVG backgrounds

// Create and add styles for icons
const createIconStyles = () => {
    // Create style element
    const style = document.createElement('style');
    
    // Define icon styles
    style.textContent = `
      /* Contact information icons */
      .location-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E");
      }
      
      .phone-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E");
      }
      
      .email-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='20' height='16' x='2' y='4' rx='2'/%3E%3Cpath d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='20' height='16' x='2' y='4' rx='2'/%3E%3Cpath d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'/%3E%3C/svg%3E");
      }
      
      .linkedin-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'/%3E%3Crect width='4' height='12' x='2' y='9'/%3E%3Ccircle cx='4' cy='4' r='2'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'/%3E%3Crect width='4' height='12' x='2' y='9'/%3E%3Ccircle cx='4' cy='4' r='2'/%3E%3C/svg%3E");
      }
      
      .user-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");
      }
      
      /* Theme toggle icons */
      .sun-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Cpath d='M12 2v2'/%3E%3Cpath d='M12 20v2'/%3E%3Cpath d='m4.93 4.93 1.41 1.41'/%3E%3Cpath d='m17.66 17.66 1.41 1.41'/%3E%3Cpath d='M2 12h2'/%3E%3Cpath d='M20 12h2'/%3E%3Cpath d='m6.34 17.66-1.41 1.41'/%3E%3Cpath d='m19.07 4.93-1.41 1.41'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Cpath d='M12 2v2'/%3E%3Cpath d='M12 20v2'/%3E%3Cpath d='m4.93 4.93 1.41 1.41'/%3E%3Cpath d='m17.66 17.66 1.41 1.41'/%3E%3Cpath d='M2 12h2'/%3E%3Cpath d='M20 12h2'/%3E%3Cpath d='m6.34 17.66-1.41 1.41'/%3E%3Cpath d='m19.07 4.93-1.41 1.41'/%3E%3C/svg%3E");
      }
      
      .moon-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'/%3E%3C/svg%3E");
      }
      
      /* Print icon */
      .print-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 6 2 18 2 18 9'/%3E%3Cpath d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'/%3E%3Crect width='12' height='8' x='6' y='14'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 6 2 18 2 18 9'/%3E%3Cpath d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'/%3E%3Crect width='12' height='8' x='6' y='14'/%3E%3C/svg%3E");
      }
      
      /* Interest icons */
      .code-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='16 18 22 12 16 6'/%3E%3Cpolyline points='8 6 2 12 8 18'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='16 18 22 12 16 6'/%3E%3Cpolyline points='8 6 2 12 8 18'/%3E%3C/svg%3E");
      }
      
      .ai-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z'/%3E%3Cpath d='M7 7h.01'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z'/%3E%3Cpath d='M7 7h.01'/%3E%3C/svg%3E");
      }
      
      .finance-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z'/%3E%3Cpath d='M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z'/%3E%3Cpath d='M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12'/%3E%3Cpath d='M22 9c-4.29 1-7.14-2.33-9-5'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z'/%3E%3Cpath d='M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z'/%3E%3Cpath d='M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12'/%3E%3Cpath d='M22 9c-4.29 1-7.14-2.33-9-5'/%3E%3C/svg%3E");
      }
      
      .iot-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='16' height='10' x='4' y='8' rx='2'/%3E%3Cpath d='M8 8V7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1'/%3E%3Cpath d='M12 12v3'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='16' height='10' x='4' y='8' rx='2'/%3E%3Cpath d='M8 8V7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1'/%3E%3Cpath d='M12 12v3'/%3E%3C/svg%3E");
      }
      
      .anime-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z'/%3E%3Cpath d='M7 16v6'/%3E%3Cpath d='M13 19v3'/%3E%3Cpath d='M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 2l-1 1'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z'/%3E%3Cpath d='M7 16v6'/%3E%3Cpath d='M13 19v3'/%3E%3Cpath d='M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 2l-1 1'/%3E%3C/svg%3E");
      }
      
      .travel-icon {
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20.38 3.46 16 2a4 4 0 0 1 1.46 3.46'/%3E%3Cpath d='m9.9 2 .7 2.1c.11.32-.16.64-.48.65a4.35 4.35 0 0 0-2.45.9 4.18 4.18 0 0 0-1.95 2.54c-.09.33-.4.57-.75.49l-2.12-.7'/%3E%3Cpath d='m2 19.2 2.1-.7c.32-.1.64.16.65.48.08.93.43 1.77.9 2.45a4.18 4.18 0 0 0 2.54 1.95c.33.09.57.4.49.75l-.7 2.12'/%3E%3Cpath d='m21.54 9.9-2.1.7c-.32.1-.64-.16-.65-.48a4.35 4.35 0 0 0-.9-2.45 4.18 4.18 0 0 0-2.54-1.95c-.33-.09-.57-.4-.49-.75l.7-2.12'/%3E%3Cpath d='M3.46 20.38 2 16a4 4 0 0 0 3.46 1.46'/%3E%3Cpath d='M14 22a8 8 0 0 0 0-16'/%3E%3Cpath d='M19.5 14.5 18 18h-4.5'/%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20.38 3.46 16 2a4 4 0 0 1 1.46 3.46'/%3E%3Cpath d='m9.9 2 .7 2.1c.11.32-.16.64-.48.65a4.35 4.35 0 0 0-2.45.9 4.18 4.18 0 0 0-1.95 2.54c-.09.33-.4.57-.75.49l-2.12-.7'/%3E%3Cpath d='m2 19.2 2.1-.7c.32-.1.64.16.65.48.08.93.43 1.77.9 2.45a4.18 4.18 0 0 0 2.54 1.95c.33.09.57.4.49.75l-.7 2.12'/%3E%3Cpath d='m21.54 9.9-2.1.7c-.32.1-.64-.16-.65-.48a4.35 4.35 0 0 0-.9-2.45 4.18 4.18 0 0 0-2.54-1.95c-.33-.09-.57-.4-.49-.75l.7-2.12'/%3E%3Cpath d='M3.46 20.38 2 16a4 4 0 0 0 3.46 1.46'/%3E%3Cpath d='M14 22a8 8 0 0 0 0-16'/%3E%3Cpath d='M19.5 14.5 18 18h-4.5'/%3E%3C/svg%3E");
      }
    `;
    

    document.head.appendChild(style);
  };

  document.addEventListener('DOMContentLoaded', createIconStyles);