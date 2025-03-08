'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const HeroSection = () => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 640);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   return (
      <section className="font-neue relative flex flex-col items-center justify-center pb-20 pt-32 px-4 mt-16">
         <div className="relative z-10 text-center max-full mx-auto">
            <h1 className="font-black text-5xl xs:text-6xl sm:text-5xl md:text-6xl lg:text-9xl tracking-tight text-black leading-tight sm:leading-tight">
               {isMobile ? (
                  <>
                     YOUNG<br />
                     AFRICANS<br />
                     RESEARCH<br />
                     ACADEMY
                  </>
               ) : (
                  <>
                     YOUNG AFRICANS<br />
                     RESEARCH ACADEMY
                  </>
               )}
            </h1>
            <p className="font-roman mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto px-4">
               Nurturing the Next Generation of African Researchers
            </p>
         </div>
         <div className="absolute top-10 md:-top-8">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-gray-200/95 sm:via-gray-200 to-transparent"></div>
            <Image
               width={1000}
               height={1000}
               src="/images/10.png"
               alt="planet illustration"
               className="w-3/4 right-0 h-auto max-w-4xl mx-auto"
            />
         </div>
      </section>
   );
};

export default HeroSection;