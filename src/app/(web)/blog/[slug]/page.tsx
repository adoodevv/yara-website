import { FullBlog } from "@/lib/interface"
import { client, urlFor } from "@/lib/sanity"
import { PortableText } from "next-sanity"
import Image from "next/image"

export const revalidate = 30

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
   const query = `*[_type == 'blog'] { "slug": slug.current }`;
   const slugs = await client.fetch(query);

   return slugs.map((slug: { slug: string }) => ({
      slug: slug.slug,
   }));
}

// Moving the type annotation to a separate interface
interface BlogArticleProps {
   params: {
      slug: string;
   };
}

export default async function BlogArticle(props: BlogArticleProps) {
   const { params } = props;
   const data: FullBlog = await getData(params.slug)

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