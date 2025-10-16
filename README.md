# Frontend Application

This is the frontend application for the FullStack Web Development project. It provides the user interface for interacting with the backend API.

## Technologies Used

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Package Manager:** [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## Setup and Running Locally

1. **Navigate to the frontend directory:**

   ```bash
   cd emailFrontend
   ```

2. **Create a `.env` file (if it doesn't exist):**
   If you don't have a `.env` file, create one and add the `VITE_HTTP_URL`.

   ```bash
   touch .env
   ```

   Add the following to your `.env` file:

   ```
   VITE_HTTP_URL = "http://localhost:3000" # Points to your backend API
   ```

3. **Install Dependencies:**

   ```bash
   npm install # or pnpm install
   ```

4. **Start the Development Server:**

   ```bash
   npm run dev # or pnpm run dev
   ```

5. **Access the Frontend Application:**
   The frontend application will typically be available at `http://localhost:5173` (or another port indicated by your terminal after running `npm run dev`).
