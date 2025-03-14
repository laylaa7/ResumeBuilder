 // Mobile Menu Toggle
 const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
 const closeBtn = document.querySelector('.close-btn');
 const mobileMenu = document.querySelector('.mobile-menu');
 const overlay = document.querySelector('.overlay');
 
 mobileMenuBtn.addEventListener('click', () => {
     mobileMenu.classList.add('active');
     overlay.classList.add('active');
     document.body.style.overflow = 'hidden';
 });
 
 closeBtn.addEventListener('click', () => {
     mobileMenu.classList.remove('active');
     overlay.classList.remove('active');
     document.body.style.overflow = 'auto';
 });
 
 overlay.addEventListener('click', () => {
     mobileMenu.classList.remove('active');
     overlay.classList.remove('active');
     document.body.style.overflow = 'auto';
 });
 
 // Intersection Observer for Animations
 const fadeElements = document.querySelectorAll('.fade-in-up');
 
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.style.opacity = 1;
             entry.target.style.transform = 'translateY(0)';
         }
     });
 }, {
     threshold: 0.1
 });
 
 fadeElements.forEach(element => {
     element.style.opacity = 0;
     element.style.transform = 'translateY(30px)';
     element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
     observer.observe(element);
 });
 // Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
 body.classList.add('dark-mode');
 themeToggle.checked = true;
}

// Toggle theme when switch is clicked
themeToggle.addEventListener('change', function() {
 if (this.checked) {
     body.classList.add('dark-mode');
     localStorage.setItem('theme', 'dark');
 } else {
     body.classList.remove('dark-mode');
     localStorage.setItem('theme', 'light');
 }
});

// Resume Examples Modal
const modal = document.getElementById('resumeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');
const useTemplateBtn = document.getElementById('useTemplateBtn');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

// Resume examples data
const resumeExamples = {
 marketing: {
     title: 'Marketing Professional Resume',
     description: 'This resume effectively showcases campaign metrics, digital marketing skills, and creative achievements. Perfect for mid-level marketing professionals looking to highlight their results-driven experience.',
     image: 'public/images/marketing-template.png'
 },
 developer: {
     title: 'Software Developer Resume',
     description: 'This technical resume highlights programming languages, frameworks, project experience, and problem-solving skills. Ideal for senior developers who want to showcase their technical expertise and project achievements.',
     image: 'public/images/sw-template.png'
 },
 finance: {
     title: 'Finance Professional Resume',
     description: 'An executive-style resume that emphasizes financial achievements, certifications, and leadership experience. Perfect for finance professionals aiming for senior positions in corporate environments.',
     image: 'public/images/financial-template.png'
 },
 healthcare: {
     title: 'Healthcare Professional Resume',
     description: 'A clean, professional resume that showcases medical qualifications, patient care experience, and specialized skills. Great for entry-level healthcare professionals looking to establish their career.',
     image: 'public/images/healthcare-template.webp'
 }
};

// Open modal when "View Full Resume" is clicked
const viewButtons = document.querySelectorAll('.view-example');
viewButtons.forEach(button => {
 button.addEventListener('click', function(e) {
     e.preventDefault();
     const resumeId = this.getAttribute('data-id');
     const resume = resumeExamples[resumeId];
     
     modalImage.src = resume.image;
     modalTitle.textContent = resume.title;
     modalDescription.textContent = resume.description;
     
     modal.style.display = 'block';
     document.body.style.overflow = 'hidden';
 });
});

// Close modal when X is clicked
closeModal.addEventListener('click', function() {
 modal.style.display = 'none';
 document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(e) {
 if (e.target === modal) {
     modal.style.display = 'none';
     document.body.style.overflow = 'auto';
 }
});

// Use Template button action
useTemplateBtn.addEventListener('click', function() {
 // Redirect to template editor or show sign-up form
 alert('Taking you to the template editor!');
 window.location.href = '#';
});

// Download PDF button action
downloadPdfBtn.addEventListener('click', function() {
 // Simulate PDF download
 alert('Download started!');
});

// Update nav links to include Examples section
const navLinks = document.querySelector('nav ul');
const examplesNavItem = document.createElement('li');
const examplesLink = document.createElement('a');
examplesLink.href = '#examples';
examplesLink.textContent = 'Examples';
examplesNavItem.appendChild(examplesLink);

// Insert before Pricing nav item
const pricingNavItem = document.querySelector('nav ul li a[href="#pricing"]').parentElement;
navLinks.insertBefore(examplesNavItem, pricingNavItem);

// Also update mobile menu
const mobileMenuList = document.querySelector('.mobile-menu ul');
const mobileExamplesItem = document.createElement('li');
const mobileExamplesLink = document.createElement('a');
mobileExamplesLink.href = '#examples';
mobileExamplesLink.textContent = 'Examples';
mobileExamplesItem.appendChild(mobileExamplesLink);

// Insert before Pricing in mobile menu
const mobilePricingItem = document.querySelector('.mobile-menu ul li a[href="#pricing"]').parentElement;
mobileMenu.insertBefore(mobileExamplesItem, mobilePricingItem);
