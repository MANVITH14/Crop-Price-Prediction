"""
Prediction Module for Crop Price Prediction
Handles making predictions using the trained model
"""

import os
import pickle
import pandas as pd
import numpy as np


def load_model():
    """
    Load trained model and feature names from disk
    Returns model and feature_names tuple
    """
    model_path = os.path.join('model', 'trained_model.pkl')
    feature_path = os.path.join('model', 'feature_names.pkl')
    
    if not os.path.exists(model_path) or not os.path.exists(feature_path):
        return None, None
    
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        
        with open(feature_path, 'rb') as f:
            feature_names = pickle.load(f)
        
        return model, feature_names
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None, None


def encode_features(crop, district, month):
    """
    Encode crop, district, and month into feature vector
    Returns pandas DataFrame with encoded features
    """
    # Month name to number mapping
    month_map = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4,
        'May': 5, 'June': 6, 'July': 7, 'August': 8,
        'September': 9, 'October': 10, 'November': 11, 'December': 12
    }
    
    # Load feature names to know what features to create
    model, feature_names = load_model()
    if feature_names is None:
        return None
    
    # Create a DataFrame with zeros for all features
    features = pd.DataFrame(0, index=[0], columns=feature_names)
    
    # Set crop feature
    crop_col = f'Crop_{crop}'
    if crop_col in features.columns:
        features[crop_col] = 1
    
    # Set district feature
    district_col = f'District_{district}'
    if district_col in features.columns:
        features[district_col] = 1
    
    # Set month feature
    if 'Month' in features.columns:
        features['Month'] = month_map.get(month, 1)
    
    # Set year feature (use current year)
    if 'Year' in features.columns:
        from datetime import datetime
        features['Year'] = datetime.now().year
    
    return features


def predict_price(crop, district, month):
    """
    Predict crop price for given crop, district, and month
    Returns predicted price in ₹ per quintal
    """
    # Load model
    model, feature_names = load_model()
    if model is None:
        print("Error: Model not found. Please train the model first.")
        return None
    
    # Encode features
    features = encode_features(crop, district, month)
    if features is None:
        print("Error: Feature encoding failed")
        return None
    
    # Ensure features match model's expected features
    # Add missing columns with zeros
    for col in feature_names:
        if col not in features.columns:
            features[col] = 0
    
    # Reorder columns to match training data
    features = features[feature_names]
    
    # Make prediction
    try:
        prediction = model.predict(features)[0]
        return max(0, prediction)  # Ensure non-negative price
    except Exception as e:
        print(f"Error making prediction: {str(e)}")
        return None


if __name__ == '__main__':
    # Test prediction
    test_crop = 'Coconut'
    test_district = 'Mysuru'
    test_month = 'January'
    
    price = predict_price(test_crop, test_district, test_month)
    if price:
        print(f"Predicted price for {test_crop} in {test_district} for {test_month}: ₹{price:.2f} per quintal")
    else:
        print("Prediction failed")

