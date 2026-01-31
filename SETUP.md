# Setup Guide - Crop Price Prediction System

## Quick Start

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run the Application

**Option A: Using app.py directly**
```bash
python app.py
```

**Option B: Using run.py**
```bash
python run.py
```

### Step 3: Access the Application

Open your web browser and navigate to:
```
http://localhost:5000
```

## First Run

On the first run, the system will:
1. ✅ Create necessary directories (model, data, templates, static)
2. ✅ Generate sample data if no data file exists
3. ✅ Train the machine learning model automatically
4. ✅ Be ready to make predictions

## Manual Model Training

If you need to manually train the model:

```bash
python model/train_model.py
```

## Daily Updates

The system automatically:
- Checks for new data daily
- Retrains the model when new data is available
- Updates the "Last Updated" date on the website

To manually trigger an update:

```bash
# Using curl or similar tool
curl -X POST http://localhost:5000/update
```

Or visit the endpoint in your browser after starting the server.

## Testing the API

You can test the prediction API using curl:

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"crop": "Coconut", "district": "Mysuru", "month": "January"}'
```

## Troubleshooting

### Issue: ModuleNotFoundError
**Solution**: Make sure you're in the project root directory and all dependencies are installed.

### Issue: Model not found
**Solution**: The model will be created automatically on first run. If it doesn't, run:
```bash
python model/train_model.py
```

### Issue: Port already in use
**Solution**: Change the port in `app.py` or `run.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use different port
```

### Issue: Data file not found
**Solution**: The system will automatically generate sample data on first run. If it doesn't, the data handler will create it.

## Project Structure

```
CROP PRICE/
├── app.py                 # Main Flask app
├── run.py                 # Simple run script
├── requirements.txt       # Dependencies
├── README.md             # Main documentation
├── SETUP.md              # This file
├── model/                # ML models
├── data/                 # Data files
├── templates/            # HTML templates
└── static/              # CSS and static files
```

## System Requirements

- Python 3.7 or higher
- 2GB RAM minimum
- Internet connection (for installing packages)

## Support

For issues or questions, refer to the main README.md file.

