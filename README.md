Here is the updated README with your **YouTube demo video link** added in place of screenshots:

---

# 🆘 Helpify — Lost & Found Made Easy

🔗 **Live Project:** [https://helpify-client.vercel.app/](https://helpify-client.vercel.app/)
🔗 **API Server:** [https://helpify-server.vercel.app/](https://helpify-server.vercel.app/)

---

## 📌 Overview

Helpify is a smart *Lost & Found platform* designed to help users reconnect with their belongings easily. The platform allows users to generate a **unique QR code** for their items. When someone scans that QR code, they can view essential owner information and quickly contact them—making the recovery process seamless and efficient.

---

## ✨ Key Features

✅ **User Authentication (Login / Signup)**
✅ **QR Code Generation**
✅ **Item Management Dashboard**
✅ **Instant Contact Feature**
✅ **Responsive UI**
✅ **Secure Data Storage**

---

## 🛠️ Tech Stack

### **Frontend**

* React.js
* React Router
* Tailwind CSS
* Axios

### **Backend**

* Node.js
* Express.js
* MongoDB

### **Deployment**

* Vercel

---

## 🧩 How Helpify Works

1. User signs up / logs in
2. Adds item details
3. Helpify generates a unique QR code
4. QR code can be printed and attached to belongings
5. When scanned → it opens a verification page
6. Finder sees owner's contact details and reaches out

---

## 📂 Project Structure

```
/client
  ├── src
  │   ├── components
  │   ├── pages
  │   ├── utils
  │   ├── context
  │   └── App.js
  └── package.json

/server
  ├── src
  │   ├── controllers
  │   ├── routes
  │   ├── models
  │   ├── middleware
  │   └── index.js
  └── package.json
```

---

## 🎥 Project Demo Video

👉 **Watch the full walkthrough here:**
[https://youtu.be/xufE2QB1blc](https://youtu.be/xufE2QB1blc)

---

## ⚙️ Installation & Setup

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Add environment variables in `.env` (Backend)

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_here
PORT=4000
```

---

## 🔥 API Endpoints

### User Authentication

* POST `/api/v1/user/register`
* POST `/api/v1/user/login`
* GET `/api/v1/user/profile`

### QR Code Operations

* POST `/api/v1/qr/generate`
* GET `/api/v1/qr/getallqrcodes`
* GET `/verify/:id`

---

## 🚀 Deployment

* Frontend: Vercel
* Backend: Vercel

Both connected to GitHub for continuous deployment.

---

## 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss the proposal.

