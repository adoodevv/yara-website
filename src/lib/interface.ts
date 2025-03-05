export interface simpleBlogCard {
   title: string
   smallDescription: string
   currentSlug: string
   titleImage: any
}

export interface fullBlog {
   currentSlug: string
   title: string
   content: string
   titleImage: any
}

export interface newsAnnouncement {
   _id: string
   title: string
   slug: string
   mainImage: any
   link?: string
   description?: string
}

export interface WhatsNew {
   _id: string;
   title: string;
   slug: {
      current: string;
   };
   mainImage: string;
   link?: string;
   description: string;
}