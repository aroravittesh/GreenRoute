# import pandas as pd
# from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error

# # CONFIG
# TOTAL_STOCK = 150
# SHELF_LIFE_DAYS = 15

# # Load forecast
# forecast = pd.read_csv("results/predictions_store50.csv").rename(columns={"yhat": "forecast"})
# forecast["ds"] = pd.to_datetime(forecast["ds"])
# forecast = forecast.head(SHELF_LIFE_DAYS)

# # Load actuals
# actual = pd.read_csv("results/actual_demand.csv")
# actual["ds"] = pd.to_datetime(actual["ds"])

# # Merge forecast and actual on 'ds'
# merged = pd.merge(forecast, actual, on="ds", how="inner")
# merged = merged[["ds", "forecast", "y"]].dropna()

# # Evaluate accuracy
# mae = mean_absolute_error(merged["y"], merged["forecast"])
# mape = mean_absolute_percentage_error(merged["y"], merged["forecast"]) * 100

# # Print Accuracy
# print(f"\n📊 Accuracy on Shelf Life Window (first {SHELF_LIFE_DAYS} days):")
# print(f"  - MAE: {mae:.2f}")
# print(f"  - MAPE: {mape:.2f}%")

# # Prepare for spoilage sim
# merged["demand"] = merged["forecast"].round().astype(int)

# # -----------------------------
# # FIFO Simulation
# # -----------------------------
# def simulate_fifo(demand, total_stock):
#     stock_left = total_stock
#     spoilage = 0
#     for day, d in enumerate(demand):
#         if stock_left <= 0:
#             break
#         if stock_left >= d:
#             stock_left -= d
#         else:
#             stock_left = 0
#         spoilage += stock_left * (1 - ((SHELF_LIFE_DAYS - day) / SHELF_LIFE_DAYS))
#     return round(spoilage)

# # -----------------------------
# # Optimized Simulation
# # -----------------------------
# def simulate_optimized(demand, total_stock):
#     demand_sorted = sorted(list(demand), reverse=True)
#     stock_left = total_stock
#     spoilage = 0
#     for day, d in enumerate(demand_sorted):
#         if stock_left <= 0:
#             break
#         if stock_left >= d:
#             stock_left -= d
#         else:
#             stock_left = 0
#         spoilage += stock_left * (1 - ((SHELF_LIFE_DAYS - day) / SHELF_LIFE_DAYS))
#     return round(spoilage)

# # Run simulations
# fifo_spoilage = simulate_fifo(merged["demand"], TOTAL_STOCK)
# optimized_spoilage = simulate_optimized(merged["demand"], TOTAL_STOCK)
# waste_saved = fifo_spoilage - optimized_spoilage

# # Output Results
# print(f"\n🍌 FIFO Spoilage: {fifo_spoilage} units")
# print(f"🚛 Optimized Spoilage: {optimized_spoilage} units")
# print(f"✅ Waste Saved: {waste_saved} units ({(waste_saved / fifo_spoilage * 100):.2f}%)")


# import pandas as pd
# import matplotlib.pyplot as plt
# import os

# # CONFIG
# FORECAST_CSV_PATH = "../backend/results/monthly_bar_chart_data.csv"
# OUTPUT_DIR = "../backend/results"
# FORECAST_DAYS = 30
# SHELF_LIFE_DAYS = 15

# # Ensure output dir exists
# os.makedirs(OUTPUT_DIR, exist_ok=True)

# # Load forecast
# df = pd.read_csv(FORECAST_CSV_PATH)
# df.columns = ["store_id", "forecast"]

# # Simulation function
# def simulate_spoilage(total_units, shelf_life_days, forecast_days):
#     total_units = int(round(total_units))
#     inventory = [{"age": 0} for _ in range(total_units)]
#     daily_demand = total_units / forecast_days

#     for day in range(forecast_days):
#         for item in inventory:
#             item["age"] += 1

#         inventory = [item for item in inventory if item["age"] <= shelf_life_days]
#         demand = int(round(daily_demand))
#         inventory = inventory[demand:] if demand <= len(inventory) else []

#     return len(inventory)

# # Apply simulation to each store
# df["fifo_spoilage"] = df["forecast"].apply(lambda x: simulate_spoilage(x, SHELF_LIFE_DAYS, FORECAST_DAYS))
# df["optimized_spoilage"] = df["fifo_spoilage"]  # (placeholder)

# # Save CSV
# df.to_csv(os.path.join(OUTPUT_DIR, "predicted_spoilage_by_store.csv"), index=False)

# # Save Plot
# plt.figure(figsize=(10, 6))
# plt.bar(df["store_id"].astype(str), df["fifo_spoilage"], label="FIFO Spoilage", alpha=0.7)
# plt.bar(df["store_id"].astype(str), df["optimized_spoilage"], label="Optimized Spoilage", alpha=0.7)
# plt.xlabel("Store ID")
# plt.ylabel("Predicted Spoilage (Units)")
# plt.title("30-Day Spoilage Forecast per Store")
# plt.legend()
# plt.tight_layout()
# plt.savefig(os.path.join(OUTPUT_DIR, "predicted_spoilage_by_store.png"))
# plt.close()

# import pandas as pd
# import matplotlib.pyplot as plt
# import os

# # CONFIG
# SHELF_LIFE_DAYS = 8
# TOTAL_STOCK = 2000  # total stock to distribute
# CSV_INPUT_PATH = "../Backend/results/monthly_bar_chart_data.csv"
# CSV_OUTPUT_PATH = "results/spoilage_output.csv"
# IMG_OUTPUT_PATH = "results/spoilage_chart.png"

# print("🔄 Starting Spoilage Simulation...")

# # Step 1: Load forecast from Model 1
# print(f"📥 Loading forecast data from: {CSV_INPUT_PATH}")
# df = pd.read_csv(CSV_INPUT_PATH)
# df = df.sort_values(by="store_id")

# # Step 2: Convert forecasted monthly total into average daily demand
# df["daily_demand"] = (df["forecasted_units"] / 30).round().astype(int)
# print("📊 Converted forecasted units into daily demand.")

# # Step 3: Spoilage risk function
# def spoilage_risk(daily_demand):
#     return min(0.5, max(0.05, 0.5 - 0.02 * daily_demand))

# # Step 4: Simulate optimized spoilage
# def simulate_optimized_spoilage(df, total_stock):
#     print("⚙️  Running optimized spoilage simulation...")
#     df_sorted = df.sort_values(by="daily_demand", ascending=False)
#     stock_left = total_stock
#     spoilage_per_store = []

#     for _, row in df_sorted.iterrows():
#         store_id = row["store_id"]
#         forecasted_units = row["forecasted_units"]
#         daily_demand = row["daily_demand"]

#         max_send = daily_demand * SHELF_LIFE_DAYS
#         assigned = min(max_send, stock_left)
#         stock_left -= assigned

#         spoilage = round(assigned * spoilage_risk(daily_demand))
#         spoilage_per_store.append((store_id, forecasted_units, spoilage))

#         print(f"   → Store {store_id}: Sent {assigned} units, Spoilage = {spoilage}")

#         if stock_left <= 0:
#             print("   ✅ Stock exhausted.")
#             break

#     return pd.DataFrame(spoilage_per_store, columns=["store_id", "forecasted_units", "predicted_spoilage"])

# # Step 5: Run simulation
# result_df = simulate_optimized_spoilage(df.copy(), TOTAL_STOCK)

# # Step 6: Save CSV
# os.makedirs("results", exist_ok=True)
# result_df.to_csv(CSV_OUTPUT_PATH, index=False)
# print(f"💾 CSV saved at: {CSV_OUTPUT_PATH}")

# # Step 7: Plot bar chart
# print("📈 Generating bar chart...")
# plt.figure(figsize=(10, 6))
# plt.bar(result_df["store_id"].astype(str), result_df["predicted_spoilage"])
# plt.xlabel("Store ID")
# plt.ylabel("Predicted Spoilage (units)")
# plt.title("Optimized Spoilage per Store")
# plt.tight_layout()
# plt.savefig(IMG_OUTPUT_PATH)
# print(f"🖼️  Chart saved at: {IMG_OUTPUT_PATH}")

# print("✅ Spoilage Simulation Complete.")

import pandas as pd
import matplotlib.pyplot as plt
import os

# CONFIG
SHELF_LIFE_DAYS = 18
TOTAL_STOCK = 10000
CSV_INPUT_PATH = "../Backend/results/monthly_bar_chart_data.csv"
CSV_OUTPUT_PATH = "results/spoilage_output.csv"
IMG_OUTPUT_PATH = "results/spoilage_chart.png"

print("🔄 Starting Spoilage Simulation...")

# Step 1: Load forecast data
print(f"📥 Loading forecast data from: {CSV_INPUT_PATH}")
df = pd.read_csv(CSV_INPUT_PATH)
df = df.sort_values(by="store_id")

# Step 2: Calculate daily demand
df["daily_demand"] = (df["forecasted_units"] / 30).round().astype(int)
print("📊 Converted forecasted units into daily demand.")

# Step 3: Spoilage risk function
def spoilage_risk(daily_demand):
    return min(0.5, max(0.05, 0.5 - 0.02 * daily_demand))

# Step 4: Optimized spoilage simulation
def simulate_optimized_spoilage(df, total_stock):
    print("⚙️  Running optimized spoilage simulation...")
    df_sorted = df.sort_values(by="daily_demand", ascending=False)
    stock_left = total_stock
    spoilage_per_store = []

    for _, row in df_sorted.iterrows():
        store_id = row["store_id"]
        forecasted_units = row["forecasted_units"]
        daily_demand = row["daily_demand"]

        # Send as close to forecasted units as possible
        assigned = min(forecasted_units, stock_left)
        stock_left -= assigned

        # Calculate spoilage risk: fraction of month past shelf life
        spoilage_days = max(0, 30 - SHELF_LIFE_DAYS)
        spoilage_ratio = spoilage_days / 30
        spoilage = round(assigned * spoilage_ratio * spoilage_risk(daily_demand))

        spoilage_per_store.append((store_id, forecasted_units, assigned, spoilage))

        print(f"   → Store {int(store_id)}: Sent {int(assigned)} / Forecast {int(forecasted_units)}, Spoilage = {spoilage}")

        if stock_left <= 0:
            print("   ✅ Stock exhausted.")
            break

    return pd.DataFrame(
        spoilage_per_store,
        columns=["store_id", "forecasted_units", "assigned_units", "predicted_spoilage"]
    )

# Step 5: Run simulation
result_df = simulate_optimized_spoilage(df.copy(), TOTAL_STOCK)

# Step 6: Save CSV
os.makedirs("results", exist_ok=True)
result_df.to_csv(CSV_OUTPUT_PATH, index=False)
print(f"💾 CSV saved at: {CSV_OUTPUT_PATH}")

# Step 7: Bar chart
print("📈 Generating spoilage chart...")
plt.figure(figsize=(10, 6))
plt.bar(result_df["store_id"].astype(str), result_df["predicted_spoilage"])
plt.xlabel("Store ID")
plt.ylabel("Predicted Spoilage (units)")
plt.title("Optimized Spoilage per Store (Based on Assigned Units)")
plt.tight_layout()
plt.savefig(IMG_OUTPUT_PATH)
print(f"🖼️  Chart saved at: {IMG_OUTPUT_PATH}")

# Final summary
total_assigned = result_df["assigned_units"].sum()
total_spoilage = result_df["predicted_spoilage"].sum()
print(f"\n📦 Total Assigned: {int(total_assigned)} / {TOTAL_STOCK}")
print(f"🍌 Total Spoilage: {total_spoilage} units")
print("✅ Spoilage Simulation Complete.")
