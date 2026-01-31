# Project Information - Crop Price Prediction System

## Academic Project Details

This is a **Tech-Enabled Crop Price Prediction System for Karnataka** built as a full-stack Flask web application.

## Key Features Implemented

### ✅ Core Requirements
- [x] Flask backend with proper routing
- [x] Three crops: Coconut, Arecanut, Pepper
- [x] All 30 Karnataka districts
- [x] Random Forest Regressor ML model
- [x] Responsive HTML/CSS frontend
- [x] Historical price trend visualization
- [x] Daily data updates and model retraining
- [x] Last Updated Date display

### ✅ Code Quality
- [x] Clear comments throughout codebase
- [x] Modular code structure
- [x] Separate training and prediction logic
- [x] Comprehensive error handling
- [x] User-friendly error messages

### ✅ UI/UX
- [x] Simple, farmer-friendly interface
- [x] Responsive design (mobile, tablet, desktop)
- [x] Clean, modern design
- [x] Easy-to-use dropdowns

## File Structure

```
CROP PRICE/
├── app.py                          # Main Flask application (235 lines)
├── run.py                          # Simple run script
├── requirements.txt                # Python dependencies
├── README.md                       # Complete documentation
├── SETUP.md                        # Setup instructions
├── PROJECT_INFO.md                 # This file
├── .gitignore                      # Git ignore rules
│
├── model/                          # Machine Learning Module
│   ├── __init__.py
│   ├── train_model.py             # Model training (150+ lines)
│   ├── train_model_if_needed.py   # Auto-training logic
│   └── predict.py                 # Prediction module (125 lines)
│
├── data/                           # Data Management
│   ├── __init__.py
│   ├── data_handler.py            # Data loading/updating (200+ lines)
│   └── crop_price_data.csv        # Generated on first run
│
├── templates/                      # HTML Templates
│   ├── index.html                 # Homepage with form
│   ├── result.html                # Results display page
│   └── error.html                 # Error page
│
└── static/                         # Static Files
    └── css/
        └── style.css              # Complete stylesheet (400+ lines)
```

## Technology Stack

- **Backend**: Flask 3.0.0
- **Machine Learning**: scikit-learn (Random Forest Regressor)
- **Data Processing**: pandas, numpy
- **Visualization**: matplotlib
- **Frontend**: HTML5, CSS3, JavaScript

## Model Details

- **Algorithm**: Random Forest Regressor
- **Parameters**:
  - n_estimators: 100
  - max_depth: 15
  - min_samples_split: 5
  - min_samples_leaf: 2
- **Features**: Crop type, District, Month, Year
- **Training**: Automatic on first run, daily retraining

## API Endpoints

1. `GET /` - Homepage
2. `POST /predict` - Form submission for prediction
3. `POST /api/predict` - JSON API for predictions
4. `POST /update` - Manual data update trigger

## Demo Ready Features

✅ Complete working application  
✅ Sample data generation  
✅ Automatic model training  
✅ Error handling and validation  
✅ Professional UI design  
✅ Comprehensive documentation  
✅ Ready for presentation and viva  

## How to Run

1. Install dependencies: `pip install -r requirements.txt`
2. Run application: `python app.py` or `python run.py`
3. Open browser: `http://localhost:5000`
4. Select crop, district, and month
5. Get prediction with graph

## For Viva/Defense

### Key Points to Highlight:
1. **Modular Architecture**: Separate modules for training, prediction, and data handling
2. **ML Implementation**: Random Forest for accurate price prediction
3. **Real-world Application**: Designed for Karnataka farmers
4. **Daily Updates**: Automatic data refresh and model retraining
5. **User Experience**: Simple interface suitable for farmers
6. **Scalability**: Can be extended to more crops and regions

### Technical Highlights:
- Clean code with comments
- Error handling throughout
- Responsive design
- RESTful API design
- Data preprocessing and feature engineering

## Future Enhancements (For Discussion)

- Integration with real Agmarknet API
- More advanced ML models (LSTM, XGBoost)
- User authentication and saved predictions
- SMS/Email price alerts
- Mobile app version

---

**Project Status**: ✅ Complete and Ready for Demo

