# Daily Price Update Mechanism

## How Daily Updates Work

The system has **automatic daily price updates** that work in the following way:

### 1. Automatic Scheduler
- **Runs in background**: A scheduler thread runs continuously while the Flask app is running
- **Daily update time**: Automatically updates at **2:00 AM every day**
- **Hourly checks**: Also checks every hour if an update is needed
- **No manual intervention**: Works automatically once the app is running

### 2. Update Process

When the daily update runs, it:

1. **Checks current data**: Looks at the latest date in the data file
2. **Compares with today**: If data is older than today, it triggers an update
3. **Fetches new prices**: 
   - In production: Would fetch from Agmarknet API
   - Currently: Simulates new daily prices based on recent trends
4. **Adds new records**: Adds today's prices for all crops and districts
5. **Retrains model**: Automatically retrains the ML model with new data
6. **Updates timestamp**: Updates the "Last Updated" date on the website

### 3. Update Flow Diagram

```
Daily Scheduler (2:00 AM)
    ↓
Check if update needed
    ↓
Update daily data (add today's prices)
    ↓
Retrain ML model with new data
    ↓
Update "Last Updated" date
    ↓
Website shows latest data
```

### 4. Manual Update

You can also manually trigger an update:

**Option 1: Via API endpoint**
```bash
curl -X POST http://localhost:5000/update
```

**Option 2: Via Python**
```python
from data.data_handler import update_daily_data
from model.train_model_if_needed import train_model_if_needed

update_daily_data()
train_model_if_needed(force_retrain=True)
```

### 5. Data Update Logic

The `update_daily_data()` function:
- Checks if today's data already exists
- If not, generates new price data for today
- Uses recent 30-day average as base price
- Adds small random variation (±5%) to simulate market fluctuations
- Saves all new records to CSV file

### 6. Model Retraining

The model automatically retrains when:
- New data is added (daily updates)
- Model is older than 1 day
- Manually triggered via `/update` endpoint

### 7. Production Setup

For production deployment, you can:

**Option A: Keep Flask app running 24/7**
- The scheduler will automatically run daily updates
- No additional setup needed

**Option B: Use cron job (Linux/Mac)**
```bash
# Add to crontab (runs daily at 2:00 AM)
0 2 * * * curl -X POST http://localhost:5000/update
```

**Option C: Use Task Scheduler (Windows)**
- Create a scheduled task that calls the `/update` endpoint daily

**Option D: Use cloud scheduler (AWS/GCP/Azure)**
- Set up cloud scheduler to hit the `/update` endpoint daily

### 8. Integration with Real API

To integrate with real Agmarknet API:

1. Modify `data/data_handler.py` → `update_daily_data()` function
2. Replace simulation code with actual API calls:
```python
import requests

def fetch_from_agmarknet(crop, district):
    # API call to Agmarknet
    response = requests.get(f'https://api.agmarknet.gov.in/...')
    return response.json()
```

### 9. Monitoring Updates

Check update status:
- **Website**: Look at "Last Updated" date on homepage
- **Logs**: Check console output for update messages
- **API**: Call `/update` endpoint to see status

### 10. Troubleshooting

**Issue**: Updates not running automatically
- **Solution**: Make sure Flask app is running continuously
- **Solution**: Check scheduler thread started (look for "Daily update scheduler started" message)

**Issue**: Data not updating
- **Solution**: Check if data file exists in `data/` folder
- **Solution**: Verify write permissions on data directory

**Issue**: Model not retraining
- **Solution**: Check model metadata file exists
- **Solution**: Manually trigger via `/update` endpoint

---

## Summary

✅ **Automatic**: Updates run daily at 2:00 AM  
✅ **Smart**: Checks hourly if update needed  
✅ **Complete**: Updates data AND retrains model  
✅ **Reliable**: Works in background thread  
✅ **Manual**: Can also trigger manually  

The system is designed to keep prices and predictions up-to-date automatically!

