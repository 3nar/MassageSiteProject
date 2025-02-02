


// Main JavaScript File for Massage Center Website

// ========== Global Variables ==========
// Reference to the language selector dropdown
const languageSelector = document.getElementById('language-selector');

// Reference to the contact form
const contactForm = document.querySelector('form');

// Reference to all sections in the page for animations
const sections = document.querySelectorAll('section');

// Check if elements exist to avoid runtime errors
if (!languageSelector) {
    console.warn('Warning: Language selector element is missing. Please ensure it exists in the HTML with id="language-selector".');
}

if (!contactForm) {
    console.warn('Warning: Contact form is missing. Please ensure the form is correctly defined in the HTML.');
}

if (sections.length === 0) {
    console.warn('Warning: No sections found for animations. Please ensure the HTML has at least one <section> element.');
}

// ========== Language Selector Functionality ==========
const translationsCache = {}; // Cache for translations

function updateLanguage(language) {
    // Check if translations are already cached
    if (translationsCache[language]) {
        applyTranslations(translationsCache[language]);
        return;
    }

    const languageFile = `translations/${language}.json`; // Path to language file

    // Fetch translations dynamically
    fetch(languageFile)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not fetch translations for ${language}`);
            }
            return response.json();
        })
        .then((translations) => {
            // Store translations in cache
            translationsCache[language] = translations;
            applyTranslations(translations);
        })
        .catch((error) => {
            console.error(`Error fetching translations: ${error}`);
        });
}

function applyTranslations(translations) {
    // Header Elements
    const logoImg = document.querySelector('.logo img');
    if (logoImg) logoImg.alt = translations.logoAlt;

    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length >= 4) {
        navLinks[0].textContent = translations.home;
        navLinks[1].textContent = translations.services;
        navLinks[2].textContent = translations.about;
        navLinks[3].textContent = translations.contact;
    }

    // Hero Section
    const heroHeader = document.querySelector('.hero-content h1');
    const heroDescription = document.querySelector('.hero-content p');
    const ctaButton = document.querySelector('.cta-button');

    if (heroHeader) heroHeader.textContent = translations.heroHeader;
    if (heroDescription) heroDescription.textContent = translations.heroDescription;
    if (ctaButton) ctaButton.textContent = translations.heroCTA;

    // Services Section
    const servicesHeader = document.querySelector('#services h2');
    const servicesDescription = document.querySelector('#services p');
    if (servicesHeader) servicesHeader.textContent = translations.servicesHeader;
    if (servicesDescription) servicesDescription.textContent = translations.servicesDescription;

    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length >= 3) {
        serviceItems.forEach((item, index) => {
            const serviceName = item.querySelector('h3');
            const serviceDescription = item.querySelector('p');
            if (serviceName) serviceName.textContent = translations[`service${index + 1}Name`];
            if (serviceDescription) serviceDescription.textContent = translations[`service${index + 1}Description`];
        });
    }

    // About Section
    const aboutHeader = document.querySelector('#about h2');
    const aboutDescription = document.querySelector('#about p');
    if (aboutHeader) aboutHeader.textContent = translations.aboutHeader;
    if (aboutDescription) aboutDescription.textContent = translations.aboutDescription;

    const aboutPoints = document.querySelectorAll('#about ul li');
    if (aboutPoints.length >= 3) {
        aboutPoints.forEach((point, index) => {
            point.textContent = translations[`aboutPoint${index + 1}`];
        });
    }

    // Contact Section
    const contactHeader = document.querySelector('#contact h2');
    const contactDescription = document.querySelector('#contact p');
    const contactCTA = document.querySelector('button[type="submit"]');

    if (contactHeader) contactHeader.textContent = translations.contactHeader;
    if (contactDescription) contactDescription.textContent = translations.contactDescription;
    if (contactCTA) contactCTA.textContent = translations.contactCTA;

    const nameLabel = document.querySelector('label[for="name"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const messageLabel = document.querySelector('label[for="message"]');

    if (nameLabel) nameLabel.textContent = translations.formNameLabel;
    if (emailLabel) emailLabel.textContent = translations.formEmailLabel;
    if (messageLabel) messageLabel.textContent = translations.formMessageLabel;

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    if (nameInput) nameInput.setAttribute('placeholder', translations.formNamePlaceholder);
    if (emailInput) emailInput.setAttribute('placeholder', translations.formEmailPlaceholder);
    if (messageInput) messageInput.setAttribute('placeholder', translations.formMessagePlaceholder);

    // Footer Section
    const footerText = document.querySelector('footer p:first-child');
    if (footerText) footerText.textContent = translations.footer;

    const socialLinks = document.querySelectorAll('.social-links a');
    if (socialLinks.length >= 3) {
        socialLinks.forEach((link, index) => {
            link.textContent = translations[`social${['Facebook', 'Instagram', 'Twitter'][index]}`];
        });
    }
}

// ========== Event Listener for Language Selector ==========
// Listen for language changes from the dropdown
if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value; // Get the selected language
        updateLanguage(selectedLanguage); // Call the update function to apply translations
        localStorage.setItem('selectedLanguage', selectedLanguage); // Save the selected language in localStorage
        console.log(`Language changed to: ${selectedLanguage}`); // Log the selected language
    });
} else {
    console.warn('Warning: Language selector element is missing. Language change functionality may not work.');
}

// ========== Load Saved Language on Page Load ==========
// Automatically load the saved language when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Get saved language or default to 'en'
        languageSelector.value = savedLanguage; // Update the dropdown to show the saved language
        updateLanguage(savedLanguage); // Apply translations based on the saved language
        console.log(`Loaded saved language: ${savedLanguage}`); // Log the loaded language
    } else {
        console.warn('Warning: Language selector element is missing. Unable to load saved language.');
    }
});

// ========== Form Submission Feedback ==========

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate form fields
    const isValid = validateForm();
    if (!isValid) {
        const errorMessage = getTranslatedMessage('formErrorMessage', 'Please fill out all required fields.');
        displayFormMessage(errorMessage, 'error');
        return;
    }

    // Placeholder for backend integration
    console.log('Form submitted successfully!');
    const successMessage = getTranslatedMessage('formSuccessMessage', 'Thank you for reaching out! We will contact you soon.');
    displayFormMessage(successMessage, 'success');
}

// Helper Function: Validate form fields
function validateForm() {
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    return name !== '' && email !== '' && message !== '';
}

// Helper Function: Get translated message
function getTranslatedMessage(key, defaultMessage) {
    if (window.currentTranslations && window.currentTranslations[key]) {
        return window.currentTranslations[key];
    }
    return defaultMessage; // Fallback to default message
}

// Function to display form feedback messages
function displayFormMessage(message, status) {
    const statusDiv = document.querySelector('.form-status');
    if (statusDiv) {
        statusDiv.textContent = message; // Set the message text
        statusDiv.className = `form-status ${status}`; // Apply appropriate class (success or error)
        statusDiv.style.display = 'block'; // Show the message

        // Hide the message automatically after 5 seconds
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    } else {
        console.warn('Warning: Form status element is missing. Feedback message cannot be displayed.');
    }
}

// Event Listener for form submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', handleFormSubmission);
} else {
    console.warn('Warning: Form element is missing. Form submission functionality will not work.');
}

// ========== Scroll Animations ==========
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section'); // Ensure sections are selected here

    if (!sections || sections.length === 0) {
        console.warn('Warning: No sections found to apply scroll animations.');
        return;
    }

    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add the visible class
            } else {
                entry.target.classList.remove('visible'); // Remove the visible class if it leaves the viewport
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach((section) => {
        if (section) {
            observer.observe(section);
        } else {
            console.warn('Warning: A section element is null or undefined.');
        }
    });
}

// Initialize Scroll Animations on page load
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
});

// ========== Event Listeners ==========
// Add event listeners for various user interactions
function addEventListeners() {
    // Language Selector: Handle language change events
    const languageSelector = document.getElementById('language-selector'); // Ensure selector is defined here
    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            console.log(`Language changed to: ${selectedLanguage}`); // Log the selected language
            updateLanguage(selectedLanguage); // Update the language
        });
    } else {
        console.warn('Warning: Language selector not found.');
    }

    // Contact Form: Handle form submission events
    const contactForm = document.querySelector('form'); // Ensure form is defined here
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            console.log('Form submission event triggered.'); // Log form submission
            handleFormSubmission(e); // Handle the form submission
        });
    } else {
        console.warn('Warning: Contact form not found.');
    }

    // Scroll Animations: Initialize animations on scroll
    console.log('Initializing scroll animations...');
    handleScrollAnimations();
}

// ========== Event Listeners ==========
// Add event listeners for various user interactions
function addEventListeners() {
    // Use global languageSelector variable
    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            const selectedLanguage = e.target.value;
            console.log(`Language changed to: ${selectedLanguage}`); // Log the selected language
            updateLanguage(selectedLanguage); // Update the language
            localStorage.setItem('selectedLanguage', selectedLanguage); // Save the selected language
        });
    } else {
        console.warn('Warning: Language selector not found.');
    }

    // Use global contactForm variable
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            console.log('Form submission event triggered.'); // Log form submission
            handleFormSubmission(e); // Handle the form submission
        });
    } else {
        console.warn('Warning: Contact form not found.');
    }

    // Scroll Animations
    console.log('Initializing scroll animations...');
    handleScrollAnimations();
}

// Placeholder Function: Initialize additional features
function initializeAdditionalFeatures() {
    // Add any additional features or logic needed during initialization
    console.log('No additional features to initialize yet.');
}
