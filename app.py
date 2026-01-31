"""
Flask Web Application for Tech-Enabled Crop Price Prediction System
Crops: Coconut, Arecanut, Pepper
Region: Karnataka
"""

from flask import Flask, render_template, request, jsonify, send_file
import os
import pickle
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import io
import base64
from model.train_model_if_needed import train_model_if_needed
from model.predict import predict_price
from data.data_handler import get_historical_data, update_daily_data, get_last_updated_date

app = Flask(__name__)
app.config['SECRET_KEY'] = 'crop-price-prediction-karnataka-2024'

# Karnataka districts list
KARNATAKA_DISTRICTS = [
    'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
    'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga',
    'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri',
    'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur',
    'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'
]

# Valid crops
VALID_CROPS = ['Coconut', 'Arecanut', 'Pepper']


@app.route('/')
def index():
    """
    Homepage route - displays the main form for crop price prediction
    """
    last_updated = get_last_updated_date()
    # Set date range for date picker (today to 1 year ahead)
    today = datetime.now().date()
    max_date = (datetime.now() + timedelta(days=365)).date()
    min_date_str = today.strftime('%Y-%m-%d')
    max_date_str = max_date.strftime('%Y-%m-%d')
    
    return render_template('index.html', 
                         districts=KARNATAKA_DISTRICTS,
                         crops=VALID_CROPS,
                         min_date=min_date_str,
                         max_date=max_date_str,
                         last_updated=last_updated)


@app.route('/predict', methods=['POST'])
def predict():
    """
    Prediction route - handles form submission and returns prediction results
    """
    try:
        # Get form data
        crop = request.form.get('crop', '').strip()
        district = request.form.get('district', '').strip()
        date_str = request.form.get('date', '').strip()
        
        # Validate inputs
        if not crop or crop not in VALID_CROPS:
            return render_template('error.html', 
                                 error_message="Invalid crop selected. Please select Coconut, Arecanut, or Pepper.")
        
        if not district or district not in KARNATAKA_DISTRICTS:
            return render_template('error.html', 
                                 error_message="Invalid district selected. Please select a valid Karnataka district.")
        
        if not date_str:
            return render_template('error.html', 
                                 error_message="Please select a valid date.")
        
        # Parse and validate date
        try:
            selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            today = datetime.now().date()
            max_date = (datetime.now() + timedelta(days=365)).date()
            
            if selected_date < today or selected_date > max_date:
                return render_template('error.html', 
                                     error_message="Please select a date between today and one year from now.")
        except ValueError:
            return render_template('error.html', 
                                 error_message="Invalid date format. Please select a valid date.")
        
        # Ensure model is trained
        train_model_if_needed()
        
        # Load model and make prediction
        model_path = os.path.join('model', 'trained_model.pkl')
        if not os.path.exists(model_path):
            return render_template('error.html', 
                                 error_message="Model not found. Please train the model first.")
        
        # Make prediction
        predicted_price = predict_price(crop, district, selected_date)
        
        if predicted_price is None:
            return render_template('error.html', 
                                 error_message="Prediction failed. Please try again or contact support.")
        
        # Get historical data for graph
        historical_data = get_historical_data(crop, district)
        
        # Generate trend graph
        graph_url = generate_trend_graph(historical_data, crop, district, selected_date, predicted_price)
        
        # Get last updated date
        last_updated = get_last_updated_date()
        
        # Format date for display
        formatted_date = selected_date.strftime('%B %d, %Y')
        
        return render_template('result.html',
                             crop=crop,
                             district=district,
                             date=formatted_date,
                             date_raw=date_str,
                             predicted_price=round(predicted_price, 2),
                             graph_url=graph_url,
                             last_updated=last_updated)
    
    except Exception as e:
        return render_template('error.html', 
                             error_message=f"An error occurred: {str(e)}. Please try again.")


def generate_trend_graph(historical_data, crop, district, selected_date, predicted_price):
    """
    Generate historical price trend graph with predicted price
    Returns base64 encoded image URL
    """
    try:
        plt.figure(figsize=(12, 6))
        
        if historical_data is not None and len(historical_data) > 0:
            # Plot historical data
            dates = pd.to_datetime(historical_data['Date'])
            prices = historical_data['Price']
            
            plt.plot(dates, prices, 'b-', linewidth=2, label='Historical Prices', marker='o', markersize=4)
        
        # Add predicted price point
        pred_date = pd.to_datetime(selected_date)
        plt.plot(pred_date, predicted_price, 'ro', markersize=10, label=f'Predicted Price ({selected_date.strftime("%b %d, %Y")})')
        
        plt.xlabel('Date', fontsize=12, fontweight='bold')
        plt.ylabel('Price (₹ per quintal)', fontsize=12, fontweight='bold')
        plt.title(f'Price Trend: {crop} in {district}', fontsize=14, fontweight='bold')
        plt.legend(loc='best')
        plt.grid(True, alpha=0.3)
        plt.xticks(rotation=45)
        plt.tight_layout()
        
        # Convert plot to base64 string
        img = io.BytesIO()
        plt.savefig(img, format='png', dpi=100, bbox_inches='tight')
        img.seek(0)
        plot_url = base64.b64encode(img.getvalue()).decode()
        plt.close()
        
        return f"data:image/png;base64,{plot_url}"
    
    except Exception as e:
        print(f"Error generating graph: {str(e)}")
        return None


@app.route('/api/predict', methods=['POST'])
def api_predict():
    """
    API endpoint for programmatic access to predictions
    Returns JSON response
    """
    try:
        data = request.get_json()
        crop = data.get('crop', '').strip()
        district = data.get('district', '').strip()
        date_str = data.get('date', '').strip()
        
        # Validate inputs
        if crop not in VALID_CROPS:
            return jsonify({'error': 'Invalid crop'}), 400
        
        if district not in KARNATAKA_DISTRICTS:
            return jsonify({'error': 'Invalid district'}), 400
        
        if not date_str:
            return jsonify({'error': 'Invalid date'}), 400
        
        # Parse date
        try:
            selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Ensure model is trained
        train_model_if_needed()
        
        # Make prediction
        predicted_price = predict_price(crop, district, selected_date)
        
        if predicted_price is None:
            return jsonify({'error': 'Prediction failed'}), 500
        
        return jsonify({
            'crop': crop,
            'district': district,
            'date': date_str,
            'formatted_date': selected_date.strftime('%B %d, %Y'),
            'predicted_price': round(predicted_price, 2),
            'unit': '₹ per quintal',
            'last_updated': get_last_updated_date()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/update', methods=['POST'])
def update_data():
    """
    Manual trigger for daily data update (can be called by cron job or scheduler)
    """
    try:
        update_daily_data()
        train_model_if_needed(force_retrain=True)
        return jsonify({
            'status': 'success',
            'message': 'Data updated and model retrained',
            'last_updated': get_last_updated_date()
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('model', exist_ok=True)
    os.makedirs('data', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    
    # Train model if needed on startup
    print("Initializing application...")
    train_model_if_needed()
    
    # Start daily update scheduler in background thread
    try:
        from scheduler import start_scheduler_thread
        scheduler_thread = start_scheduler_thread()
        print("Daily update scheduler started (runs daily at 2:00 AM and checks hourly)")
    except Exception as e:
        print(f"Warning: Could not start scheduler: {str(e)}")
        print("Daily updates can still be triggered manually via /update endpoint")
    
    # Run Flask app
    # Get port from environment variable (Render provides this) or use default 5000
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    print("\n" + "="*60)
    print("Flask application starting...")
    print(f"Port: {port}")
    print("="*60 + "\n")
    app.run(debug=debug_mode, host='0.0.0.0', port=port)

