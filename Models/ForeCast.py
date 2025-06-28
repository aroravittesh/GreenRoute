import pandas as pd
from datasets import load_dataset
from prophet import Prophet
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error

# Step 1: Load FreshRetailNet-50K
print("🔄 Loading FreshRetailNet-50K...")
dataset = load_dataset("Dingdong-Inc/FreshRetailNet-50K", split="train")
df = dataset.to_pandas()

# Step 2: Preview columns
print("📦 Available columns:", df.columns.tolist())

# Step 3: Find top 5 most active store-product combos
top_combos = (
    df.groupby(["store_id", "product_id"])["sale_amount"]
    .sum()
    .sort_values(ascending=False)
    .head(5)
)
print("🔥 Most active combos:\n", top_combos)

# Step 4: Pick the most active combo
store_id, product_id = top_combos.index[0]

# Replace with this to force Store 50 and Product 267
store_id = 122
product_id = 267

print(f"\n✅ Using store_id = {store_id}, product_id = {product_id}")


# Step 5: Filter and prepare data
subset = df[(df["store_id"] == store_id) & (df["product_id"] == product_id)]
subset["dt"] = pd.to_datetime(subset["dt"])

# Step 6: Resample to daily demand
daily = subset.set_index("dt").resample("D").sum().reset_index()
daily = daily.rename(columns={"dt": "ds", "sale_amount": "y"})
daily = daily[["ds", "y"]]

# Step 7: Check for enough data
print("\n📊 Preview of daily data:\n", daily.tail(10))
print("🟢 Non-zero sales days:", (daily["y"] > 0).sum())

if (daily["y"] > 0).sum() < 2:
    raise ValueError("Not enough non-zero data points to train Prophet.")

# Step 8: Train/test split
train = daily[:-7]
test = daily[-7:]

# Step 9: Train Prophet
print("⚙️ Training Prophet model...")
model = Prophet()
model.fit(train)

# Step 10: Forecast next 7 days
future = model.make_future_dataframe(periods=7)
forecast = model.predict(future)

# Step 11: Accuracy metrics
y_true = test["y"].values
y_pred = forecast.set_index("ds").loc[test["ds"]]["yhat"].values

mae = mean_absolute_error(y_true, y_pred)
mape = mean_absolute_percentage_error(y_true, y_pred) * 100

print(f"\n📈 Model Accuracy (last 7 actual days):")
print(f"  - MAE: {mae:.2f}")
print(f"  - MAPE: {mape:.2f}%")

# Step 12: Plot forecast
model.plot(forecast)
plt.title(f"Forecast - Store {store_id}, Product {product_id}")
plt.tight_layout()
plt.savefig("results/forecast_plot.png")
plt.title("Forecast vs. Actuals")
plt.xlabel("Date")
plt.ylabel("Units Sold")
plt.show()

# Step 13: Save forecast
forecast[["ds", "yhat"]].to_csv("results/predictions_store122.csv", index=False)
print("\n✅ Forecast saved to 'results/predictions.csv'")
print("📉 Plot saved to 'results/forecast_plot.png'")
