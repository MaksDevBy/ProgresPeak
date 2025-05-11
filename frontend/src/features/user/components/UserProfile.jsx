import React from 'react';
import { useCurrentUser } from '../hooks';

export function UserProfile() {
  const { user, loading, error } = useCurrentUser();

  if (loading) return <div>Loading user...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {/* Отображаем ID пользователя */}
      <p><strong>ID:</strong> {user.id}</p>
      {/* Отображаем email пользователя */}
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}