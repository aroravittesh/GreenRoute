import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
import matplotlib.pyplot as plt

# Paths
paths = {
    'store_50': 'results/predictions_store50.csv',
    'store_122': 'results/predictions_store122.csv',
    'store_547': 'results/predictions.csv'
}

# 📦 Load predictions
store_demands = {}
for store, path in paths.items():
    df = pd.read_csv(path)
    forecasted_total = df['yhat'].head(7).sum()  # 7-day demand
    store_demands[store] = round(forecasted_total)

# 🔢 Constraints
store_capacity = {
    'store_50': 60,
    'store_122': 50,
    'store_547': 30
}
min_shipment_size = 10

# 📊 Demand Summary
print("📦 Forecasted Demand Summary:")
for store, demand in store_demands.items():
    print(f"  - {store}: {demand} units")

total_predicted = sum(store_demands.values())
print(f"\n📉 Total Predicted Demand: {total_predicted} units")

TOTAL_STOCK = int(total_predicted * 1.1)  # small buffer
print(f"📦 Available Stock: {TOTAL_STOCK} units\n")

# 🚛 Smart Distribution with constraints
allocations = {}
used_stock = 0
for store, demand in store_demands.items():
    cap = store_capacity.get(store, 999)
    alloc = min(demand, cap)
    if alloc < min_shipment_size:
        alloc = 0
    allocations[store] = alloc
    used_stock += alloc

# 🔄 If stock leftover, redistribute proportionally (optional)
leftover = TOTAL_STOCK - used_stock
if leftover > 0:
    for store in allocations:
        if leftover <= 0:
            break
        extra_capacity = store_capacity[store] - allocations[store]
        extra = min(extra_capacity, leftover)
        allocations[store] += extra
        leftover -= extra

# 🧾 Print final plan
print("✅ Smart Distribution Plan (with constraints):")
for store, qty in allocations.items():
    print(f"  → {store}: {qty} units")

# 🗑️ Spoilage Simulation
spoilage = {}
for store in store_demands:
    actual = store_demands[store]
    assigned = allocations.get(store, 0)
    spoilage[store] = max(0, assigned - actual)

total_spoilage = sum(spoilage.values())
print(f"\n♻️ Spoilage Summary:")
for store, waste in spoilage.items():
    print(f"  - {store}: {waste} units")

print(f"🧃 Total Spoilage: {total_spoilage} units")

# 🎯 Accuracy
true_values = list(store_demands.values())
predicted_values = [allocations[s] for s in store_demands]

mae = mean_absolute_error(true_values, predicted_values)
mape = mean_absolute_percentage_error(true_values, predicted_values) * 100

print(f"\n📊 Distribution Accuracy:")
print(f"  - MAE: {mae:.2f}")
print(f"  - MAPE: {mape:.2f}%")

# 📊 Optional: Visualize Plan
labels = list(allocations.keys())
values = list(allocations.values())

plt.figure(figsize=(6,4))
plt.bar(labels, values, color='mediumseagreen')
plt.title('Final Store Allocations')
plt.ylabel('Units Shipped')
plt.tight_layout()
plt.savefig("results/distribution_plan.png")
