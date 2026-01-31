/**
 * Language Management and Translation System
 * 
 * This module handles:
 * 1. Language switching between English and Kannada
 * 2. Dynamic text translation on page load and language change
 * 3. Integration with Web Speech API for audio output
 * 
 * Features:
 * - Client-side only (no backend dependencies)
 * - Uses browser localStorage for language persistence
 * - Supports Web Speech API for text-to-speech
 * - Lightweight and deployment-safe
 */

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    applyLanguage(currentLang);
    updateLanguageToggle(currentLang);
});

/**
 * Apply language translations to all elements with data-translate attribute
 * @param {string} lang - Language code ('en' or 'kn')
 */
function applyLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
    
    // Find all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(lang, key);
        
        // Handle different element types
        if (element.tagName === 'INPUT' && element.type === 'submit') {
            element.value = translation;
        } else if (element.tagName === 'OPTION') {
            // For option elements, check if it's a placeholder
            if (element.value === '' || element.value === 'none') {
                element.textContent = translation;
            }
        } else {
            element.textContent = translation;
        }
    });
    
    // Update placeholder attributes
    const placeholders = document.querySelectorAll('[data-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-placeholder');
        element.placeholder = getTranslation(lang, key);
    });
    
    // Update title attribute
    const titles = document.querySelectorAll('[data-title]');
    titles.forEach(element => {
        const key = element.getAttribute('data-title');
        element.title = getTranslation(lang, key);
    });
    
    // Update aria-label attributes
    const ariaLabels = document.querySelectorAll('[data-aria-label]');
    ariaLabels.forEach(element => {
        const key = element.getAttribute('data-aria-label');
        element.setAttribute('aria-label', getTranslation(lang, key));
    });
    
    // Save language preference
    setCurrentLanguage(lang);
}

/**
 * Switch language and update UI
 * @param {string} lang - Language code ('en' or 'kn')
 */
function switchLanguage(lang) {
    applyLanguage(lang);
    updateLanguageToggle(lang);
    
    // Trigger custom event for other scripts
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Update language toggle button display
 * @param {string} lang - Current language code
 */
function updateLanguageToggle(lang) {
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        const otherLang = lang === 'en' ? 'kn' : 'en';
        toggleBtn.textContent = lang === 'en' ? 'ಕನ್ನಡ' : 'English';
        toggleBtn.setAttribute('data-lang', otherLang);
        toggleBtn.setAttribute('aria-label', `Switch to ${getTranslation(otherLang, 'lang' + otherLang.charAt(0).toUpperCase() + otherLang.slice(1))}`);
    }
}

/**
 * Toggle between English and Kannada
 */
function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'kn' : 'en';
    switchLanguage(newLang);
}

