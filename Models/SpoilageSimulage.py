import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error

# CONFIG
TOTAL_STOCK = 150
SHELF_LIFE_DAYS = 5

# Load forecast
forecast = pd.read_csv("results/predictions_store50.csv").rename(columns={"yhat": "forecast"})
forecast["ds"] = pd.to_datetime(forecast["ds"])
forecast = forecast.head(SHELF_LIFE_DAYS)

# Load actuals
actual = pd.read_csv("results/actual_demand.csv")
actual["ds"] = pd.to_datetime(actual["ds"])

# Merge forecast and actual on 'ds'
merged = pd.merge(forecast, actual, on="ds", how="inner")
merged = merged[["ds", "forecast", "y"]].dropna()

# Evaluate accuracy
mae = mean_absolute_error(merged["y"], merged["forecast"])
mape = mean_absolute_percentage_error(merged["y"], merged["forecast"]) * 100

# Print Accuracy
print(f"\n📊 Accuracy on Shelf Life Window (first {SHELF_LIFE_DAYS} days):")
print(f"  - MAE: {mae:.2f}")
print(f"  - MAPE: {mape:.2f}%")

# Prepare for spoilage sim
merged["demand"] = merged["forecast"].round().astype(int)

# -----------------------------
# FIFO Simulation
# -----------------------------
def simulate_fifo(demand, total_stock):
    stock_left = total_stock
    spoilage = 0
    for day, d in enumerate(demand):
        if stock_left <= 0:
            break
        if stock_left >= d:
            stock_left -= d
        else:
            stock_left = 0
        spoilage += stock_left * (1 - ((SHELF_LIFE_DAYS - day) / SHELF_LIFE_DAYS))
    return round(spoilage)

# -----------------------------
# Optimized Simulation
# -----------------------------
def simulate_optimized(demand, total_stock):
    demand_sorted = sorted(list(demand), reverse=True)
    stock_left = total_stock
    spoilage = 0
    for day, d in enumerate(demand_sorted):
        if stock_left <= 0:
            break
        if stock_left >= d:
            stock_left -= d
        else:
            stock_left = 0
        spoilage += stock_left * (1 - ((SHELF_LIFE_DAYS - day) / SHELF_LIFE_DAYS))
    return round(spoilage)

# Run simulations
fifo_spoilage = simulate_fifo(merged["demand"], TOTAL_STOCK)
optimized_spoilage = simulate_optimized(merged["demand"], TOTAL_STOCK)
waste_saved = fifo_spoilage - optimized_spoilage

# Output Results
print(f"\n🍌 FIFO Spoilage: {fifo_spoilage} units")
print(f"🚛 Optimized Spoilage: {optimized_spoilage} units")
print(f"✅ Waste Saved: {waste_saved} units ({(waste_saved / fifo_spoilage * 100):.2f}%)")
