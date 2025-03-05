// app/providers.tsx
'use client'
import { useState, useEffect } from 'react';
import LoadingScreen from './loading';

export function Providers({ children }) {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
   }, []);

   return (
      <>
         {isLoading && <LoadingScreen />}
         {children}
      </>
   );
}