# Frontend-Backend API Integration

This document explains how the frontend is connected to the backend API using axios and proper error handling.

## File Structure

```
src/
├── api/
│   ├── config.js          # Axios configuration and interceptors
│   ├── auth.js            # Authentication API endpoints
│   ├── otp.js             # OTP verification API endpoints
│   ├── admin.js           # Admin API endpoints
│   ├── student.js         # Student API endpoints
│   ├── superAdmin.js      # Super Admin API endpoints
│   └── index.js           # Main API exports
├── hooks/
│   ├── useAuth.js         # Authentication context and hooks
│   └── useApi.js          # Generic API hooks
├── utils/
│   └── errorHandler.js    # Error handling utilities
└── components/
    └── ProtectedRoute.jsx # Route protection components
```

## API Configuration

The API client is configured in `src/api/config.js`:
- Base URL: `http://localhost:3000/api/v1`
- Automatic cookie handling for authentication
- Request/response interceptors for error handling
- 10-second timeout

## Available API Modules

### 1. Authentication (`auth.js`)
```javascript
import { authAPI } from '../api/auth.js';

// Signup (Students only)
const response = await authAPI.signup({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  branch: 'CS',
  rollNumber: '24BCS001',
  role: 'STUDENT'
});

// Signin (All roles)
const response = await authAPI.signin({
  email: 'john@example.com',
  password: 'password123',
  role: 'STUDENT' // or 'ADMIN', 'SUPER_ADMIN'
});

// Refresh token
const response = await authAPI.refreshToken();
```

### 2. OTP Verification (`otp.js`)
```javascript
import { otpAPI } from '../api/otp.js';

const response = await otpAPI.verifyOTP({
  email: 'john@example.com',
  otp: '123456'
});
```

### 3. Student API (`student.js`)
```javascript
import { studentAPI } from '../api/student.js';

// Get student profile
const profile = await studentAPI.getProfile();

// Get form by share ID
const form = await studentAPI.getForm('share-id-123');

// Submit form
const response = await studentAPI.submitForm('share-id-123', {
  response: [
    { questionId: 'q1', answer: 'Answer text' },
    { questionId: 'q2', answer: 'Multiple choice answer' }
  ]
});
```

### 4. Admin API (`admin.js`)
```javascript
import { adminAPI } from '../api/admin.js';

// Form management
const response = await adminAPI.createForm({ formName: 'Email Allotment Form' });
const response = await adminAPI.publishForm('form-id');

// Question management
const response = await adminAPI.addQuestion('form-id');
const response = await adminAPI.updateQuestion('question-id', { question: 'New question text' });

// Get submissions
const submissions = await adminAPI.getSubmissions('form-id');
```

### 5. Super Admin API (`superAdmin.js`)
```javascript
import { superAdminAPI } from '../api/superAdmin.js';

// Create admin
const response = await superAdminAPI.createAdmin({
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  branch: 'CS'
});

// Delete admin
const response = await superAdminAPI.deleteAdmin({
  email: 'admin@example.com'
});
```

## Using the Authentication Hook

```javascript
import { useAuth } from '../hooks/useAuth.js';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    isStudent, 
    isAdmin, 
    isSuperAdmin,
    signin, 
    signup, 
    logout,
    loading,
    error 
  } = useAuth();

  const handleLogin = async (credentials) => {
    const result = await signin(credentials);
    if (result.success) {
      // Handle successful login
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.email}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

## Error Handling

All API calls use consistent error handling:

```javascript
import { handleApiError } from '../utils/errorHandler.js';

try {
  const response = await someAPI.call();
  // Handle success
} catch (error) {
  const errorInfo = handleApiError(error);
  console.log(errorInfo.message); // User-friendly error message
  console.log(errorInfo.type);    // Error type (validation_error, auth_error, etc.)
}
```

## Route Protection

Use the provided route protection components:

```javascript
import { ProtectedRoute, StudentRoute, AdminRoute, SuperAdminRoute } from '../components/ProtectedRoute.jsx';

// Protect routes by role
<StudentRoute>
  <StudentDashboard />
</StudentRoute>

<AdminRoute>
  <AdminPanel />
</AdminRoute>

<SuperAdminRoute>
  <SuperAdminPanel />
</SuperAdminRoute>
```

## Updated Components

The following components have been updated to use the API integration:

1. **Login.jsx** - Uses `authAPI.signin()` with proper error handling
2. **Signup.jsx** - Uses `authAPI.signup()` with async/await
3. **VerifyOTP.jsx** - Uses `otpAPI.verifyOTP()` for email verification
4. **Dashboard.jsx** - Uses `studentAPI.getProfile()` to fetch student data
5. **App.jsx** - Wrapped with `AuthProvider` for global authentication state

## Backend Endpoints

The frontend connects to these backend endpoints:
- `POST /api/v1/auth/signup` - Student registration
- `POST /api/v1/auth/signin` - User login
- `POST /api/v1/auth/refresh` - Token refresh
- `POST /api/v1/otp/verify_otp` - OTP verification
- `GET /api/v1/student/profile` - Student profile
- `GET /api/v1/student/form/:shareID` - Get form by share ID
- `POST /api/v1/student/form/:shareID` - Submit form
- `POST /api/v1/admin/create/form` - Create form (Admin)
- `GET /api/v1/admin/submissions/:formID` - Get submissions (Admin)
- `POST /api/v1/super_admin/create/admin` - Create admin (Super Admin)

## Getting Started

1. Make sure the backend is running on `http://localhost:3000`
2. The frontend will automatically connect to the backend API
3. Authentication is handled via HTTP-only cookies
4. All API calls include proper error handling and loading states

## Notes

- All API calls use async/await pattern
- Error messages are user-friendly and displayed in the UI
- Loading states are handled automatically
- Authentication state is managed globally via React Context
- CORS is enabled on the backend for frontend communication
