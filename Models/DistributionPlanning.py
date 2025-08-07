# import pandas as pd
# from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
# import matplotlib.pyplot as plt

# # Paths
# paths = {
#     'store_50': 'results/predictions_store50.csv',
#     'store_122': 'results/predictions_store122.csv',
#     'store_547': 'results/predictions.csv'
# }

# # 📦 Load predictions
# store_demands = {}
# for store, path in paths.items():
#     df = pd.read_csv(path)
#     forecasted_total = df['yhat'].head(7).sum()  # 7-day demand
#     store_demands[store] = round(forecasted_total)

# # 🔢 Constraints
# store_capacity = {
#     'store_50': 60,
#     'store_122': 50,
#     'store_547': 30
# }
# min_shipment_size = 10

# # 📊 Demand Summary
# print("📦 Forecasted Demand Summary:")
# for store, demand in store_demands.items():
#     print(f"  - {store}: {demand} units")

# total_predicted = sum(store_demands.values())
# print(f"\n📉 Total Predicted Demand: {total_predicted} units")

# TOTAL_STOCK = int(total_predicted * 1.1)  # small buffer
# print(f"📦 Available Stock: {TOTAL_STOCK} units\n")

# # 🚛 Smart Distribution with constraints
# allocations = {}
# used_stock = 0
# for store, demand in store_demands.items():
#     cap = store_capacity.get(store, 999)
#     alloc = min(demand, cap)
#     if alloc < min_shipment_size:
#         alloc = 0
#     allocations[store] = alloc
#     used_stock += alloc

# # 🔄 If stock leftover, redistribute proportionally (optional)
# leftover = TOTAL_STOCK - used_stock
# if leftover > 0:
#     for store in allocations:
#         if leftover <= 0:
#             break
#         extra_capacity = store_capacity[store] - allocations[store]
#         extra = min(extra_capacity, leftover)
#         allocations[store] += extra
#         leftover -= extra

# # 🧾 Print final plan
# print("✅ Smart Distribution Plan (with constraints):")
# for store, qty in allocations.items():
#     print(f"  → {store}: {qty} units")

# # 🗑️ Spoilage Simulation
# spoilage = {}
# for store in store_demands:
#     actual = store_demands[store]
#     assigned = allocations.get(store, 0)
#     spoilage[store] = max(0, assigned - actual)

# total_spoilage = sum(spoilage.values())
# print(f"\n♻️ Spoilage Summary:")
# for store, waste in spoilage.items():
#     print(f"  - {store}: {waste} units")

# print(f"🧃 Total Spoilage: {total_spoilage} units")

# # 🎯 Accuracy
# true_values = list(store_demands.values())
# predicted_values = [allocations[s] for s in store_demands]

# mae = mean_absolute_error(true_values, predicted_values)
# mape = mean_absolute_percentage_error(true_values, predicted_values) * 100

# print(f"\n📊 Distribution Accuracy:")
# print(f"  - MAE: {mae:.2f}")
# print(f"  - MAPE: {mape:.2f}%")

# # 📊 Optional: Visualize Plan
# labels = list(allocations.keys())
# values = list(allocations.values())

# plt.figure(figsize=(6,4))
# plt.bar(labels, values, color='mediumseagreen')
# plt.title('Final Store Allocations')
# plt.ylabel('Units Shipped')
# plt.tight_layout()
# plt.savefig("results/distribution_plan.png")
import pandas as pd
import matplotlib.pyplot as plt
import os

# 📁 Resolve base path to backend/results
BASE_DIR = os.path.join(os.path.dirname(__file__), "../backend/results")
os.makedirs(BASE_DIR, exist_ok=True)

# 📥 Load Forecast Data from monthly_bar_chart_data.csv
csv_path = os.path.join(BASE_DIR, "monthly_bar_chart_data.csv")
df = pd.read_csv(csv_path)
df = df.sort_values(by="store_id")

# 📊 Forecast Summary
print("📦 Forecasted Demand (30 Days):")
for _, row in df.iterrows():
    print(f"  → Store {int(row['store_id'])}: {int(row['forecasted_units'])} units")

total_forecasted = df["forecasted_units"].sum()
print(f"\n📈 Total Forecasted Demand: {int(total_forecasted)} units")

# 🔢 Total Stock Available
TOTAL_STOCK = 1000  # update as needed
print(f"📦 Available Stock: {TOTAL_STOCK} units")

# ⚖️ Proportional Distribution
df["allocation"] = df["forecasted_units"] / total_forecasted * TOTAL_STOCK
df["allocation"] = df["allocation"].round().astype(int)

# 🔁 Adjustment for rounding error
diff = TOTAL_STOCK - df["allocation"].sum()
if diff != 0:
    df.at[df["allocation"].idxmax(), "allocation"] += diff

# ✅ Final Plan
print("\n✅ Final Distribution Plan:")
for _, row in df.iterrows():
    print(f"  → Store {int(row['store_id'])}: {int(row['allocation'])} units")

# 💾 Save to backend/results
output_csv = os.path.join(BASE_DIR, "final_distribution.csv")
df.to_csv(output_csv, index=False)
print(f"\n📄 Distribution plan saved to: {output_csv}")

# 📊 Save Bar Chart
output_chart = os.path.join(BASE_DIR, "final_distribution_chart.png")
plt.figure(figsize=(8, 5))
plt.bar(df["store_id"].astype(str), df["allocation"], color="seagreen")
plt.title("📦 Proportional Inventory Distribution")
plt.xlabel("Store ID")
plt.ylabel("Units Allocated")
plt.tight_layout()
plt.savefig(output_chart)
plt.close()
print(f"🖼️  Distribution chart saved to: {output_chart}")
