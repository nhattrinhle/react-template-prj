# React Authentication System

Professional authentication setup với React Query + Redux Toolkit + Google OAuth.

## 🚀 Features

- ✅ **Redux Toolkit** - State management
- ✅ **React Query** - Server state & caching
- ✅ **Google OAuth** - Social login
- ✅ **JWT Authentication** - Access & refresh tokens
- ✅ **Axios Interceptors** - Auto token refresh
- ✅ **TypeScript** - Type safety
- ✅ **Protected Routes** - Route guards
- ✅ **Professional Architecture** - Scalable structure

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── GoogleLoginButton.tsx
│   ├── ui/
│   └── ProtectedRoute.tsx
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── axios.ts
│   └── queryClient.ts
├── pages/
│   └── LoginPage.tsx
├── providers/
│   └── AppProviders.tsx
├── services/
│   └── authService.ts
└── store/
    ├── slices/
    │   └── authSlice.ts
    ├── hooks.ts
    └── index.ts
```

## 🔧 Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project hoặc chọn existing project
3. Enable **Google+ API**
4. Create **OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Authorized origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000`
5. Copy **Client ID** vào `.env.local`

### 3. Backend API Requirements

```typescript
// POST /api/auth/google
{
  credential: string // JWT from Google
}
// Response: { user, accessToken, refreshToken }

// POST /api/auth/login
{
  email: string,
  password: string
}
// Response: { user, accessToken, refreshToken }

// POST /api/auth/refresh
{
  refreshToken: string
}
// Response: { accessToken }

// GET /api/auth/me
// Headers: Authorization: Bearer <accessToken>
// Response: { user }

// POST /api/auth/logout
// Headers: Authorization: Bearer <accessToken>
```

## 🎯 Usage Examples

### Login Component

```tsx
import { useGoogleLogin, useEmailLogin } from "../hooks/useAuth";

const LoginComponent = () => {
  const googleLogin = useGoogleLogin();
  const emailLogin = useEmailLogin();

  // Google login handled by GoogleLoginButton component
  // Email login via form submission
};
```

### Protected Routes

```tsx
import ProtectedRoute from '../components/ProtectedRoute';

// In router config
{
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  )
}
```

### Access User State

```tsx
import { useAppSelector } from "../store/hooks";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return <div>Welcome {user.name}!</div>;
};
```

### API Calls with Auto Token

```tsx
import api from "../lib/axios";

// Token automatically attached via interceptor
const fetchUserData = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};
```

## 🔐 Security Features

### Token Management

- **Access Token**: Short-lived (15-60 minutes)
- **Refresh Token**: Long-lived (7-30 days)
- **Auto Refresh**: Interceptor tự động refresh khi 401
- **Secure Storage**: localStorage (có thể upgrade httpOnly cookies)

### Request Flow

1. User login → Store tokens
2. API request → Auto attach access token
3. If 401 → Auto refresh with refresh token
4. If refresh fails → Logout user

## 🛠️ Development Tools

### React Query DevTools

- Chỉ hiển thị trong development
- Monitor queries & mutations
- Debug cache behavior

### Redux DevTools

- Time-travel debugging
- Action replay
- State inspection

## 📱 Production Considerations

### Security

- Use **httpOnly cookies** thay vì localStorage
- Implement **CSRF protection**
- Add **rate limiting**
- Use **HTTPS** only

### Performance

- Remove DevTools trong production build
- Implement **query pagination**
- Add **error boundaries**
- Use **code splitting**

## 🧪 Testing

```bash
# Run tests
pnpm test

# Test auth flows
pnpm test src/hooks/useAuth.test.ts
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
pnpm build
vercel --prod
```

### Environment Variables (Vercel)

```
VITE_API_URL=https://your-api.com/api
VITE_GOOGLE_CLIENT_ID=your-production-client-id
```

## 📚 Additional Resources

- [React Query Docs](https://tanstack.com/query)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Google OAuth Guide](https://developers.google.com/identity/oauth2/web/guides/overview)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
