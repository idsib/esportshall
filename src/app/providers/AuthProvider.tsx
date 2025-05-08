'use client';

import { ReactNode } from 'react';
import GoogleAuthHandler from '../auth/components/GoogleAuthHandler';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <>
      {/* Include the GoogleAuthHandler component to handle localStorage for Google auth */}
      <GoogleAuthHandler />
      {children}
    </>
  );
}
