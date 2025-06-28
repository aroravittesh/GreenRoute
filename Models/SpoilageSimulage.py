import pandas as pd
from datasets import load_dataset
from prophet import Prophet
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error

# CONFIG
FORECAST_DAYS = 7
MIN_NON_ZERO_DAYS = 10
USE_SMOOTHING = True
ROLLING_WINDOW = 3

# Step 1: Load Dataset
print("🔄 Loading FreshRetailNet-50K...")
dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
df = dataset.to_pandas()

# Step 2: Top 5 store-product combos
print("🔍 Finding best combos...")
top_combos = (
    df.groupby(["store_id", "product_id"])["sale_amount"]
    .sum()
    .sort_values(ascending=False)
    .head(5)
)

# Step 3: Try each combo and pick best based on MAPE
best_result = None
for combo in top_combos.index:
    store_id, product_id = combo
    subset = df[(df["store_id"] == store_id) & (df["product_id"] == product_id)].copy()
    subset["dt"] = pd.to_datetime(subset["dt"])
    daily = subset.set_index("dt").resample("D").sum().reset_index()
    daily = daily.rename(columns={"dt": "ds", "sale_amount": "y"})
    daily = daily[["ds", "y"]]

    # Filter out days with very low sales
    daily = daily[daily["y"] >= 1]

    # Apply rolling mean smoothing
    if USE_SMOOTHING:
        daily["y"] = daily["y"].rolling(window=ROLLING_WINDOW, min_periods=1).mean()

    # Ensure enough non-zero data points
    if (daily["y"] > 0).sum() < MIN_NON_ZERO_DAYS:
        continue

    # Train/test split
    train = daily[:-FORECAST_DAYS]
    test = daily[-FORECAST_DAYS:]

    # Define model with better seasonality
    model = Prophet(
        yearly_seasonality=False,
        weekly_seasonality=True,
        daily_seasonality=False,
        seasonality_mode="additive"
    )
    model.add_seasonality(name="monthly", period=30.5, fourier_order=5)

    try:
        model.fit(train)
    except:
        continue

    # Forecast
    future = model.make_future_dataframe(periods=FORECAST_DAYS)
    forecast = model.predict(future)

    # Accuracy on test
    try:
        y_true = test["y"].values
        y_pred = forecast.set_index("ds").loc[test["ds"]]["yhat"].values
        mae = mean_absolute_error(y_true, y_pred)
        mape = mean_absolute_percentage_error(y_true, y_pred) * 100
    except:
        continue

    print(f"✅ Combo: Store {store_id}, Product {product_id} | MAE: {mae:.2f}, MAPE: {mape:.2f}%")

    if best_result is None or mape < best_result["mape"]:
        best_result = {
            "store_id": store_id,
            "product_id": product_id,
            "model": model,
            "forecast": forecast,
            "daily": daily,
            "mae": mae,
            "mape": mape
        }

# Final Result
if best_result:
    print(f"\n🏆 Best combo: Store {best_result['store_id']}, Product {best_result['product_id']}")
    print(f"📈 MAE: {best_result['mae']:.2f}")
    print(f"📉 MAPE: {best_result['mape']:.2f}%")

    # Save predictions
    forecast = best_result["forecast"]
    forecast[["ds", "yhat"]].to_csv("results/predictions.csv", index=False)

    # Save actuals
    best_result["daily"].to_csv("results/actual_demand.csv", index=False)

    # Plot forecast
    best_result["model"].plot(forecast)
    plt.title(f"Forecast - Store {best_result['store_id']}, Product {best_result['product_id']}")
    plt.tight_layout()
    plt.savefig("results/forecast_plot.png")
    plt.show()
    print("\n✅ Forecast, plot, and actuals saved.")
else:
    print("❌ No valid combos found with enough data.")
