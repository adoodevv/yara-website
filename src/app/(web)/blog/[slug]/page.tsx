import { client, urlFor } from "@/lib/sanity"
import { PortableText } from "next-sanity"
import Image from "next/image"

export const revalidate = 30

// Update the interface to match what Sanity actually returns
interface SanityBlog {
   currentSlug: string;
   title: string;
   content: any; // This should be a Portable Text block, not a string
   titleImage: any; // This should be a Sanity image reference, not an ImageType
}

async function getData(slug: string) {
   const query = `
   *[_type == 'blog' && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      title,
      content,
      titleImage
   }[0]`
   const data = await client.fetch(query)
   return data
}

export async function generateStaticParams() {
   const query = `*[_type == 'blog'] { "slug": slug.current }`
   const slugs = await client.fetch(query)

   return slugs.map((slug: { slug: string }) => ({
      slug: slug.slug,
   }))
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
   const data: SanityBlog = await getData(params.slug)

   // Make sure data exists before rendering
   if (!data) {
      return <div>Blog post not found</div>
   }

   return (
      <div className="flex flex-col items-center justify-center">
         <h1>
            <span className="block text-base text-center font-semibold tracking-wide">
               Yara Blog
            </span>
            <span className="block text-3xl text-center font-bold tracking-tight mt-2">
               {data.title}
            </span>
         </h1>
         {data.titleImage && (
            <Image
               src={urlFor(data.titleImage).url()}
               alt={data.title || "Blog image"}
               width={800}
               height={800}
               priority
               className="rounded-lg mt-5"
            />
         )}
         <div className="mt-16 prose prose-lg">
            {data.content && <PortableText value={data.content} />}
         </div>
      </div>
   )
}