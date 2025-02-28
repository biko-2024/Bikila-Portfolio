// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation background change on scroll with enhanced visibility
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

// Observe about section
document.querySelector('.about-content').classList.add('animate');
observer.observe(document.querySelector('.about-content'));

// Education timeline animations
document.querySelectorAll('.education-card').forEach(card => {
    observer.observe(card);
});

// Form validation and animation
const form = document.querySelector('.contact-form form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        const response = await fetch('process.php', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
            form.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        submitButton.innerHTML = '<i class="fas fa-times"></i> Error';
    } finally {
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }, 3000);
    }
});

// Social Media Hover Effects
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    btn.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add active class to current section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize skill progress bars
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Existing skills animation code
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const percentNumber = item.querySelector('.percent-number');
        const targetValue = parseInt(item.getAttribute('data-percent'));
        
        function animateNumber() {
            let currentValue = 0;
            percentNumber.textContent = '0%';
            
            const interval = setInterval(() => {
                if (currentValue >= targetValue) {
                    clearInterval(interval);
                    percentNumber.textContent = targetValue + '%';
                } else {
                    currentValue++;
                    percentNumber.textContent = currentValue + '%';
                }
            }, 20);
        }
        
        item.addEventListener('mouseenter', animateNumber);
        
        item.addEventListener('mouseleave', () => {
            percentNumber.textContent = '0%';
        });
    });
});