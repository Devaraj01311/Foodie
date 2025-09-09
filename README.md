# Foodie🍴 Foodie – Online Food Ordering & Delivery Platform

Foodie is a full-stack MERN application for online food ordering and delivery.
Users can browse restaurants, place orders, and track them in real-time.
Restaurant  can accept orders, update status, and user can get the email about the order status.

🚀 Features
👤 User

Signup/Login with JWT authentication

Browse food items and add to cart

Place orders securely

View order history


Restaurant

Signup/Login with authentication

Add restaurants

Add Items , update and delete items

Receive new delivery requests

Accept/Reject orders



Update status: preparing → compelted → Delivered this status will go to user registered email


View orders and system analytics

🛠️ Tech Stack
🌐 Frontend

⚛️ React 19 – UI framework

🎨 Tailwind CSS – Styling

🎞️ Framer Motion – Animations

🎭 Lucide-React & React Icons – Icons

🔗 Axios – API calls

🛣️ React Router v7 – Routing

🎠 React-Slick & Slick Carousel – Sliders

🔑 JWT Decode – Authentication

🖥️ Backend

🟢 Node.js + Express.js – API server

🗄️ MongoDB + Mongoose – Database

🔑 JWT (jsonwebtoken) – Authentication

🔒 bcryptjs – Password hashing

📧 Nodemailer – Email services (notifications / password reset)

🌍 CORS + Cookie Parser – Security & sessions

⚡ Dotenv – Environment variables

🔧 Dev Tools

🧩 Vite – Frontend build tool

🔁 Nodemon – Hot reload for backend

🧹 ESLint – Code linting

🎨 PostCSS + Autoprefixer – CSS processing

🐙 Git/GitHub – Version control

📂 Project Structure
Foodie/
│── backend/              # Node.js + Express API
│   ├── server.js         # App entry point
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   ├── controllers/      # Business logic
│   ├── middlewares/      # Auth & validation
│   └── .env              # Env variables
│
│── frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── pages/        # Screens (Home, Login, Orders, etc.)
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # State management
│   │   └── assets/       # Static files
│   └── .env              # Env variables

⚙️ Installation & Setup
1️⃣ Clone Repo
git clone https://github.com/your-username/Foodie.git
cd Foodie

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=6001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


Run server:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install


Create .env file:

VITE_BASE_URL=http://localhost:6001


Run client:

npm run dev



🔍 How It Works

User logs in → Places order → Request saved in MongoDB.

Backend assigns captain → Notifies via API/Socket.

Restaurant accepts order → Updates status in DB.

User tracks order via email and status on email id.



👨‍💻 Contributors

You – Full-stack Developer 🚀
