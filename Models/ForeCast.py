# import pandas as pd
# from datasets import load_dataset
# from prophet import Prophet
# import matplotlib.pyplot as plt
# from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error

# # Step 1: Load FreshRetailNet-50K
# print("🔄 Loading FreshRetailNet-50K...")
# dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
# df = dataset.to_pandas()

# # Step 2: Preview columns
# print("📦 Available columns:", df.columns.tolist())

# # Step 3: Find top 5 most active store-product combos
# top_combos = (
#     df.groupby(["store_id", "product_id"])["sale_amount"]
#     .sum()
#     .sort_values(ascending=False)
#     .head(5)
# )
# print("🔥 Most active combos:\n", top_combos)

# # Step 4: Pick the most active combo
# store_id, product_id = top_combos.index[0]

# # Replace with this to force Store 50 and Product 267
# store_id = 122
# product_id = 267

# print(f"\n✅ Using store_id = {store_id}, product_id = {product_id}")


# # Step 5: Filter and prepare data
# subset = df[(df["store_id"] == store_id) & (df["product_id"] == product_id)]
# subset["dt"] = pd.to_datetime(subset["dt"])

# # Step 6: Resample to daily demand
# daily = subset.set_index("dt").resample("D").sum().reset_index()
# daily = daily.rename(columns={"dt": "ds", "sale_amount": "y"})
# daily = daily[["ds", "y"]]

# # Step 7: Check for enough data
# print("\n📊 Preview of daily data:\n", daily.tail(10))
# print("🟢 Non-zero sales days:", (daily["y"] > 0).sum())

# if (daily["y"] > 0).sum() < 2:
#     raise ValueError("Not enough non-zero data points to train Prophet.")

# # Step 8: Train/test split
# train = daily[:-7]
# test = daily[-7:]

# # Step 9: Train Prophet
# print("⚙️ Training Prophet model...")
# model = Prophet()
# model.fit(train)

# # Step 10: Forecast next 7 days
# future = model.make_future_dataframe(periods=7)
# forecast = model.predict(future)

# # Step 11: Accuracy metrics
# y_true = test["y"].values
# y_pred = forecast.set_index("ds").loc[test["ds"]]["yhat"].values

# mae = mean_absolute_error(y_true, y_pred)
# mape = mean_absolute_percentage_error(y_true, y_pred) * 100

# print(f"\n📈 Model Accuracy (last 7 actual days):")
# print(f"  - MAE: {mae:.2f}")
# print(f"  - MAPE: {mape:.2f}%")

# # Step 12: Plot forecast
# model.plot(forecast)
# plt.title(f"Forecast - Store {store_id}, Product {product_id}")
# plt.tight_layout()
# plt.savefig("results/forecast_plot.png")
# plt.title("Forecast vs. Actuals")
# plt.xlabel("Date")
# plt.ylabel("Units Sold")
# plt.show()

# # Step 13: Save forecast
# forecast[["ds", "yhat"]].to_csv("results/predictions_store122.csv", index=False)
# print("\n✅ Forecast saved to 'results/predictions.csv'")
# print("📉 Plot saved to 'results/forecast_plot.png'")
# import pandas as pd
# from datasets import load_dataset
# from prophet import Prophet
# import matplotlib.pyplot as plt
# from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
# import json
# import os
# import sys

# # 🟡 Step 1: Accept CLI arguments
# if len(sys.argv) < 3:
#     print("❌ Usage: python model_a.py <store_id> <product_id>")
#     sys.exit(1)

# store_id = int(sys.argv[1])
# product_id = int(sys.argv[2])
# print(f"🔁 Running for Store {store_id}, Product {product_id}")

# # 🟢 Step 2: Load and filter dataset
# dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
# df = dataset.to_pandas()
# subset = df[(df["store_id"] == store_id) & (df["product_id"] == product_id)]
# subset["dt"] = pd.to_datetime(subset["dt"])

# daily = subset.set_index("dt").resample("D").sum().reset_index()
# daily = daily.rename(columns={"dt": "ds", "sale_amount": "y"})
# daily = daily[["ds", "y"]]

# if (daily["y"] > 0).sum() < 2:
#     raise ValueError("Not enough non-zero data points to train Prophet.")

# train = daily[:-7]
# test = daily[-7:]

# model = Prophet()
# model.fit(train)
# future = model.make_future_dataframe(periods=7)
# forecast = model.predict(future)

# y_true = test["y"].values
# y_pred = forecast.set_index("ds").loc[test["ds"]]["yhat"].values
# mae = mean_absolute_error(y_true, y_pred)
# mape = mean_absolute_percentage_error(y_true, y_pred) * 100

# # Step 3: Save to backend/results
# output_dir = os.path.join(os.path.dirname(__file__), "../backend/results")
# os.makedirs(output_dir, exist_ok=True)

# forecast[["ds", "yhat"]].to_csv(f"{output_dir}/a_predictions.csv", index=False)
# with open(f"{output_dir}/a_metrics.json", "w") as f:
#     json.dump({"mae": mae, "mape": mape}, f)

# fig = model.plot(forecast)
# plt.title(f"Forecast - Store {store_id}, Product {product_id}")
# plt.xlabel("Date")
# plt.ylabel("Units Sold")
# plt.tight_layout()
# plt.savefig(f"{output_dir}/a_plot.png")
# plt.close()

# print("✅ Model run completed.")
# import pandas as pd
# from datasets import load_dataset
# from prophet import Prophet
# import matplotlib.pyplot as plt
# import sys
# import os

# # --- CLI Argument ---
# if len(sys.argv) < 2:
#     print("❌ Usage: python ForeCast.py <product_id>")
#     sys.exit(1)

# product_id = int(sys.argv[1])
# print(f"📦 Forecasting top 5 stores for product_id = {product_id}")

# # --- Load & Filter Dataset ---
# dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
# df = dataset.to_pandas()
# df["dt"] = pd.to_datetime(df["dt"])
# df = df[df["product_id"] == product_id]

# # --- Get Top 5 Stores for This Product ---
# top_stores = (
#     df.groupby("store_id")["sale_amount"]
#     .sum()
#     .sort_values(ascending=False)
#     .head(5)
#     .index.tolist()
# )

# # --- Forecast for each top store ---
# plt.figure(figsize=(12, 6))
# colors = ['blue', 'green', 'orange', 'purple', 'red']
# forecast_df = pd.DataFrame()

# for i, store_id in enumerate(top_stores):
#     subset = df[df["store_id"] == store_id]
#     daily = (
#         subset.set_index("dt")
#         .resample("D")["sale_amount"]
#         .sum()
#         .reset_index()
#         .rename(columns={"dt": "ds", "sale_amount": "y"})
#     )
    
#     if (daily["y"] > 0).sum() < 2:
#         continue
    
#     model = Prophet()
#     model.fit(daily)
    
#     future = model.make_future_dataframe(periods=30)
#     forecast = model.predict(future)
    
#     plt.plot(forecast["ds"], forecast["yhat"], label=f"Store {store_id}", color=colors[i])
#     forecast_df[f"store_{store_id}"] = forecast["yhat"].values

# # --- Plot Styling ---
# plt.title(f"📈 30-Day Forecast for Top 5 Stores - Product {product_id}")
# plt.xlabel("Date")
# plt.ylabel("Units Sold")
# plt.legend()
# plt.tight_layout()

# # --- Save Files ---
# output_dir = os.path.join(os.path.dirname(__file__), "../backend/results")
# os.makedirs(output_dir, exist_ok=True)

# plt.savefig(os.path.join(output_dir, "combined_forecast_top5.png"))
# forecast_df.to_csv(os.path.join(output_dir, "combined_forecast_top5.csv"), index=False)

# print("✅ 30-day forecast plot and CSV for top 5 stores saved.")
# import pandas as pd
# from datasets import load_dataset
# from prophet import Prophet
# import matplotlib.pyplot as plt
# from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
# import json
# import os
# import sys

# # Step 1: CLI argument
# if len(sys.argv) < 2:
#     print("❌ Usage: python ForeCast.py <product_id>")
#     sys.exit(1)

# product_id = int(sys.argv[1])
# print(f"🔁 Running forecast for top 5 stores of Product {product_id}")

# # Step 2: Load dataset
# dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
# df = dataset.to_pandas()

# # Step 3: Get top 5 stores by sales for the product
# top_stores = (
#     df[df["product_id"] == product_id]
#     .groupby("store_id")["sale_amount"]
#     .sum()
#     .sort_values(ascending=False)
#     .head(5)
#     .index.tolist()
# )

# print("🏪 Top 5 stores:", top_stores)

# # Step 4: Forecast for each store
# monthly_forecasts = []
# plt.figure(figsize=(12, 6))

# for store_id in top_stores:
#     print(f"\n📦 Forecasting for Store {store_id}")

#     subset = df[(df["store_id"] == store_id) & (df["product_id"] == product_id)]
#     subset["dt"] = pd.to_datetime(subset["dt"])
#     daily = subset.set_index("dt").resample("D").sum().reset_index()
#     daily = daily.rename(columns={"dt": "ds", "sale_amount": "y"})
#     daily = daily[["ds", "y"]]

#     if (daily["y"] > 0).sum() < 2:
#         print(f"⚠️ Skipping Store {store_id} due to insufficient data")
#         continue

#     train = daily

#     model = Prophet()
#     model.fit(train)

#     future = model.make_future_dataframe(periods=180)
#     forecast = model.predict(future)

#     # Monthly average
#     forecast["month"] = forecast["ds"].dt.to_period("M")
#     monthly = forecast.groupby("month")["yhat"].mean().reset_index()
#     monthly["store"] = store_id
#     monthly_forecasts.append(monthly)

#     # Plot
#     plt.plot(monthly["month"].astype(str), monthly["yhat"], label=f"Store {store_id}")

# # Step 5: Save CSV
# output_dir = os.path.join(os.path.dirname(__file__), "../backend/results")
# os.makedirs(output_dir, exist_ok=True)

# final_df = pd.concat(monthly_forecasts)
# final_df.columns = ["month", "predicted_sales", "store"]
# final_df.to_csv(f"{output_dir}/combined_monthly_sales_top5.csv", index=False)

# # Step 6: Save plot
# plt.title(f"📊 Monthly Forecast (Next 6 Months) for Product {product_id}")
# plt.xlabel("Month")
# plt.ylabel("Predicted Units Sold")
# plt.legend()
# plt.xticks(rotation=45)
# plt.tight_layout()
# plt.savefig(f"{output_dir}/combined_forecast_top5.png")
# plt.close()

# print("\n✅ Forecast and plot saved to backend/results/")


# import pandas as pd
# from datasets import load_dataset
# from prophet import Prophet
# import matplotlib.pyplot as plt
# import os
# import sys

# # Step 1: Read CLI argument
# if len(sys.argv) < 2:
#     print("❌ Usage: python ForeCast.py <product_id>")
#     sys.exit(1)

# product_id = int(sys.argv[1])
# print(f"🔍 Running monthly forecast for Product {product_id}")

# # Step 2: Load dataset
# dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
# df = dataset.to_pandas()

# # Step 3: Filter for the product and group by top 5 stores
# product_df = df[df["product_id"] == product_id]
# top_stores = (
#     product_df.groupby("store_id")["sale_amount"]
#     .sum()
#     .sort_values(ascending=False)
#     .head(5)
#     .index.tolist()
# )

# print(f"🏬 Top 5 stores for product {product_id}: {top_stores}")

# forecast_results = []

# # Step 4: Forecast for each top store
# for store_id in top_stores:
#     subset = product_df[product_df["store_id"] == store_id].copy()
#     subset["dt"] = pd.to_datetime(subset["dt"])
#     daily = subset.set_index("dt").resample("D").sum().reset_index()
#     daily = daily.rename(columns={"dt": "ds", "sale_amount": "y"})
#     daily = daily[["ds", "y"]]

#     if (daily["y"] > 0).sum() < 2:
#         print(f"⚠️ Skipping store {store_id}: insufficient data.")
#         continue

#     model = Prophet()
#     model.fit(daily)
#     future = model.make_future_dataframe(periods=30)
#     forecast = model.predict(future)

#     forecast_30_days = forecast.tail(30)["yhat"].sum()
#     forecast_results.append((store_id, round(forecast_30_days, 2)))

# # Step 5: Output results
# results_df = pd.DataFrame(forecast_results, columns=["store_id", "forecasted_units"])
# output_dir = os.path.join(os.path.dirname(__file__), "../backend/results")
# os.makedirs(output_dir, exist_ok=True)
# results_df.to_csv(os.path.join(output_dir, "monthly_bar_chart_data.csv"), index=False)

# # Step 6: Plot bar chart
# plt.figure(figsize=(8, 6))
# plt.bar(results_df["store_id"].astype(str), results_df["forecasted_units"], color="green")
# plt.title(f"📦 30-Day Forecasted Sales by Store for Product {product_id}")
# plt.xlabel("Store ID")
# plt.ylabel("Units Sold")
# plt.tight_layout()
# plt.grid(True, axis='y', linestyle='--', alpha=0.6)
# plt.savefig(os.path.join(output_dir, "monthly_bar_chart.png"))
# plt.close()

# print("✅ CSV + Bar Chart saved.")


import pandas as pd
from datasets import load_dataset
from prophet import Prophet
import matplotlib.pyplot as plt
import seaborn as sns
import os
import sys

# Step 1: Read CLI argument
# if len(sys.argv) < 2:
#     print("❌ Usage: python ForeCast.py <product_id>")
#     sys.exit(1)

product_id = 267
print(f"🔍 Running monthly forecast for Product {product_id}")

# Step 2: Load dataset
dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
df = dataset.to_pandas()

# Step 3: Filter for the product and group by top 5 stores
product_df = df[df["product_id"] == product_id]
top_stores = (
    product_df.groupby("store_id")["sale_amount"]
    .sum()
    .sort_values(ascending=False)
    .head(5)
    .index.tolist()
)

print(f"🏬 Top 5 stores for product {product_id}: {top_stores}")

forecast_results = []

# Step 4: Forecast for each top store
for store_id in top_stores:
    subset = product_df[product_df["store_id"] == store_id].copy()
    subset["dt"] = pd.to_datetime(subset["dt"])
    daily = subset.set_index("dt").resample("D").sum().reset_index()
    daily = daily.rename(columns={"dt": "ds", "sale_amount": "y"})
    daily = daily[["ds", "y"]]

    if (daily["y"] > 0).sum() < 2:
        print(f"⚠️ Skipping store {store_id}: insufficient data.")
        continue

    model = Prophet()
    model.fit(daily)
    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    forecast_30_days = forecast.tail(30)["yhat"].sum()
    forecast_results.append((store_id, round(forecast_30_days, 2)))

# Step 5: Output results
results_df = pd.DataFrame(forecast_results, columns=["store_id", "forecasted_units"])
output_dir = os.path.join(os.path.dirname(__file__), "../backend/results")
os.makedirs(output_dir, exist_ok=True)
results_df.to_csv(os.path.join(output_dir, "monthly_bar_chart_data.csv"), index=False)

# Step 6: Plot bar chart (cleaned)
sns.set(style="whitegrid")
plt.figure(figsize=(10, 6))
bars = plt.bar(
    results_df["store_id"].astype(str),
    results_df["forecasted_units"],
    color="#2E7D32",  # Dark professional green
    edgecolor="black",
    linewidth=0.8
)

for bar in bars:
    height = bar.get_height()
    plt.text(
        bar.get_x() + bar.get_width() / 2,
        height,
        f"{int(height)}",
        ha="center",
        va="bottom",
        fontsize=9,
        fontweight="medium"
    )

plt.title(f"30-Day Forecasted Sales by Store\nProduct ID: {product_id}", fontsize=16, fontweight="bold", pad=20)
plt.xlabel("Store ID", fontsize=12)
plt.ylabel("Forecasted Units Sold", fontsize=12)
plt.xticks(fontsize=10)
plt.yticks(fontsize=10)
plt.tight_layout()
plt.savefig(os.path.join(output_dir, "monthly_bar_chart.png"))
plt.close()

print("✅ CSV + Bar Chart saved.")
