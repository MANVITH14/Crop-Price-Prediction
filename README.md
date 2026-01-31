# Tech-Enabled Crop Price Prediction System for Karnataka

A full-stack Flask web application that predicts crop prices for Coconut, Arecanut, and Pepper across all districts of Karnataka using Machine Learning (Random Forest Regressor).

## Features

- 🌾 **Three Crops**: Coconut, Arecanut, and Pepper
- 🗺️ **All Karnataka Districts**: Covers all 30 districts of Karnataka
- 🤖 **Machine Learning**: Uses Random Forest Regressor for accurate predictions
- 📊 **Historical Trends**: Visualizes price trends with interactive graphs
- 🔄 **Daily Updates**: Automatically updates data and retrains model daily
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 👨‍🌾 **Farmer-Friendly**: Simple, intuitive interface designed for farmers

## Project Structure

```
CROP PRICE/
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── model/                      # Machine Learning models
│   ├── __init__.py
│   ├── train_model.py          # Model training script
│   ├── train_model_if_needed.py # Auto-training logic
│   └── predict.py              # Prediction module
├── data/                       # Data storage
│   ├── __init__.py
│   ├── data_handler.py         # Data management
│   └── crop_price_data.csv     # Historical data (generated)
├── templates/                  # HTML templates
│   ├── index.html              # Homepage
│   ├── result.html             # Results page
│   └── error.html              # Error page
└── static/                     # Static files
    └── css/
        └── style.css           # Stylesheet
```

## Installation

1. **Clone or download this repository**

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application:**
   ```bash
   python app.py
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5000
   ```

## Usage

1. **Select Crop**: Choose from Coconut, Arecanut, or Pepper
2. **Select District**: Choose any district in Karnataka
3. **Select Month**: Choose the month for price prediction
4. **Click "Predict Price"**: Get the predicted price and historical trend graph

## How It Works

### Data Management
- The system uses historical Agmarknet-style data
- Sample data is automatically generated if no data file exists
- Data is updated daily (simulated or via API)
- Model retrains automatically when data is updated

### Machine Learning Model
- **Algorithm**: Random Forest Regressor
- **Features**: Crop type, District, Month, Year
- **Training**: Model trains automatically on first run and retrains daily
- **Performance**: Optimized for crop price prediction accuracy

### Daily Updates
- System checks for new data daily
- Model retrains automatically when new data is available
- Last updated date is displayed on the website

## API Endpoints

### Web Interface
- `GET /` - Homepage with prediction form
- `POST /predict` - Submit prediction request

### API (JSON)
- `POST /api/predict` - Get prediction as JSON
  ```json
  {
    "crop": "Coconut",
    "district": "Mysuru",
    "month": "January"
  }
  ```

### Data Management
- `POST /update` - Manually trigger data update and model retraining

## Model Training

To manually train the model:

```bash
python model/train_model.py
```

The model will automatically train:
- On first application startup
- Daily when new data is available
- When manually triggered via `/update` endpoint

## Technical Details

### Dependencies
- **Flask**: Web framework
- **pandas**: Data manipulation
- **numpy**: Numerical computations
- **scikit-learn**: Machine learning
- **matplotlib**: Graph generation

### Model Parameters
- **Algorithm**: Random Forest Regressor
- **Trees**: 100
- **Max Depth**: 15
- **Min Samples Split**: 5
- **Min Samples Leaf**: 2

## Error Handling

The system includes comprehensive error handling:
- Invalid crop/district/month selection
- Missing model files
- Data loading errors
- Prediction failures
- User-friendly error messages

## Academic Project Features

✅ Clear code comments throughout  
✅ Simple UI suitable for farmers  
✅ Modular code structure  
✅ Separate training and prediction logic  
✅ Ready for college demo and viva  
✅ Complete documentation  

## Future Enhancements

- Integration with real Agmarknet API
- More crops and regions
- Advanced ML models (LSTM, XGBoost)
- User accounts and saved predictions
- Email/SMS notifications for price alerts
- Mobile app version

## License

This project is created for academic purposes.

## Support

For issues or questions, please contact the development team.

---

**Developed for Karnataka Agriculture - Crop Price Prediction System**

