# Authentication System (React & Node.js)

This is a simple authentication system built with **React.js** (frontend) and **Node.js/Express.js** (backend) using **JWT tokens** for user authentication.

## Features

- User Signup & Login
- Password Hashing (bcrypt.js)
- JWT-based Authentication (Access & Refresh Tokens)
- Protected Routes
- Logout Functionality

## Tech Stack

### **Frontend** (React.js)
- React Router
- Axios for API requests
- Local Storage for token management

### **Backend** (Node.js & Express.js)
- MongoDB (Mongoose ORM)
- JSON Web Token (JWT) Authentication
- bcrypt.js for password encryption

---

## Installation & Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/dashboard-backend
cd dashboard-backend
```

### **2. Backend Setup**
```sh
npm install
```


Run the backend:
```sh
npm start
```

---

### **3. Frontend Setup**
```sh
cd frontend
npm install
npm start
```

---

## API Routes

### **Authentication Routes**
| Method | Route         | Description        |
|--------|-------------|------------------|
| POST   | `/api/v1/sign-up` | Register new user |
| POST   | `/api/v1/sign-in` | Login user & get tokens |
| GET    | `/api/v1/dashboard` | Get user profile (Protected) |
| POST   | `/api/v1/refresh-token` | Generate new access token |

---

## Usage

1. Sign up a new user at `/signup`.
2. Login at `/login`.
3. On success, user is redirected to `/dashboard`.
4. Logout clears authentication tokens.

---

## License

This project is open-source under the MIT License.

---

## Author

👨‍💻 **Thanuja Priyadarshane**  
🚀 GitHub: (https://github.com/thanujaDev26/dashboard-backend)

