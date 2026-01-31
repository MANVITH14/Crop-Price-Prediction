/**
 * Web Speech API Integration for Text-to-Speech
 * 
 * This module provides audio output functionality using the browser's
 * built-in Web Speech API (SpeechSynthesis).
 * 
 * Features:
 * - No backend dependencies (pure browser API)
 * - Supports English (en-IN) and Kannada (kn-IN)
 * - Lightweight and deployment-safe
 * - Works on modern browsers
 * 
 * Browser Support:
 * - Chrome/Edge: Full support
 * - Firefox: Full support
 * - Safari: Full support
 * - Mobile browsers: Supported
 */

// Check if browser supports Web Speech API
const speechSupported = 'speechSynthesis' in window;

/**
 * Speak text using Web Speech API
 * @param {string} text - Text to speak
 * @param {string} lang - Language code ('en-IN' or 'kn-IN')
 * @param {Function} onStart - Callback when speech starts
 * @param {Function} onEnd - Callback when speech ends
 */
function speakText(text, lang = 'en-IN', onStart = null, onEnd = null) {
    if (!speechSupported) {
        console.warn('Web Speech API not supported in this browser');
        if (onEnd) onEnd();
        return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Event handlers
    utterance.onstart = function() {
        if (onStart) onStart();
    };
    
    utterance.onend = function() {
        if (onEnd) onEnd();
    };
    
    utterance.onerror = function(event) {
        console.error('Speech synthesis error:', event);
        if (onEnd) onEnd();
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
}

/**
 * Stop current speech
 */
function stopSpeech() {
    if (speechSupported) {
        window.speechSynthesis.cancel();
    }
}

/**
 * Speak predicted price in selected language
 * @param {string} crop - Crop name (English)
 * @param {string} district - District name (English)
 * @param {string} date - Date string
 * @param {number} price - Predicted price
 */
function speakPrice(crop, district, date, price) {
    const currentLang = getCurrentLanguage();
    const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
    
    // Convert crop and district to current language
    const cropName = getCropName(crop, currentLang);
    const districtName = getDistrictName(district, currentLang);
    
    // Get audio message based on language
    const audioMessage = translations[currentLang].audioPrice(cropName, districtName, date, price);
    
    // Update button state
    const audioBtn = document.getElementById('audio-btn');
    if (audioBtn) {
        const originalText = audioBtn.textContent;
        audioBtn.textContent = getTranslation(currentLang, 'speaking');
        audioBtn.disabled = true;
        
        speakText(audioMessage, langCode, null, function() {
            audioBtn.textContent = originalText;
            audioBtn.disabled = false;
        });
    } else {
        speakText(audioMessage, langCode);
    }
}

/**
 * Speak error message in selected language
 * @param {string} errorMessage - Error message to speak
 */
function speakError(errorMessage) {
    const currentLang = getCurrentLanguage();
    const langCode = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
    
    // For error messages, speak as-is (they're already in the correct language)
    speakText(errorMessage, langCode);
}

/**
 * Check if audio is currently playing
 * @returns {boolean} True if speech is active
 */
function isSpeaking() {
    return speechSupported && window.speechSynthesis.speaking;
}

