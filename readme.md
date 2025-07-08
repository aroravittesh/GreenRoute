
# 🛣️ GreenRoute — Sustainable Retail Supply Chain Optimizer

GreenRoute is a full-stack platform built to help **central retail hubs** reduce food spoilage and optimize distribution using **AI-powered demand forecasting**, **spoilage simulation**, and **smart inventory planning**. It enables central teams to make data-driven decisions that enhance supply efficiency across multiple stores.

---

## 🔍 Problem It Solves  
Retail chains often face:
- Overstocking and understocking across stores
- Food spoilage due to poor demand estimation
- Inefficient, static inventory distribution

**GreenRoute** addresses these issues by:
- Predicting store-wise product demand
- Simulating spoilage based on shelf life
- Generating optimized stock allocation plans from the central hub

---

## ⚙️ Key Features

1. **📊 Demand Forecasting**
   - Trains AI models (Facebook Prophet) on historical sales data
   - Forecasts 30-day demand per store-product
   - Outputs include charts and downloadable CSVs

2. **🧊 Spoilage Simulation**
   - Calculates waste under FIFO and optimized routing
   - Uses shelf life logic to estimate spoilage
   - Compares naive vs AI-optimized planning

3. **🚚 Smart Inventory Planning**
   - Suggests stock routing from the central hub
   - Minimizes spoilage and stockouts
   - Exports shipment plans for operations

---

## 📁 Project Structure

```
GreenRoute/
│
├── backend/                    → Node.js + Express backend with PostgreSQL
├── mobile-app/GreenRouteApp/  → React Native CLI mobile app
├── Models/                    → AI models (Prophet-based forecasting and spoilage simulation)
└── web-dashboard/             → React.js + Tailwind CSS dashboard (hosted on Vercel)
```

---

## ⚙️ Setup Instructions

### 1️⃣ Backend (Node.js + PostgreSQL)

#### 📦 Requirements:
- Node.js v20.19.3 **(⚠️ Must be at least v20.19.3 or higher)**
- PostgreSQL (running locally or cloud)
- `.env` file setup

#### 📁 `.env` example:
```
PORT=5786
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secure_jwt_key
```

#### 🚀 To Run Backend:
```bash
cd backend
npm install
node index.js
```

---

### 2️⃣ Web Dashboard (React.js + Tailwind CSS)

#### ⚠️ Important:
- Requires **Node.js v20.19.3 or higher** (lower versions will break build due to Vite compatibility)

#### 🚀 To Run:
```bash
cd web-dashboard
npm install
npm run dev
```

- Hosted on: [Vercel](https://vercel.com/) (production version)

---

### 3️⃣ Mobile App (React Native CLI)

#### 📦 Requirements:
- React Native CLI setup
- Android Studio or Xcode
- Emulator or real device

#### 🚀 To Run:
```bash
cd mobile-app/GreenRouteApp
npm install

# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

---

### 4️⃣ AI Models (Facebook Prophet)

#### 🧠 Location: `Models/`

- Contains Python scripts for:
  - Store-wise product demand forecasting
  - Spoilage simulation based on shelf life and routing
- These are automatically triggered from the backend; no manual execution needed

#### 📦 Install Python Dependencies:
```bash
pip install pandas scikit-learn matplotlib datasets prophet seaborn
```

---

## 🧪 Tech Stack

| Layer       | Tech                        |
|-------------|-----------------------------|
| Frontend    | React.js, Tailwind CSS      |
| Mobile      | React Native CLI            |
| Backend     | Node.js, Express.js         |
| Database    | PostgreSQL                  |
| AI Models   | Facebook Prophet (Python)   |
| Hosting     | Vercel (frontend), EC2 (backend)

---

## 🔐 Notes & Warnings

- 🔑 Ensure `.env` is created in `backend/` before starting the server
- ⚠️ Use Node.js **v20.19.3 or above** to avoid compatibility issues with Vite in `web-dashboard`
- ✅ PostgreSQL DB must be up and accessible with correct credentials
- ❌ Do **not** expose `.env` or API keys publicly

---
