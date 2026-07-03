# 🛍️ ShopLoop – Full Stack Ecommerce Application

A modern full-stack ecommerce web application built using the **MERN** stack. The application allows users to browse products, register and log in securely, manage a shopping cart, place orders, and view order history.

Product data is fetched from the **DummyJSON API**, while user accounts, carts, and orders are stored in **MongoDB**.

---

## 🚀 Features

* User registration and login
* JWT authentication
* Password hashing with bcrypt
* Browse products
* Search products
* Filter products
* Product details page
* Shopping cart
* Persistent cart stored in MongoDB
* Checkout process
* Order history
* Responsive design using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

### API

* DummyJSON API (Product Catalog)

---

## 📁 Project Structure

```text
ShopLoop/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/salwa010/ShopLoop.git

cd ShopLoop
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the **backend** folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:5000
```

Health Check:

```
http://localhost:5000/api/health
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Create a `.env` file inside the **frontend** folder.

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

## 🧪 How to Use

1. Register a new account.
2. Log in securely.
3. Browse available products.
4. Search and filter products.
5. View product details.
6. Add items to your shopping cart.
7. Checkout by entering a shipping address.
8. View your previous orders.

---

## 🔗 API Endpoints

| Method | Endpoint               | Description     |
| ------ | ---------------------- | --------------- |
| POST   | `/api/auth/register`   | Register user   |
| POST   | `/api/auth/login`      | Login           |
| GET    | `/api/auth/profile`    | User profile    |
| GET    | `/api/cart`            | Get cart        |
| POST   | `/api/cart`            | Add item        |
| PUT    | `/api/cart/:productId` | Update quantity |
| DELETE | `/api/cart/:productId` | Remove item     |
| DELETE | `/api/cart`            | Clear cart      |
| POST   | `/api/orders`          | Checkout        |
| GET    | `/api/orders`          | Get orders      |
| GET    | `/api/orders/:id`      | Order details   |

---

## 🔐 Authentication

* JWT Authentication
* Passwords hashed using bcrypt
* Protected API routes
* Axios interceptor automatically sends Bearer token

---

## 📦 Database

MongoDB stores:

* User Accounts
* Shopping Cart
* Orders

Products are **not stored** in MongoDB. They are retrieved from the **DummyJSON API** and a snapshot (product ID, title, price, thumbnail) is saved in the cart and order documents.

---

## 🌐 Environment Variables

### Backend

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📸 Screenshots

Add screenshots here after deployment.

```
screenshots/
│
├── home.png
├── product-details.png
├── cart.png
├── checkout.png
├── orders.png
```

Example:

```markdown
![Home](screenshots/home.png)

![Cart](screenshots/cart.png)
```

---

## 🚀 Deployment

### Frontend

Deploy on **Vercel**.

### Backend

Deploy on **Render**.

After deployment, update the frontend environment variable:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🔮 Future Improvements

* Stripe payment integration
* Wishlist
* Product reviews
* Admin dashboard
* Product categories
* Pagination
* Inventory management
* Image uploads
* Email notifications

---

## 📄 License

This project was developed for learning and portfolio purposes.

---

## 👩‍💻 Author

**Salwa**

GitHub: https://github.com/salwa010
