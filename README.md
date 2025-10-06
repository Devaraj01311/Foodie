#  Foodie – Online Food Ordering & Delivery Platform

**Foodie** is a full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) application that enables users to browse restaurants, order food online, and track their orders in real-time. Restaurants can manage menus, accept or reject orders, and update order statuses, which are communicated to users via email.

---

## Features

### User Features

* Secure signup/login using **JWT authentication**
* Browse restaurants and food items
* Add items to cart and place orders
* View order history and track orders via email notifications

### Restaurant Features

* Signup/login with authentication
* Add and manage restaurants and menu items
* Accept or reject incoming orders
* Update order status: Preparing → Completed → Delivered
* View orders and system analytics
* Notifications sent to users about order progress via email

---

##  Installation & Setup

###  Clone the Repository

```bash
git clone https://github.com/your-username/Foodie.git
cd Foodie
```

###  Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following:

```
PORT=6001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Run the backend server:

```bash
npm run dev
```

###  Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder with the following:

```
VITE_BASE_URL=http://localhost:6001
```

Run the frontend server:

```bash
npm run dev
```

---

## How It Works

1. **User Journey**:

   * User signs up or logs in → browses restaurants → adds food items to the cart → places an order.
   * The order is saved in MongoDB and assigned to a captain.

2. **Restaurant & Captain Journey**:

   * Restaurant receives new orders → accepts or rejects requests → updates order status.
   * Captains are notified and assist in delivering orders.

3. **Order Tracking**:

   * Users receive email notifications as their order progresses.

---

## Backend API Documentation (Examples)

### **User Endpoints**

#### `POST /users/register`

**Description:** Register a new user.
**Request Body:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### `POST /users/login`

**Description:** Login user and retrieve a token.
**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": { /* user object */ },
  "token": "jwt_token_here"
}
```

#### `GET /users/profile`

**Description:** Retrieve the profile of the logged-in user.
**Headers:**
`Authorization: Bearer <token>`
**Response:**

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

---

### **Restaurant Endpoints**

#### `POST /restaurants/add`

**Description:** Add a new restaurant.
**Request Body:**

```json
{
  "name": "Pizza Palace",
  "address": "123 Food Street"
}
```

**Response:**

```json
{
  "message": "Restaurant added successfully."
}




## Notifications

* Order status updates are sent to users via email.
* Email credentials are configured in the `.env` file using `EMAIL_USER` and `EMAIL_PASS`.

---

## 🛠 Technologies Used

* **Frontend**: React.js, Vite, Tailwind CSS
* **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
* **Email Notifications**: Nodemailer





##  Future Enhancements

* Payment gateway integration
* User reviews and ratings for restaurants
* Enhanced UI/UX with animations and transitions
* Push notifications and live tracking features

---

##  Contact

For questions, contributions, or support, feel free to reach out:
Email:devarajldev01@gmail.com

---

