# How the Application Works - Complete Guide

## 🚀 Quick Start

1. **Install dependencies**: `pip install -r requirements.txt`
2. **Run the app**: `python app.py`
3. **Open browser**: `http://localhost:5000`

## 📋 Why It Might Not Be Running

### Common Issues:

1. **Port 5000 already in use**
   - **Solution**: Change port in `app.py` (line 233): `port=5001`
   - **Or**: Close other applications using port 5000

2. **Missing dependencies**
   - **Solution**: Run `pip install -r requirements.txt`

3. **Python path issues**
   - **Solution**: Make sure you're in the project root directory
   - **Solution**: Check Python version: `python --version` (needs 3.7+)

4. **First run taking time**
   - **Normal**: First run generates data and trains model (1-2 minutes)
   - **Wait**: Check console for "Model training completed" message

## 🔄 How Daily Price Updates Work

### Automatic Updates (Built-in)

The system now has **automatic daily updates**:

1. **Scheduler Thread**: Runs in background while Flask app is running
2. **Daily at 2:00 AM**: Automatically updates prices and retrains model
3. **Hourly Checks**: Checks every hour if update is needed
4. **No Manual Work**: Completely automatic!

### Update Process:

```
┌─────────────────────────────────┐
│  Daily Scheduler (2:00 AM)      │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Check if data needs update     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Fetch/Generate new prices     │
│  (for all crops & districts)    │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Add new data to CSV file       │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Retrain ML model with         │
│  updated data                   │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Update "Last Updated" date    │
│  on website                     │
└─────────────────────────────────┘
```

### Manual Update (Optional)

You can also manually trigger updates:

**Method 1: Via Browser/API**
```
POST http://localhost:5000/update
```

**Method 2: Via Python Script**
```python
from data.data_handler import update_daily_data
from model.train_model_if_needed import train_model_if_needed

update_daily_data()
train_model_if_needed(force_retrain=True)
```

## 📊 Data Flow

### 1. Data Storage
- **Location**: `data/crop_price_data.csv`
- **Format**: CSV with columns: Date, Crop, District, Price
- **Generated**: Automatically on first run if not exists

### 2. Model Training
- **Algorithm**: Random Forest Regressor
- **Location**: `model/trained_model.pkl`
- **Auto-training**: On first run and daily updates
- **Features**: Crop type, District, Month, Year

### 3. Prediction Flow
```
User selects: Crop + District + Month
        ↓
Feature encoding (one-hot encoding)
        ↓
Load trained model
        ↓
Make prediction
        ↓
Get historical data
        ↓
Generate trend graph
        ↓
Display results
```

## 🛠️ Troubleshooting

### App Not Starting

**Check 1: Dependencies**
```bash
pip list | findstr Flask
pip list | findstr pandas
```

**Check 2: Port Availability**
```bash
netstat -ano | findstr :5000
```

**Check 3: Python Version**
```bash
python --version
# Should be 3.7 or higher
```

**Check 4: Run with Error Output**
```bash
python app.py
# Look for error messages in console
```

### Updates Not Working

**Check 1: Scheduler Started**
- Look for message: "Daily update scheduler started"
- If not, scheduler might have failed to start

**Check 2: Manual Test**
```python
from scheduler import daily_update_job
daily_update_job()
```

**Check 3: Check Logs**
- Look at console output for update messages
- Check for error messages

### Model Not Training

**Check 1: Data File Exists**
```bash
dir data\crop_price_data.csv
```

**Check 2: Manual Training**
```bash
python model/train_model.py
```

**Check 3: Check Model Files**
```bash
dir model\trained_model.pkl
dir model\feature_names.pkl
```

## 📝 File Structure Explained

```
CROP PRICE/
├── app.py                    # Main Flask application
│   ├── Routes: /, /predict, /api/predict, /update
│   └── Starts scheduler on startup
│
├── scheduler.py              # Daily update scheduler
│   ├── Runs daily at 2:00 AM
│   └── Checks hourly for updates
│
├── model/
│   ├── train_model.py       # Model training logic
│   ├── train_model_if_needed.py  # Auto-training check
│   └── predict.py           # Prediction logic
│
├── data/
│   └── data_handler.py      # Data loading/updating
│
└── templates/ & static/      # Frontend files
```

## 🎯 Key Features

✅ **Automatic Daily Updates**: Runs at 2:00 AM daily  
✅ **Smart Scheduling**: Checks hourly if update needed  
✅ **Auto Model Retraining**: Retrains when new data added  
✅ **Manual Trigger**: Can update manually via API  
✅ **Error Handling**: Graceful error handling throughout  
✅ **User-Friendly**: Simple interface for farmers  

## 🔍 Verification Steps

1. **App Running?**
   - Open: `http://localhost:5000`
   - Should see homepage

2. **Updates Working?**
   - Check console for scheduler messages
   - Look for "Daily update scheduler started"

3. **Model Trained?**
   - Check `model/` folder for `.pkl` files
   - Try making a prediction

4. **Data Generated?**
   - Check `data/crop_price_data.csv` exists
   - Should have thousands of records

## 💡 Tips

1. **Keep App Running**: For automatic updates, keep Flask app running 24/7
2. **Check Logs**: Monitor console output for update status
3. **Manual Updates**: Use `/update` endpoint for immediate updates
4. **Production**: Use process manager (PM2, supervisor) to keep app running

---

**The system is fully automated! Just run `python app.py` and it will handle everything!** 🚀

