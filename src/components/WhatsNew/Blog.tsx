import Link from 'next/link';
import { simpleBlogCard } from "@/lib/interface"
import { client, urlFor } from '@/lib/sanity';

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
   const data: simpleBlogCard[] = await getData()

   return (
      <div className="max-w-6xl mx-auto px-6 pt-12 sm:pt-32">
         <div className="mb-8">
            <h2 className="relative text-2xl sm:text-3xl font-bold">
               Blog & Research Insights
               <img
                  src="/images/15.png"
                  alt="underline header illustration"
                  className="absolute left-0 h-auto w-[70%] sm:w-[50%] top-4"
               />
               <img
                  src="/images/2.png"
                  alt="bulb illustration"
                  className="absolute z-0 -rotate-[45deg] -bottom-40 w-auto -right-32 h-[700px] max-w-4xl mx-auto hidden opacity-50 lg:opacity-100 sm:block"
               />
            </h2>
         </div>

         {/* Blog Posts */}
         <div className="space-y-6">
            {data.map((blog, index) => (
               <div key={index} className="group cursor-pointer">
                  <div className="border-t border-gray-200 pt-6">
                     <Link href={`/blog/${blog.currentSlug}`}>
                        <div className="flex justify-between items-start gap-6">
                           <div className="flex-1">
                              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                                 {blog.title}
                              </h3>
                              <p className="text-gray-600 line-clamp-2">
                                 {blog.smallDescription}
                              </p>
                           </div>
                           <div className="flex-shrink-0">
                              <img
                                 src={urlFor(blog.titleImage).url()} alt={blog.title}
                                 className="w-48 h-32 object-cover rounded-lg"
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