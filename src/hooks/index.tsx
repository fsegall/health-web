import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    {/* <PaginationProvider>{children}</PaginationProvider> */}
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
