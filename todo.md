# Authentication & Security (Pulse Web)

## 1. Global State Management (Zustand)
- [ ] Install `zustand`.
- [ ] Create `src/lib/store/useAuthStore.ts`.
- [ ] Define types and state for User (e.g., `user`, `isAuthenticated`, `tokens`).
- [ ] Implement `login(user, tokens)` and `logout()` actions within the store.

## 2. API Interceptors & Token Storage
- [ ] Modify `src/lib/api/client.ts` to read the authentication token from `localStorage` or `cookies`.
- [ ] Automatically inject the `Authorization: Bearer <token>` header into every outgoing request.
- [ ] Handle `401 Unauthorized` responses globally (automatically clear the auth store and redirect to `/login`).

## 3. Route Protection (Next.js Middleware)
- [ ] Create `src/middleware.ts` at the project root for Next.js Edge execution.
- [ ] Define protected routes (e.g., `/dashboard`, `/profile`).
- [ ] Implement token checking logic in middleware to redirect unauthenticated users to `/login`.

## 4. UI Implementation: Auth Forms (Zod + React Hook Form)
- [ ] Create `src/modules/auth/LoginForm.tsx`.
- [ ] Create `src/modules/auth/RegisterForm.tsx`.
- [ ] Design forms using our custom Shadcn UI (Radius: 0.5rem, Ring: Primary Color).
- [ ] Integrate `react-hook-form` for form state management without boilerplate.
- [ ] Integrate `zod` schemas for strict client-side validation (e.g., minimum password length, valid email format).

## 5. Next-Intl (Localization)
- [ ] Add translation keys for login and register forms to `messages/en.json` and `messages/tr.json` (e.g., "Email", "Password", "Sign In", "Forgot Password?").
