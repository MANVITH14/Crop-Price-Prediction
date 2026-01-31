"""
Daily Update Scheduler
Automatically updates data and retrains model daily
"""

import schedule
import time
import threading
from datetime import datetime
from data.data_handler import update_daily_data, get_last_updated_date
from model.train_model_if_needed import train_model_if_needed


def daily_update_job():
    """
    Job to run daily - updates data and retrains model
    """
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting daily update job...")
    try:
        # Update data
        update_daily_data()
        
        # Retrain model with new data
        train_model_if_needed(force_retrain=True)
        
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Daily update completed successfully!")
        print(f"Last updated: {get_last_updated_date()}")
    except Exception as e:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Error in daily update: {str(e)}")


def run_scheduler():
    """
    Run the scheduler in a background thread
    """
    # Schedule daily update at 2:00 AM
    schedule.every().day.at("02:00").do(daily_update_job)
    
    # Also check every hour if update is needed
    schedule.every().hour.do(check_and_update)
    
    print("Daily update scheduler started!")
    print("Updates will run daily at 2:00 AM")
    print("Also checking hourly for updates...")
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute


def check_and_update():
    """
    Check if update is needed and update if necessary
    """
    try:
        import pandas as pd
        from data.data_handler import load_data
        from datetime import datetime, timedelta
        
        df = load_data()
        if df is None:
            return
        
        df['Date'] = pd.to_datetime(df['Date'])
        latest_date = df['Date'].max().date()
        today = datetime.now().date()
        
        # If data is older than today, update
        if latest_date < today:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Data update needed, triggering update...")
            daily_update_job()
    except Exception as e:
        print(f"Error checking for updates: {str(e)}")


def start_scheduler_thread():
    """
    Start scheduler in a separate thread
    """
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()
    return scheduler_thread


if __name__ == '__main__':
    # Test the scheduler
    print("Testing daily update scheduler...")
    daily_update_job()

