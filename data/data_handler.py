"""
Data Handler Module
Manages loading, updating, and retrieving crop price data
"""

import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random


def get_data_path():
    """
    Get path to data CSV file
    """
    return os.path.join('data', 'crop_price_data.csv')


def initialize_sample_data():
    """
    Initialize sample data if data file doesn't exist
    Creates realistic sample data for the three crops in Karnataka
    """
    data_path = get_data_path()
    
    if os.path.exists(data_path):
        return
    
    print("Initializing sample data...")
    
    # Karnataka districts
    districts = [
        'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
        'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga',
        'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri',
        'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur',
        'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'
    ]
    
    # Crops with base prices (₹ per quintal)
    crop_base_prices = {
        'Coconut': 8000,      # Base price around ₹8000/quintal
        'Arecanut': 35000,    # Base price around ₹35000/quintal
        'Pepper': 45000       # Base price around ₹45000/quintal
    }
    
    # Generate historical data for last 2 years
    data_records = []
    start_date = datetime.now() - timedelta(days=730)  # 2 years back
    
    for crop in ['Coconut', 'Arecanut', 'Pepper']:
        base_price = crop_base_prices[crop]
        
        for district in districts:
            # Generate data for each month
            current_date = start_date
            while current_date < datetime.now():
                # Add seasonal variation
                month = current_date.month
                seasonal_factor = 1.0
                
                # Seasonal variations (example: higher prices in certain months)
                if month in [10, 11, 12, 1]:  # Oct-Dec, Jan
                    seasonal_factor = 1.1
                elif month in [6, 7, 8]:  # Monsoon months
                    seasonal_factor = 0.95
                
                # District-specific variations
                district_factor = 1.0 + (hash(district) % 20 - 10) / 100  # ±10% variation
                
                # Random variation
                random_factor = 1.0 + random.uniform(-0.15, 0.15)  # ±15% random variation
                
                # Calculate price
                price = base_price * seasonal_factor * district_factor * random_factor
                
                # Ensure reasonable price range
                price = max(base_price * 0.7, min(base_price * 1.5, price))
                
                data_records.append({
                    'Date': current_date.strftime('%Y-%m-%d'),
                    'Crop': crop,
                    'District': district,
                    'Price': round(price, 2)
                })
                
                # Move to next month
                if current_date.month == 12:
                    current_date = current_date.replace(year=current_date.year + 1, month=1, day=1)
                else:
                    current_date = current_date.replace(month=current_date.month + 1, day=1)
    
    # Create DataFrame
    df = pd.DataFrame(data_records)
    
    # Save to CSV
    os.makedirs('data', exist_ok=True)
    df.to_csv(data_path, index=False)
    print(f"Sample data initialized with {len(df)} records")


def load_data():
    """
    Load data from CSV file
    Returns pandas DataFrame
    """
    data_path = get_data_path()
    
    # Initialize sample data if needed
    if not os.path.exists(data_path):
        initialize_sample_data()
    
    try:
        df = pd.read_csv(data_path)
        df['Date'] = pd.to_datetime(df['Date'])
        return df
    except Exception as e:
        print(f"Error loading data: {str(e)}")
        return None


def update_daily_data():
    """
    Update data with latest daily prices
    Simulates fetching new data from Agmarknet API
    In production, this would fetch from actual API
    """
    print("Updating daily data...")
    
    data_path = get_data_path()
    
    # Load existing data
    df = load_data()
    if df is None:
        initialize_sample_data()
        df = load_data()
    
    # Get today's date
    today = datetime.now().date()
    
    # Check if today's data already exists
    df['Date'] = pd.to_datetime(df['Date'])
    latest_date = df['Date'].max().date()
    
    if latest_date >= today:
        print("Data is already up to date")
        return
    
    # Generate new data for today
    districts = df['District'].unique()
    crops = df['Crop'].unique()
    
    new_records = []
    for crop in crops:
        for district in districts:
            # Get recent average price for this crop-district combination
            recent_data = df[(df['Crop'] == crop) & 
                           (df['District'] == district) &
                           (df['Date'] >= (datetime.now() - timedelta(days=30)).date())]
            
            if len(recent_data) > 0:
                base_price = recent_data['Price'].mean()
            else:
                # Fallback to overall average
                base_price = df[df['Crop'] == crop]['Price'].mean()
            
            # Add small random variation for daily update
            price = base_price * (1.0 + random.uniform(-0.05, 0.05))
            
            new_records.append({
                'Date': today.strftime('%Y-%m-%d'),
                'Crop': crop,
                'District': district,
                'Price': round(price, 2)
            })
    
    # Append new records
    new_df = pd.DataFrame(new_records)
    df = pd.concat([df, new_df], ignore_index=True)
    
    # Save updated data
    df.to_csv(data_path, index=False)
    print(f"Updated data with {len(new_records)} new records for {today}")


def get_historical_data(crop, district, days=365):
    """
    Get historical price data for a specific crop and district
    Returns DataFrame with Date and Price columns
    """
    df = load_data()
    if df is None:
        return None
    
    # Filter data
    filtered = df[(df['Crop'] == crop) & (df['District'] == district)].copy()
    
    if len(filtered) == 0:
        return None
    
    # Sort by date
    filtered = filtered.sort_values('Date')
    
    # Get last N days
    cutoff_date = datetime.now() - timedelta(days=days)
    filtered = filtered[filtered['Date'] >= cutoff_date]
    
    # Return only Date and Price columns
    return filtered[['Date', 'Price']].reset_index(drop=True)


def get_last_updated_date():
    """
    Get the last updated date of the data
    Returns formatted date string
    """
    df = load_data()
    if df is None:
        return "N/A"
    
    try:
        latest_date = df['Date'].max()
        return latest_date.strftime('%Y-%m-%d')
    except:
        return "N/A"


if __name__ == '__main__':
    # Test data handler
    initialize_sample_data()
    print(f"Last updated: {get_last_updated_date()}")
    
    # Test historical data retrieval
    hist_data = get_historical_data('Coconut', 'Mysuru')
    if hist_data is not None:
        print(f"\nHistorical data for Coconut in Mysuru:")
        print(hist_data.head())

