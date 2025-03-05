import { simpleBlogCard } from "@/lib/interface"
import { client, urlFor } from "@/lib/sanity"
import Image from "next/image"
import Link from "next/link"

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
      <div className="grid grid-cols-1 lg:grid-cols-5 mt-5 gap-5">
         {data.map((blog, index) => {
            return (
               <div key={index} className="lg:col-span-1">
                  <Image src={urlFor(blog.titleImage).url()} alt={blog.title} width={300} height={200} className="rounded-t-lg" />
                  <h1 className="text-xl font-bold mt-2">{blog.title}</h1>
                  <p className="line-clamp-3">{blog.smallDescription}</p>
                  <button className="w-full mt-7 bg-black text-white py-2 rounded-lg">
                     <Link href={`/blog/${blog.currentSlug}`}>
                        Read More
                     </Link>
                  </button>
               </div>
            )
         }
         )}
      </div>
   )
}
