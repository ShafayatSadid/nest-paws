# 🐾 Nest Paws

Nest Paws is a full-stack pet adoption platform built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js). It connects loving families with pets in need of a forever home.

---

## 🎯 Purpose

The purpose of Nest Paws is to provide a seamless and user-friendly platform where:
- Users can browse and search for adoptable pets
- Authenticated users can submit adoption requests
- Pet owners and shelters can manage their listings and handle adoption requests
- All data is securely stored and managed in MongoDB

---

## 🌐 Live URL

🔗 **Live Demo:** [https://nest-paws.vercel.app](https://nest-paws.vercel.app)



## ✨ Features

- **🔐 Authentication** – Secure login and registration with JWT authentication, HTTP-only cookies, and Google OAuth support.
- **🐶 Browse & Search Pets** – Explore all available pets with advanced search by name, filter by species, and sorting options.
- **📋 Adoption Requests** – Submit adoption requests with pickup date and message. Track request status (Pending / Approved / Rejected).
- **📊 Dashboard** – Manage your pet listings, track adoption requests, and update pet information all from a dedicated dashboard.
- **📝 CRUD Operations** – Full create, read, update, and delete functionality for pet listings (only for the pet owner).
- **🌓 Dark/Light Mode** – Toggle between dark and light themes for a comfortable browsing experience.
- **📱 Fully Responsive** – Optimized for mobile, tablet, and desktop devices.
- **🔒 Secure Backend APIs** – All private routes are protected with JWT verification middleware.

---

## 📦 NPM Packages Used

### Client Side (Next.js)

| Package | Purpose |
|---------|---------|
| `next` | React framework for server-side rendering and routing |
| `react` & `react-dom` | Core React libraries |
| `@heroui/react` | UI component library |
| `next-themes` | Dark/light theme management |
| `react-hook-form` | Form handling and validation |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon library |
| `axios` | HTTP client for API calls |
| `framer-motion` | Animations (optional) |

### Server Side (Express.js)

| Package | Purpose |
|---------|---------|
| `express` | Web framework for Node.js |
| `mongoose` | MongoDB ODM for database modeling |
| `jsonwebtoken` | JWT generation and verification |
| `bcryptjs` | Password hashing |
| `cookie-parser` | Parse HTTP cookies |
| `cors` | Enable Cross-Origin Resource Sharing |
| `dotenv` | Environment variable management |
| `express-validator` | Input validation |
| `jose` | JWT verification with JWKS |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShafayatSadid/nest-paws.git
   cd nest-paws