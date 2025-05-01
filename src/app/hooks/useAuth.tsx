import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { verifyToken, logoutUser } from '../auth/neon/actionsServer';

export function useAuth() {
  const { data: session } = useSession();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        const { isValid } = await verifyToken(token);
        if (!isValid) {
          await handleLogout();
        }
      }
    };

    if (session?.user?.token) {
      localStorage.setItem('userToken', session.user.token);
      checkToken();
    }
  }, [session]);

  const handleLogout = async () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      await logoutUser(token);
      localStorage.removeItem('userToken');
    }
    await signOut({ callbackUrl: '/auth/login' });
  };

  return {
    user: session?.user,
    isAuthenticated: !!session,
    logout: handleLogout
  };
} 