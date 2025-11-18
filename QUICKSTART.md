# 🚀 Quick Start Guide

## ⚡ TL;DR - Commands to Run the Backend

### Start the API Server
```bash
docker-compose up
```

The API will be available at: **http://localhost:8000**

### Stop the API Server
```bash
docker-compose down
```

---

## 📍 Important Notes

1. **This is a BACKEND API ONLY** - There is no frontend included in this repository
2. **Requirements**: You need Docker Desktop installed and running
3. **Access the API**: Open your browser and visit http://localhost:8000/api/drivers/

---

## 🌐 Available API Endpoints

Once the server is running, you can access these endpoints:

| Endpoint | URL |
|----------|-----|
| **Drivers** | http://localhost:8000/api/drivers/ |
| **Races** | http://localhost:8000/api/races/ |
| **Race Results** | http://localhost:8000/api/results/ |
| **Admin Panel** | http://localhost:8000/admin/ |

---

## 🧪 Quick Test

Open your browser and visit:
```
http://localhost:8000/api/drivers/
```

You should see a JSON response with Formula 1 driver data!

---

## 🎯 What This Project IS and IS NOT

✅ **This IS:**
- A Django REST API (backend)
- Provides F1 data through HTTP endpoints
- Can be accessed by any HTTP client (browser, curl, Postman, frontend apps)

❌ **This IS NOT:**
- A frontend application
- A website with a UI
- A React/Vue/Angular app

---

## 💡 Want a Frontend?

If you want to build a frontend to display this data:

1. Create a separate frontend project (React, Vue, Angular, etc.)
2. Make HTTP requests to `http://localhost:8000/api/` from your frontend
3. Display the data in your UI

---

## 📖 Need More Details?

Check the main [README.md](./README.md) for:
- Full documentation
- Development commands
- Troubleshooting
- Contributing guidelines
