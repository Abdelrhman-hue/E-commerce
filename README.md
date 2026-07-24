# 🛒 E-Commerce Full Stack

A modern full-stack E-Commerce application built with **Next.js**, **Node.js**, **Express**, **MongoDB**, and **Stripe Checkout**.

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-based Authorization (Admin/User)

### 🛍️ Products
- Browse Products
- Product Details
- Search Products
- Filter Products
  - Category
  - Price Range
  - Rating
  - Brand
  - Availability
- Pagination

### 🛒 Shopping Cart
- Add to Cart
- Remove from Cart
- View Cart
- Order Summary

### 📦 Checkout
- Shipping Address Form
- Payment Page
- Stripe Checkout Integration
- Order Success Page
- Order Cancel Page

### 💳 Payments
- Secure Stripe Checkout
- Stripe Webhook
- Automatic Cart Clearing After Successful Payment

### 📱 Responsive Design
- Mobile Friendly
- Tablet Support
- Desktop Support

---

# 🛠️ Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Stripe
- Express Validator

---

# 📂 Project Structure

```
E-commerce/
│
├── Front-end/
│   ├── app/
│   ├── components/
│   ├── api/
│   ├── public/
│   └── ...
│
├── Back-end/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── ...
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/E-commerce.git
```

## Frontend

```bash
cd Front-end

npm install

npm run dev
```

---

## Backend

```bash
cd Back-end

npm install

npm start
```

---

# 🔑 Environment Variables

## Backend

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

STRIPE_SECRET_KEY=your_secret_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret

CLIENT_URL=http://localhost:3000
```

---

## Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# 📸 Screens

- Home Page
- Shop
- Search
- Product Details
- Shopping Cart
- Address
- Payment
- Order Success
- Order Cancel

---

# 🔍 API Features

### Products

- Get Products
- Search Products
- Filter Products
- Pagination
- Product Details

### Cart

- Add Item
- Remove Item
- Clear Cart

### Orders

- Create Order
- Get Orders

### Payments

- Create Stripe Checkout Session
- Stripe Webhook

---

# 📌 Future Improvements

- Wishlist ❤️
- Product Reviews
- Product Images Upload
- Coupons & Discounts
- Dashboard
- Admin Panel
- Order Tracking
- Email Notifications
- Inventory Management

---

# 👨‍💻 Author

**Abdelrhman**

GitHub:
https://github.com/Abdelrhman-hue

LinkedIn:
(Add your LinkedIn profile)

---

# ⭐ Support

If you like this project, don't forget to ⭐ the repository.
