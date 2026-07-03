# ShopLoop — React + Node/Express + MongoDB Ecommerce App

A learning-focused fullstack ecommerce app:

- **Frontend**: React (Vite) + Tailwind CSS, product data from [DummyJSON](https://dummyjson.com/)
- **Backend**: Node.js + Express + MongoDB (Mongoose), JWT authentication
- **Features**: browse/search/filter products, product detail pages, cart (persisted per user in MongoDB), checkout flow, order history

## Project structure

```
ecommerce-app/
  backend/     Express API (auth, cart, orders)
  frontend/    React app (Vite + Tailwind)
```

Products themselves are NOT stored in MongoDB — they're fetched live from DummyJSON on the
frontend. Only user accounts, carts, and orders live in your MongoDB database (cart/order items
store a snapshot of product id, title, price, and thumbnail at the time they were added).

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — point this at a local MongoDB instance (`mongodb://127.0.0.1:27017/ecommerce_app`)
  or a free MongoDB Atlas cluster connection string.
- `JWT_SECRET` — any long random string (e.g. run `openssl rand -hex 32`).

Run the server:

```bash
npm run dev
```

The API runs on `http://localhost:5000`. Check `http://localhost:5000/api/health` returns `{"status":"ok"}`.

### API endpoints

| Method | Route                  | Auth | Description               |
|--------|-------------------------|------|----------------------------|
| POST   | /api/auth/register      | No   | Create account             |
| POST   | /api/auth/login         | No   | Log in                     |
| GET    | /api/auth/profile       | Yes  | Get current user           |
| GET    | /api/cart               | Yes  | Get current user's cart    |
| POST   | /api/cart                | Yes  | Add item to cart           |
| PUT    | /api/cart/:productId    | Yes  | Update item quantity       |
| DELETE | /api/cart/:productId    | Yes  | Remove item from cart      |
| DELETE | /api/cart                | Yes  | Clear cart                 |
| POST   | /api/orders              | Yes  | Checkout (creates order from cart) |
| GET    | /api/orders              | Yes  | List current user's orders |
| GET    | /api/orders/:id          | Yes  | Get one order               |

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app runs on `http://localhost:5173`.

## 3. Try it out

1. Sign up for an account.
2. Browse/search/filter products on the home page.
3. Add items to your cart (this calls the backend, so the backend + MongoDB must be running).
4. Go to Cart → Checkout → fill in a shipping address → Place order.
5. View your order history under "Orders" in the navbar.

## Notes for learning

- **Auth**: passwords are hashed with bcrypt; login returns a JWT stored in `localStorage` on
  the frontend and sent as a `Bearer` token on every request via an axios interceptor
  (`frontend/src/api/axios.js`).
- **Cart/Order snapshotting**: since products live on DummyJSON (not your DB), cart and order
  items store a copy of the product's title/price/thumbnail at add-time. This is a common real-world
  pattern — order history shouldn't change if a product's price changes later.
- **No real payments**: checkout simulates a successful payment and marks the order `paid`
  immediately. Wiring up Stripe test mode would be a natural next step once you're comfortable
  with this flow.
- **Where to extend next**: product reviews, an admin panel to manage orders, pagination for the
  product grid, or moving products into your own MongoDB collection instead of DummyJSON.
