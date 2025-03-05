import { fullBlog } from "@/lib/interface"
import { client, urlFor } from "@/lib/sanity"
import { PortableText } from "next-sanity"
import Image from "next/image"

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

export default async function BlogArticle({ params }: { params: { slug: string } }) {
   const data: fullBlog = await getData(params.slug)

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
         <Image src={urlFor(data.titleImage).url()} alt={data.title} width={800} height={800} priority className="rounded-lg mt-5" />
         <div className="mt-16 prose prose-lg">
            <PortableText value={data.content} />
         </div>
      </div>
   )
}