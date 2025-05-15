'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function GoogleAuthHandler() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.localStorageScript) {
      try {
        const script = new Function(session.user.localStorageScript);
        script();
        
        console.log('Google authentication data stored in localStorage');
        
        setTimeout(() => {
          router.replace('/main');
        }, 100);
      } catch (error) {
        console.error('Error executing localStorage script:', error);
      }
    }
  }, [session, router]);

  return null;
}
