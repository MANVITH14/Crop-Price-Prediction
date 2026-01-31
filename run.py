"""
Simple script to run the Flask application
"""

from app import app

if __name__ == '__main__':
    print("=" * 60)
    print("Crop Price Prediction System - Karnataka")
    print("=" * 60)
    print("\nStarting Flask application...")
    print("Open your browser and navigate to: http://localhost:5000")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 60)
    app.run(debug=True, host='0.0.0.0', port=5000)

