import React from 'react';
import { useLogout } from '../../features/auth/hooks/useLogout.js';
import { Spinner } from '@fluentui/react-components';

export function LogoutPage() {
  useLogout(); // запускаем логаут при монтировании

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Spinner label="Loading..."/>
      <p className="mt-2 text-gray-700">Выход из системы...</p>
    </div>
  );
}