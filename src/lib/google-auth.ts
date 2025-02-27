"use client"

declare global {
  interface Window {
    google: any;
  }
}

export const initializeGoogleAuth = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (typeof window !== 'undefined' && window.google) {
    return new Promise((resolve) => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });
      resolve(true);
    });
  }
  return Promise.resolve(false);
};

const handleCredentialResponse = (response: any) => {
  // Aquí manejaremos la respuesta de Google
  console.log("ID Token:", response.credential);
  // Aquí implementarías la lógica para enviar el token a tu backend
}; 