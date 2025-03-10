const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('body-scroll-lock');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;

        accordionItem.classList.toggle('active');

        const icon = header.querySelector('i');
        if (accordionItem.classList.contains('active')) {
            icon.classList.replace('fa-plus', 'fa-minus');
        } else {
            icon.classList.replace('fa-minus', 'fa-plus');
        }
    });
});
