"""
Module to check if model needs training and train if necessary
Handles daily retraining logic
"""

import os
import pickle
from datetime import datetime, timedelta
from model.train_model import train_model


def get_model_metadata():
    """
    Get model metadata if it exists
    Returns metadata dict or None
    """
    metadata_path = os.path.join('model', 'model_metadata.pkl')
    if os.path.exists(metadata_path):
        try:
            with open(metadata_path, 'rb') as f:
                return pickle.load(f)
        except:
            return None
    return None


def should_retrain_model():
    """
    Check if model should be retrained
    Returns True if model doesn't exist or is older than 1 day
    """
    model_path = os.path.join('model', 'trained_model.pkl')
    
    # If model doesn't exist, need to train
    if not os.path.exists(model_path):
        return True
    
    # Check metadata for last training date
    metadata = get_model_metadata()
    if metadata is None:
        return True
    
    # Check if model is older than 1 day
    try:
        training_date = datetime.strptime(metadata['training_date'], '%Y-%m-%d %H:%M:%S')
        days_old = (datetime.now() - training_date).days
        return days_old >= 1
    except:
        return True


def train_model_if_needed(force_retrain=False):
    """
    Train model if it doesn't exist or needs retraining
    force_retrain: If True, retrain regardless of last training date
    """
    if force_retrain or should_retrain_model():
        print("Model training required...")
        success = train_model()
        if success:
            print("Model training completed")
        else:
            print("Model training failed")
        return success
    else:
        print("Model is up to date, no training needed")
        return True

