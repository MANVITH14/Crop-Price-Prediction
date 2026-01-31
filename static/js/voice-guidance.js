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

/**
 * Setup voice guidance event listeners
 */
function setupVoiceGuidance() {
    const currentLang = getCurrentLanguage();
    const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
    
    // Crop selection voice feedback
    const cropSelect = document.getElementById('crop');
    if (cropSelect) {
        cropSelect.addEventListener('change', function() {
            if (voiceGuidanceEnabled && this.value) {
                const cropName = getCropName(this.value, currentLang);
                const message = translations[currentLang].voiceCropSelected(cropName);
                speakText(message, langCode);
            }
        });
        
        // Add voice button for crop dropdown
        addVoiceButton(cropSelect, () => {
            const label = getTranslation(currentLang, 'selectCrop');
            speakText(label, langCode);
        });
    }
    
    // District selection voice feedback
    const districtSelect = document.getElementById('district');
    if (districtSelect) {
        districtSelect.addEventListener('change', function() {
            if (voiceGuidanceEnabled && this.value) {
                const districtName = getDistrictName(this.value, currentLang);
                const message = translations[currentLang].voiceDistrictSelected(districtName);
                speakText(message, langCode);
            }
        });
        
        // Add voice button for district dropdown
        addVoiceButton(districtSelect, () => {
            const label = getTranslation(currentLang, 'selectDistrict');
            speakText(label, langCode);
        });
    }
    
    // Date selection voice feedback
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            if (voiceGuidanceEnabled && this.value) {
                const formattedDate = formatDateForVoice(this.value, currentLang);
                const message = translations[currentLang].voiceDateSelected(formattedDate);
                speakText(message, langCode);
            }
        });
        
        // Add voice button for date input
        addVoiceButton(dateInput, () => {
            const label = getTranslation(currentLang, 'selectDate');
            speakText(label, langCode);
        });
    }
    
    // Form submission voice feedback
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            if (voiceGuidanceEnabled) {
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
        });
    }
    
    // Button click voice feedback
    const predictButton = document.querySelector('.btn-predict');
    if (predictButton) {
        predictButton.addEventListener('click', function() {
            if (voiceGuidanceEnabled) {
                const buttonText = getTranslation(currentLang, 'predictPrice');
                const message = translations[currentLang].voiceButtonClick(buttonText);
                speakText(message, langCode);
            }
        });
    }
    
    // All secondary buttons
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (voiceGuidanceEnabled) {
                const buttonText = this.textContent.trim();
                const message = translations[currentLang].voiceButtonClick(buttonText);
                speakText(message, langCode);
            }
        });
    });
    
    // Update voice guidance when language changes
    document.addEventListener('languageChanged', function(event) {
        // Reinitialize with new language
        setupVoiceGuidance();
    });
}

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

// Initialize on load
initializeVoiceGuidance();

