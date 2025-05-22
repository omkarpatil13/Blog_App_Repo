Blogging Platform Project Report

Problem Statement
Build a full-stack blogging platform with authentication (login/register), CRUD operations for blog posts, and user-specific dashboards, using a modern web development stack.

My Approach
1. Project Planning
- Broke down the platform into core features: Auth, Posts CRUD, User Dashboard, Home Page, etc.
 - Structured frontend using React and Bootstrap for responsive UI.
 - Set up backend using Node.js + Express.js with MySQL as the database.
2. Backend Development
- Created REST APIs for:
   - User authentication (JWT-based)
   - Blog post creation, update, delete, and view
   - Authorization middleware to protect routes
 - Used environment variables to store sensitive credentials.
3. Frontend Development
- Used React Router for navigation.
 - Axios for HTTP requests to backend APIs.
 - Protected routes based on token presence.
 - Displayed dynamic content like posts, login states, and user-specific posts.
   
AI Tools Used
I used AI tools to increase development speed and solve complex or repetitive coding tasks:

ChatGPT
- Helped write clean and correct logic for backend middleware (e.g., JWT auth).
 - Debugged errors like "invalid signature" in JWTs.
 - Generated reusable frontend components using Bootstrap.
 - Suggested optimized SQL queries for data retrieval and update.
I used AI like ChatGPT as a helper to get ideas and fix issues, but I made sure to understand everything myself and only used suggestions that made sense.

Prerequisites
- Node.js and npm installed
 - MySQL server running locally
 - Git
1. Clone the Repository
git clone https://github.com/<your-username>/<repo-name>.git
 cd <repo-name>
 
2. Backend Setup
cd backend
 npm install

Create `.env` file:
DB_HOST=localhost
 DB_USER=root
 DB_PASSWORD=root
 DB_NAME=blog_app
 JWT_SECRET=your_jwt_secret

Run Server:node index.js

3. Frontend Setup
cd ../frontend
 npm install
 npm start
open http://localhost:3000 in your browser 

