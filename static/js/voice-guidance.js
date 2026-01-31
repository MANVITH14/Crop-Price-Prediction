/**
 * Comprehensive Voice Guidance System
 * 
 * This module provides voice output for every user interaction:
 * - Dropdown selections (crop, district)
 * - Button clicks
 * - Form submissions
 * - Validation messages
 * - Prediction results
 * 
 * Features:
 * - Automatic voice feedback on all interactions
 * - Language-aware (en-IN / kn-IN)
 * - Voice buttons near every option
 * - Accessible for low-literacy users
 */

// Voice guidance enabled by default
let voiceGuidanceEnabled = true;

/**
 * Initialize voice guidance system
 * Sets up event listeners for all interactive elements
 */
function initializeVoiceGuidance() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupVoiceGuidance);
    } else {
        setupVoiceGuidance();
    }
}

// Store event listener references to prevent duplicates
let voiceEventListeners = {
    crop: null,
    district: null,
    date: null,
    form: null,
    predictButton: null,
    secondaryButtons: []
};

/**
 * Setup voice guidance event listeners
 * Uses current language dynamically (not captured at setup time)
 */
function setupVoiceGuidance() {
    // Remove existing listeners to prevent duplicates
    removeVoiceEventListeners();
    
    // Crop selection voice feedback
    const cropSelect = document.getElementById('crop');
    if (cropSelect) {
        // Remove old listener if exists
        if (voiceEventListeners.crop) {
            cropSelect.removeEventListener('change', voiceEventListeners.crop);
        }
        
        // Create new listener that gets current language dynamically
        voiceEventListeners.crop = function() {
            if (voiceGuidanceEnabled && this.value) {
                const currentLang = getCurrentLanguage();
                const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
                const cropName = getCropName(this.value, currentLang);
                const message = translations[currentLang].voiceCropSelected(cropName);
                console.log('Speaking crop:', message, 'in', langCode);
                speakText(message, langCode);
            }
        };
        cropSelect.addEventListener('change', voiceEventListeners.crop);
        
        // Add/update voice button for crop dropdown
        updateVoiceButton(cropSelect, () => {
            const currentLang = getCurrentLanguage();
            const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
            const label = getTranslation(currentLang, 'selectCrop');
            console.log('Speaking label:', label, 'in', langCode);
            speakText(label, langCode);
        });
    }
    
    // District selection voice feedback
    const districtSelect = document.getElementById('district');
    if (districtSelect) {
        // Remove old listener if exists
        if (voiceEventListeners.district) {
            districtSelect.removeEventListener('change', voiceEventListeners.district);
        }
        
        // Create new listener
        voiceEventListeners.district = function() {
            if (voiceGuidanceEnabled && this.value) {
                const currentLang = getCurrentLanguage();
                const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
                const districtName = getDistrictName(this.value, currentLang);
                const message = translations[currentLang].voiceDistrictSelected(districtName);
                console.log('Speaking district:', message, 'in', langCode);
                speakText(message, langCode);
            }
        };
        districtSelect.addEventListener('change', voiceEventListeners.district);
        
        // Add/update voice button
        updateVoiceButton(districtSelect, () => {
            const currentLang = getCurrentLanguage();
            const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
            const label = getTranslation(currentLang, 'selectDistrict');
            console.log('Speaking label:', label, 'in', langCode);
            speakText(label, langCode);
        });
    }
    
    // Date selection voice feedback
    const dateInput = document.getElementById('date');
    if (dateInput) {
        // Remove old listener if exists
        if (voiceEventListeners.date) {
            dateInput.removeEventListener('change', voiceEventListeners.date);
        }
        
        // Create new listener
        voiceEventListeners.date = function() {
            if (voiceGuidanceEnabled && this.value) {
                const currentLang = getCurrentLanguage();
                const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
                const formattedDate = formatDateForVoice(this.value, currentLang);
                const message = translations[currentLang].voiceDateSelected(formattedDate);
                console.log('Speaking date:', message, 'in', langCode);
                speakText(message, langCode);
            }
        };
        dateInput.addEventListener('change', voiceEventListeners.date);
        
        // Add/update voice button
        updateVoiceButton(dateInput, () => {
            const currentLang = getCurrentLanguage();
            const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
            const label = getTranslation(currentLang, 'selectDate');
            console.log('Speaking label:', label, 'in', langCode);
            speakText(label, langCode);
        });
    }
    
    // Form submission voice feedback
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        // Remove old listener if exists
        if (voiceEventListeners.form) {
            predictionForm.removeEventListener('submit', voiceEventListeners.form);
        }
        
        // Create new listener
        voiceEventListeners.form = function(e) {
            if (voiceGuidanceEnabled) {
                const currentLang = getCurrentLanguage();
                const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
                const crop = document.getElementById('crop').value;
                const district = document.getElementById('district').value;
                const date = document.getElementById('date').value;
                
                if (!crop || !district || !date) {
                    const errorMsg = getTranslation(currentLang, 'voiceValidationError');
                    speakText(errorMsg, langCode);
                } else {
                    const submitMsg = getTranslation(currentLang, 'voiceFormSubmit');
                    speakText(submitMsg, langCode);
                }
            }
        };
        predictionForm.addEventListener('submit', voiceEventListeners.form);
    }
    
    // Button click voice feedback
    const predictButton = document.querySelector('.btn-predict');
    if (predictButton) {
        // Remove old listener if exists
        if (voiceEventListeners.predictButton) {
            predictButton.removeEventListener('click', voiceEventListeners.predictButton);
        }
        
        // Create new listener
        voiceEventListeners.predictButton = function() {
            if (voiceGuidanceEnabled) {
                const currentLang = getCurrentLanguage();
                const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
                const buttonText = getTranslation(currentLang, 'predictPrice');
                const message = translations[currentLang].voiceButtonClick(buttonText);
                console.log('Speaking button:', message, 'in', langCode);
                speakText(message, langCode);
            }
        };
        predictButton.addEventListener('click', voiceEventListeners.predictButton);
    }
    
    // All secondary buttons
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    // Remove old listeners
    voiceEventListeners.secondaryButtons.forEach(({button, handler}) => {
        button.removeEventListener('click', handler);
    });
    voiceEventListeners.secondaryButtons = [];
    
    // Add new listeners
    secondaryButtons.forEach(button => {
        const handler = function() {
            if (voiceGuidanceEnabled) {
                const currentLang = getCurrentLanguage();
                const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
                const buttonText = this.textContent.trim();
                const message = translations[currentLang].voiceButtonClick(buttonText);
                speakText(message, langCode);
            }
        };
        button.addEventListener('click', handler);
        voiceEventListeners.secondaryButtons.push({button, handler});
    });
}

/**
 * Remove all voice event listeners
 */
function removeVoiceEventListeners() {
    const cropSelect = document.getElementById('crop');
    if (cropSelect && voiceEventListeners.crop) {
        cropSelect.removeEventListener('change', voiceEventListeners.crop);
    }
    
    const districtSelect = document.getElementById('district');
    if (districtSelect && voiceEventListeners.district) {
        districtSelect.removeEventListener('change', voiceEventListeners.district);
    }
    
    const dateInput = document.getElementById('date');
    if (dateInput && voiceEventListeners.date) {
        dateInput.removeEventListener('change', voiceEventListeners.date);
    }
    
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm && voiceEventListeners.form) {
        predictionForm.removeEventListener('submit', voiceEventListeners.form);
    }
    
    const predictButton = document.querySelector('.btn-predict');
    if (predictButton && voiceEventListeners.predictButton) {
        predictButton.removeEventListener('click', voiceEventListeners.predictButton);
    }
    
    voiceEventListeners.secondaryButtons.forEach(({button, handler}) => {
        button.removeEventListener('click', handler);
    });
    voiceEventListeners.secondaryButtons = [];
}

/**
 * Update or add voice button near an input element
 * @param {HTMLElement} element - Input element
 * @param {Function} onClick - Function to call when voice button is clicked
 */
function updateVoiceButton(element, onClick) {
    // Remove existing button if any
    const existingBtn = element.parentElement.querySelector('.voice-btn');
    if (existingBtn) {
        existingBtn.remove();
    }
    
    // Create new voice button
    const voiceBtn = document.createElement('button');
    voiceBtn.type = 'button';
    voiceBtn.className = 'voice-btn';
    voiceBtn.innerHTML = '🔊';
    voiceBtn.setAttribute('aria-label', 'Listen');
    voiceBtn.title = 'Click to hear';
    
    // Position button
    voiceBtn.style.cssText = `
        position: absolute;
        right: 35px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.2em;
        padding: 5px;
        z-index: 10;
    `;
    
    // Make parent relative for positioning
    const parent = element.parentElement;
    if (parent) {
        parent.style.position = 'relative';
        voiceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        });
        parent.appendChild(voiceBtn);
    }
}

/**
 * Add voice button near an input element (legacy function for compatibility)
 * @param {HTMLElement} element - Input element
 * @param {Function} onClick - Function to call when voice button is clicked
 */
function addVoiceButton(element, onClick) {
    updateVoiceButton(element, onClick);
}

// Update voice guidance when language changes
document.addEventListener('languageChanged', function(event) {
    console.log('Language changed, reinitializing voice guidance');
    // Reinitialize with new language
    setupVoiceGuidance();
});

/**
 * Add voice button near an input element
 * @param {HTMLElement} element - Input element
 * @param {Function} onClick - Function to call when voice button is clicked
 */
function addVoiceButton(element, onClick) {
    // Check if voice button already exists
    const existingBtn = element.parentElement.querySelector('.voice-btn');
    if (existingBtn) return;
    
    // Create voice button
    const voiceBtn = document.createElement('button');
    voiceBtn.type = 'button';
    voiceBtn.className = 'voice-btn';
    voiceBtn.innerHTML = '🔊';
    voiceBtn.setAttribute('aria-label', 'Listen');
    voiceBtn.title = 'Click to hear';
    
    // Position button
    voiceBtn.style.cssText = `
        position: absolute;
        right: 35px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.2em;
        padding: 5px;
        z-index: 10;
    `;
    
    // Make parent relative for positioning
    const parent = element.parentElement;
    if (parent) {
        parent.style.position = 'relative';
        voiceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        });
        parent.appendChild(voiceBtn);
    }
}

/**
 * Format date for voice output
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @param {string} lang - Language code
 * @returns {string} Formatted date string
 */
function formatDateForVoice(dateStr, lang) {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    const locale = lang === 'kn' ? 'kn-IN' : 'en-IN';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(locale, options);
}

/**
 * Toggle voice guidance on/off
 * @param {boolean} enabled - Enable or disable voice guidance
 */
function setVoiceGuidance(enabled) {
    voiceGuidanceEnabled = enabled;
    localStorage.setItem('voiceGuidance', enabled ? 'true' : 'false');
}

/**
 * Get voice guidance status
 * @returns {boolean} Voice guidance enabled status
 */
function isVoiceGuidanceEnabled() {
    const saved = localStorage.getItem('voiceGuidance');
    return saved === null ? true : saved === 'true';
}

// Initialize voice guidance when page loads
// Ensure all dependencies are loaded first
(function() {
    function initWhenReady() {
        if (typeof getCurrentLanguage === 'function' && 
            typeof getTranslation === 'function' && 
            typeof speakText === 'function' &&
            typeof translations !== 'undefined') {
            console.log('Initializing voice guidance');
            initializeVoiceGuidance();
        } else {
            // Wait a bit more
            setTimeout(initWhenReady, 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initWhenReady, 300);
        });
    } else {
        setTimeout(initWhenReady, 300);
    }
})();

