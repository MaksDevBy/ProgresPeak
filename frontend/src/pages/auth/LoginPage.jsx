import React from 'react';
import { LoginForm } from '../../features/auth/components/LoginForm.jsx';

export function LoginPage() {
  return (
    <div className="auth-page">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}