# 🏎️ ProjectF1 API

ProjectF1 is a **Django REST API** (Backend Only) that provides Formula 1 data such as race results, driver standings, and more.  
It integrates with the **[FastF1](https://github.com/theOehrly/Fast-F1)** library to fetch and process real-time and historical F1 data, exposing it through clean API endpoints.

> **Note:** This repository contains **only the backend API**. There is no frontend included. See the [Accessing the API](#-accessing-the-api) section below to learn how to interact with the API endpoints.

> 🚀 **Just want to get started quickly?** Check out the [QUICKSTART.md](./QUICKSTART.md) guide for essential commands!

---

## 🚀 Features

- 📊 Fetch Formula 1 race results and driver data  
- 🧠 FastF1 data integration for advanced F1 analytics  
- ⚙️ PostgreSQL-backed Django project  
- 🧩 Modular app structure (`core`, `api`, `drivers`, `races`...)  
- 🐳 Fully containerized with Docker & Docker Compose  

---

## ⚙️ Prerequisites

Every team member needs the following installed **before running the project**:

| Tool | Version (or higher) | Download |
|------|---------------------|-----------|
| **Git** | any recent | [git-scm.com](https://git-scm.com/) |
| **Docker Desktop** | 4.x or higher | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) |
| **Python** | 3.12+ | [python.org/downloads](https://www.python.org/downloads/) |

> ⚠️ Make sure Docker Desktop is **running** before continuing.  

---

## 🛠️ Local Setup & Running the Backend

### 1. Clone the Repository

```bash
git clone https://github.com/lyes0000/ProjectF1-API.git
cd ProjectF1-API
```

### 2. Start the Backend API Server

Run the following command to start both the Django API server and PostgreSQL database:

```bash
docker-compose up
```

Or run in detached mode (background):

```bash
docker-compose up -d
```

The API server will be available at: **http://localhost:8000**

### 3. Stop the Backend Server

To stop the running containers:

```bash
docker-compose down
```

To stop and remove all data (including database):

```bash
docker-compose down -v
```

---

## 🌐 Accessing the API

Since this is a **backend-only project**, there is no frontend UI. You can access the API endpoints using:

### Available API Endpoints

| Endpoint | Description | Example |
|----------|-------------|---------|
| `GET /api/drivers/` | List all Formula 1 drivers | http://localhost:8000/api/drivers/ |
| `GET /api/races/` | List all races | http://localhost:8000/api/races/ |
| `GET /api/results/` | List all race results | http://localhost:8000/api/results/ |
| `GET /admin/` | Django admin interface | http://localhost:8000/admin/ |

### Methods to Test the API

#### 1. **Web Browser** (Simplest)
Just open your browser and visit:
- http://localhost:8000/api/drivers/
- http://localhost:8000/api/races/
- http://localhost:8000/api/results/

Django REST Framework provides a nice browsable API interface.

#### 2. **cURL** (Command Line)
```bash
# Get all drivers
curl http://localhost:8000/api/drivers/

# Get all races
curl http://localhost:8000/api/races/

# Get all race results
curl http://localhost:8000/api/results/
```

#### 3. **Postman** or **Insomnia**
Import the base URL `http://localhost:8000` and test the endpoints listed above.

#### 4. **Python Requests**
```python
import requests

response = requests.get('http://localhost:8000/api/drivers/')
print(response.json())
```

---

## 🔧 Development Commands

### Run Django Management Commands

```bash
# Access the Django shell
docker-compose exec web python manage.py shell

# Create a superuser for admin access
docker-compose exec web python manage.py createsuperuser

# Run migrations
docker-compose exec web python manage.py migrate

# Collect static files
docker-compose exec web python manage.py collectstatic
```

### View Logs

```bash
# View all logs
docker-compose logs

# View only web service logs
docker-compose logs web

# Follow logs in real-time
docker-compose logs -f
```

### Rebuild Containers

If you modify dependencies or Dockerfile:

```bash
docker-compose up --build
```

---

## 📝 Creating a Frontend

If you want to build a **frontend application** to consume this API:

1. **Create a separate repository** for your frontend (React, Vue, Angular, etc.)
2. Point your frontend API calls to `http://localhost:8000/api/`
3. Consider CORS settings in Django if connecting from a different origin

Example frontend setup with React:
```bash
npx create-react-app f1-frontend
cd f1-frontend
npm install axios
npm start
```

Then in your React app, fetch data from the API:
```javascript
import axios from 'axios';

axios.get('http://localhost:8000/api/drivers/')
  .then(response => console.log(response.data));
```

---

## 📚 Project Structure

```
ProjectF1-API/
├── app/
│   ├── api/          # API views and serializers
│   ├── core/         # Django project settings
│   ├── drivers/      # Driver models and logic
│   ├── races/        # Race models and logic
│   └── manage.py     # Django management script
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.