# Restaurant Management Application

This project is a Restaurant Management Application built with React.js for the frontend and Node.js for the backend. The application allows users to manage restaurants, create menus, and access customer panels. Supabase is integrated for storing images efficiently.

---

## Features

### Frontend

1. **Login Page**: Users can log in using their credentials.
2. **Dashboard**: Access a central panel for restaurant management.
3. **Create Restaurant**: Add new restaurants with relevant details.
4. **Create Menu**: Create and manage menu items.
5. **Customer Panel**: Allows customers to view menus for specific restaurants.

### Backend

1. **User Authentication**: JWT-based authentication to secure API routes.
2. **Restaurant Management**: APIs to add, view, and manage restaurants.
3. **Menu Management**: APIs to create and retrieve menu items.
4. **Image Storage**: Supabase integration for secure and scalable image storage.
5. **Middleware**: Middleware to parse JSON and handle CORS.

---

## Technologies Used

### Frontend

- **React.js**
- **React Router** for navigation
- **JWT Decode** for decoding JSON Web Tokens
- **JS Cookie** for cookie management

### Backend

- **Node.js**
- **Express.js** for server-side routing
- **dotenv** for environment variable management
- **cors** for handling Cross-Origin Resource Sharing
- **Supabase** for image storage

---

## File Structure

### Frontend

```
src/
├── pages/
│   ├── login.js
│   ├── Dashboard.js
│   ├── CreateRestaurant.js
│   ├── CreateMenu.js
│   └── CustomerPanel.js
├── App.css
├── App.js
└── index.js
```

### Backend

```
backend/
├── routes/
│   ├── userRoutes.js
│   ├── menuItemRoutes.js
│   └── restaurantRoutes.js
├── app.js
├── .env
└── package.json
```

---

## Installation and Setup

### Prerequisites

- **Node.js** and npm installed
- MongoDB database set up and running
- Supabase account and project created

### Frontend Setup

1. Clone the repository.
2. Navigate to the `frontend` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   SUPABASE_URL=<your_supabase_url>
   SUPABASE_KEY=<your_supabase_key>
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

The backend uses the following environment variables:

- `PORT`: Port number for the server
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWTs
- `SUPABASE_URL`: URL of your Supabase project
- `SUPABASE_KEY`: API key for accessing Supabase

---

## API Endpoints

### User Routes

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /api/v2/login  | User login        |
| POST   | /api/v2/signup | User registration |

### Restaurant Routes

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | /api/v2/restaurants | Create a new restaurant |
| GET    | /api/v2/restaurants | Get all restaurants     |

### Menu Item Routes

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/v2/menu-items | Add a new menu item |
| GET    | /api/v2/menu-items | Get all menu items  |

### Image Routes

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | /api/v2/upload-image | Upload an image to Supabase |
| GET    | /api/v2/images       | Retrieve stored images      |

---

## Usage

1. **Start the Backend**: Ensure the backend server is running on `http://localhost:5000`.
2. **Start the Frontend**: The frontend will be available on `http://localhost:3000`.
3. **Login**: Use the login page to authenticate.
4. **Dashboard**: Navigate to the dashboard to manage restaurants and menus.

---

## Dependencies

### Frontend

- `react`
- `react-router-dom`
- `jwt-decode`
- `js-cookie`

### Backend

- `express`
- `dotenv`
- `cors`
- `mongoose`
- `jsonwebtoken`
- `supabase`

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes.
4. Push the branch and create a pull request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

Special thanks to all contributors and the open-source community for their amazing tools and libraries.
