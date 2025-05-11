// src/App.jsx
import React from 'react';
import { AppRoutes } from './routes';

export function App() {
  return (
    // здесь же можно обернуть в провайдеры, Layout и т. д.
    <AppRoutes />
  );
}

export default App
