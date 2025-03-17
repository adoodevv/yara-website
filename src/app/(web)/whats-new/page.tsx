import NewsAndAnnouncements from "@/components/WhatsNew/NewsAndAnnouncements";
import Blog from "@/components/WhatsNew/Blog";
import Image from "next/image";

const News = () => {
   return (
      <div className="relative py-8 px-4 overflow-x-hidden">
         <NewsAndAnnouncements />
         <div className="relative">
            <Image
               width={500}
               height={500}
               src="/images/2.png"
               alt="bulb illustration"
               className="absolute -rotate-[45deg] right-0 bottom-[65%] w-auto h-auto max-h-[700px] max-w-[80%] hidden sm:block z-0 pointer-events-none"
            />
            <Blog />
            <section className="relative max-w-6xl mx-auto px-6 py-12 z-10">
               <h2 className="text-2xl font-bold mb-4">Sign up to get the latest updates from YARA</h2>
               <button className="font-light px-6 py-2 border-[1px] border-black rounded-full hover:bg-black hover:text-white transition-colors">
                  Subscribe Now
               </button>
            </section>
         </div>
      </div>
   );
};

export default News;