import Link from 'next/link';
import { SimpleBlogCard } from "@/lib/interface"
import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';

async function getData() {
   const query = `
   *[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
   }`

   const data = await client.fetch(query)

   return data
}

export default async function Blog() {
   const data: SimpleBlogCard[] = await getData()

   return (
      <div className="font-neue max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-32">
         <div className="mb-6 sm:mb-8">
            <h2 className="relative text-2xl sm:text-3xl font-bold">
               Blog & Research Insights
               <Image
                  width={500}
                  height={500}
                  src="/images/15.png"
                  alt="underline header illustration"
                  className="absolute left-0 h-auto w-[70%] sm:w-[50%] top-4"
               />
               <Image
                  width={500}
                  height={500}
                  src="/images/2.png"
                  alt="bulb illustration"
                  className="absolute z-0 -rotate-[45deg] -bottom-40 w-auto -right-32 h-[700px] max-w-4xl mx-auto hidden opacity-50 lg:opacity-100 sm:block"
               />
            </h2>
         </div>

         {/* Blog Posts */}
         <div className="space-y-4 sm:space-y-6">
            {data.map((blog, index) => (
               <div key={index} className="group cursor-pointer">
                  <div className="border-t border-gray-200 pt-4 sm:pt-6">
                     <Link href={`/blog/${blog.currentSlug}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-6">
                           <div className="flex-1 w-full">
                              <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">
                                 {blog.title}
                              </h3>
                              <p className="text-gray-600 line-clamp-3">
                                 {blog.smallDescription}
                              </p>
                           </div>
                           <div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0">
                              <Image
                                 width={500}
                                 height={500}
                                 src={urlFor(blog.titleImage).url()} alt={blog.title}
                                 className="w-full h-48 sm:w-48 sm:h-32 object-cover rounded-lg"
                              />
                           </div>
                        </div>
                     </Link>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};