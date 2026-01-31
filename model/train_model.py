"""
Model Training Script for Crop Price Prediction
Uses Random Forest Regressor for price prediction
"""

import os
import pickle
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')


def load_training_data():
    """
    Load training data from CSV file
    Returns pandas DataFrame
    """
    data_path = os.path.join('data', 'crop_price_data.csv')
    
    if not os.path.exists(data_path):
        print(f"Warning: Data file not found at {data_path}")
        return None
    
    try:
        df = pd.read_csv(data_path)
        print(f"Loaded {len(df)} records from training data")
        return df
    except Exception as e:
        print(f"Error loading data: {str(e)}")
        return None


def preprocess_data(df):
    """
    Preprocess data for model training
    - Encode categorical variables (crop, district, month)
    - Handle missing values
    - Feature engineering
    """
    if df is None or len(df) == 0:
        return None, None
    
    # Create a copy to avoid modifying original
    df_processed = df.copy()
    
    # Convert Date to datetime if it exists
    if 'Date' in df_processed.columns:
        df_processed['Date'] = pd.to_datetime(df_processed['Date'], errors='coerce')
        df_processed['Year'] = df_processed['Date'].dt.year
        df_processed['Month'] = df_processed['Date'].dt.month
        df_processed['Day'] = df_processed['Date'].dt.day
    
    # Encode categorical variables using one-hot encoding
    # Crop encoding
    crop_dummies = pd.get_dummies(df_processed['Crop'], prefix='Crop')
    df_processed = pd.concat([df_processed, crop_dummies], axis=1)
    
    # District encoding (using first letters to reduce dimensions)
    district_dummies = pd.get_dummies(df_processed['District'], prefix='District')
    df_processed = pd.concat([df_processed, district_dummies], axis=1)
    
    # Select features for training
    feature_columns = []
    
    # Add crop features
    crop_cols = [col for col in df_processed.columns if col.startswith('Crop_')]
    feature_columns.extend(crop_cols)
    
    # Add district features
    district_cols = [col for col in df_processed.columns if col.startswith('District_')]
    feature_columns.extend(district_cols)
    
    # Add temporal features
    if 'Year' in df_processed.columns:
        feature_columns.append('Year')
    if 'Month' in df_processed.columns:
        feature_columns.append('Month')
    
    # Ensure all feature columns exist
    available_features = [col for col in feature_columns if col in df_processed.columns]
    
    if len(available_features) == 0:
        print("Error: No features available for training")
        return None, None
    
    X = df_processed[available_features]
    y = df_processed['Price']
    
    # Remove rows with missing values
    mask = ~(X.isnull().any(axis=1) | y.isnull())
    X = X[mask]
    y = y[mask]
    
    print(f"Preprocessed data: {len(X)} samples, {len(available_features)} features")
    
    return X, y


def train_random_forest(X, y):
    """
    Train Random Forest Regressor model
    Returns trained model and feature names
    """
    if X is None or y is None or len(X) == 0:
        return None, None
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Initialize Random Forest Regressor
    # Parameters optimized for crop price prediction
    rf_model = RandomForestRegressor(
        n_estimators=100,      # Number of trees
        max_depth=15,          # Maximum depth of trees
        min_samples_split=5,   # Minimum samples to split
        min_samples_leaf=2,    # Minimum samples in leaf
        random_state=42,
        n_jobs=-1              # Use all available cores
    )
    
    # Train the model
    print("Training Random Forest model...")
    rf_model.fit(X_train, y_train)
    
    # Evaluate model
    y_train_pred = rf_model.predict(X_train)
    y_test_pred = rf_model.predict(X_test)
    
    train_mae = mean_absolute_error(y_train, y_train_pred)
    test_mae = mean_absolute_error(y_test, y_test_pred)
    train_r2 = r2_score(y_train, y_train_pred)
    test_r2 = r2_score(y_test, y_test_pred)
    
    print(f"\nModel Performance:")
    print(f"Training MAE: {train_mae:.2f} ₹/quintal")
    print(f"Testing MAE: {test_mae:.2f} ₹/quintal")
    print(f"Training R²: {train_r2:.4f}")
    print(f"Testing R²: {test_r2:.4f}")
    
    return rf_model, X.columns.tolist()


def save_model(model, feature_names):
    """
    Save trained model and feature names to disk
    """
    model_dir = 'model'
    os.makedirs(model_dir, exist_ok=True)
    
    # Save model
    model_path = os.path.join(model_dir, 'trained_model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {model_path}")
    
    # Save feature names
    feature_path = os.path.join(model_dir, 'feature_names.pkl')
    with open(feature_path, 'wb') as f:
        pickle.dump(feature_names, f)
    print(f"Feature names saved to {feature_path}")
    
    # Save training metadata
    metadata = {
        'training_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'model_type': 'RandomForestRegressor',
        'n_features': len(feature_names)
    }
    metadata_path = os.path.join(model_dir, 'model_metadata.pkl')
    with open(metadata_path, 'wb') as f:
        pickle.dump(metadata, f)


def train_model():
    """
    Main function to train the model
    Returns True if successful, False otherwise
    """
    print("=" * 50)
    print("Crop Price Prediction Model Training")
    print("=" * 50)
    
    # Load data
    df = load_training_data()
    if df is None:
        print("Error: Could not load training data")
        return False
    
    # Preprocess data
    X, y = preprocess_data(df)
    if X is None or y is None:
        print("Error: Data preprocessing failed")
        return False
    
    # Train model
    model, feature_names = train_random_forest(X, y)
    if model is None:
        print("Error: Model training failed")
        return False
    
    # Save model
    save_model(model, feature_names)
    
    print("\n" + "=" * 50)
    print("Model training completed successfully!")
    print("=" * 50)
    
    return True


if __name__ == '__main__':
    # Train model when script is run directly
    train_model()

