/**
 * Bilingual Translation System for Crop Price Prediction
 * Supports English (en-IN) and Kannada (kn-IN)
 * 
 * This file contains all user-facing text translations for the application.
 * Translations are stored as key-value pairs for easy maintenance.
 */

const translations = {
    en: {
        // Language names
        langEnglish: "English",
        langKannada: "Kannada",
        
        // Header
        title: "🌾 Tech-Enabled Crop Price Prediction System",
        subtitle: "Karnataka Agricultural Price Forecasting",
        
        // Info box
        lastUpdated: "Last Updated:",
        
        // Form labels
        selectCrop: "Select Crop:",
        selectDistrict: "Select District:",
        selectDate: "Select Date:",
        selected: "Selected:",
        none: "None",
        predictPrice: "Predict Price",
        
        // Dropdown placeholders
        selectCropPlaceholder: "-- Select Crop --",
        selectDistrictPlaceholder: "-- Select District --",
        
        // About section
        aboutTitle: "About This System",
        about1: "✅ Predicts prices for",
        about2: "✅ Covers all districts of Karnataka",
        about3: "✅ Uses Machine Learning (Random Forest) for accurate predictions",
        about4: "✅ Updates daily with latest market data",
        about5: "✅ Shows historical price trends",
        
        // Result page
        resultTitle: "🌾 Crop Price Prediction Result",
        predictionDetails: "Prediction Details",
        crop: "Crop:",
        district: "District:",
        date: "Date:",
        predictedPrice: "Predicted Price:",
        perQuintal: "/ quintal",
        historicalTrend: "Historical Price Trend",
        makeAnotherPrediction: "Make Another Prediction",
        
        // Error page
        errorTitle: "⚠️ Error",
        somethingWentWrong: "Something went wrong",
        goBackHome: "Go Back to Home",
        
        // Audio
        listenPrice: "🔊 Listen to Price",
        speaking: "Speaking...",
        
        // Footer
        footer: "© 2024 Crop Price Prediction System | Karnataka Agriculture",
        
        // Validation messages
        fillAllFields: "Please fill in all fields including date",
        
        // Audio messages
        audioPrice: (crop, district, date, price) => 
            `The predicted price for ${crop} in ${district} on ${date} is ${price} rupees per quintal.`
    },
    
    kn: {
        // Language names
        langEnglish: "ಇಂಗ್ಲೀಷ್",
        langKannada: "ಕನ್ನಡ",
        
        // Header
        title: "🌾 ತಂತ್ರಜ್ಞಾನ-ಸಕ್ರಿಯ ಬೆಳೆ ಬೆಲೆ ಊಹಿಸುವ ವ್ಯವಸ್ಥೆ",
        subtitle: "ಕರ್ನಾಟಕ ಕೃಷಿ ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
        
        // Info box
        lastUpdated: "ಕೊನೆಯ ನವೀಕರಣ:",
        
        // Form labels
        selectCrop: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
        selectDistrict: "ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
        selectDate: "ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
        selected: "ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ:",
        none: "ಯಾವುದೂ ಇಲ್ಲ",
        predictPrice: "ಬೆಲೆಯನ್ನು ಊಹಿಸಿ",
        
        // Dropdown placeholders
        selectCropPlaceholder: "-- ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ --",
        selectDistrictPlaceholder: "-- ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ --",
        
        // About section
        aboutTitle: "ಈ ವ್ಯವಸ್ಥೆಯ ಬಗ್ಗೆ",
        about1: "✅ ಬೆಲೆಗಳನ್ನು ಊಹಿಸುತ್ತದೆ",
        about2: "✅ ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳನ್ನು ಒಳಗೊಂಡಿದೆ",
        about3: "✅ ನಿಖರವಾದ ಊಹೆಗಳಿಗಾಗಿ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ (ರ್ಯಾಂಡಮ್ ಫಾರೆಸ್ಟ್) ಬಳಸುತ್ತದೆ",
        about4: "✅ ದೈನಂದಿನವಾಗಿ ನವೀನ ಮಾರುಕಟ್ಟೆ ಡೇಟಾದೊಂದಿಗೆ ನವೀಕರಿಸುತ್ತದೆ",
        about5: "✅ ಐತಿಹಾಸಿಕ ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳನ್ನು ತೋರಿಸುತ್ತದೆ",
        
        // Result page
        resultTitle: "🌾 ಬೆಳೆ ಬೆಲೆ ಊಹಿಸುವ ಫಲಿತಾಂಶ",
        predictionDetails: "ಊಹಿಸುವ ವಿವರಗಳು",
        crop: "ಬೆಳೆ:",
        district: "ಜಿಲ್ಲೆ:",
        date: "ದಿನಾಂಕ:",
        predictedPrice: "ಊಹಿಸಿದ ಬೆಲೆ:",
        perQuintal: "/ ಕ್ವಿಂಟಾಲ್",
        historicalTrend: "ಐತಿಹಾಸಿಕ ಬೆಲೆ ಪ್ರವೃತ್ತಿ",
        makeAnotherPrediction: "ಮತ್ತೊಂದು ಊಹೆಯನ್ನು ಮಾಡಿ",
        
        // Error page
        errorTitle: "⚠️ ದೋಷ",
        somethingWentWrong: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
        goBackHome: "ಮನೆಗೆ ಹಿಂತಿರುಗಿ",
        
        // Audio
        listenPrice: "🔊 ಬೆಲೆಯನ್ನು ಕೇಳಿ",
        speaking: "ಮಾತನಾಡುತ್ತಿದೆ...",
        
        // Footer
        footer: "© 2024 ಬೆಳೆ ಬೆಲೆ ಊಹಿಸುವ ವ್ಯವಸ್ಥೆ | ಕರ್ನಾಟಕ ಕೃಷಿ",
        
        // Validation messages
        fillAllFields: "ದಯವಿಟ್ಟು ದಿನಾಂಕ ಸೇರಿದಂತೆ ಎಲ್ಲಾ ಜಾಗಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
        
        // Audio messages
        audioPrice: (crop, district, date, price) => 
            `${district} ನಲ್ಲಿ ${date} ರಂದು ${crop} ಗಾಗಿ ಊಹಿಸಿದ ಬೆಲೆ ${price} ರೂಪಾಯಿಗಳು ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ಗೆ.`
    }
};

/**
 * Get translation for a given key in the current language
 * @param {string} lang - Language code ('en' or 'kn')
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function getTranslation(lang, key) {
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}

/**
 * Get current language from localStorage or default to 'en'
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

/**
 * Set current language and save to localStorage
 * @param {string} lang - Language code ('en' or 'kn')
 */
function setCurrentLanguage(lang) {
    localStorage.setItem('language', lang);
}

