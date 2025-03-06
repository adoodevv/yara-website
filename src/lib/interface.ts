export interface ImageType {
   url: string;
   alt?: string;
   width?: number;
   height?: number;
}

export interface SimpleBlogCard {
   title: string;
   smallDescription: string;
   currentSlug: string;
   titleImage: ImageType;
}

export interface FullBlog {
   currentSlug: string;
   title: string;
   content: string;
   titleImage: ImageType;
}

export interface NewsAnnouncement {
   _id: string;
   title: string;
   slug: string;
   mainImage: ImageType;
   link?: string;
   description?: string;
}

export interface WhatsNew {
   _id: string;
   title: string;
   slug: {
      current: string;
   };
   mainImage: ImageType;
   link?: string;
   description: string;
}
