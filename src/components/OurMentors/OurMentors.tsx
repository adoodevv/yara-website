import MentorCarousel from "./MentorCarousel"

const OurMentors = () => {
   return (
      <>
         <section className="relative font-neue flex flex-col items-center justify-center pt-8 sm:pt-16">
            <div className="relative z-10 text-center max-w-full mx-auto py-12 sm:py-20 px-4">
               <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight text-black">
                  OUR MENTORS
               </h1>
            </div>
         </section>
         <MentorCarousel />
      </>
   )
}

export default OurMentors
