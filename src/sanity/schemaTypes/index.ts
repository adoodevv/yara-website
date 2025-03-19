import { type SchemaTypeDefinition } from 'sanity'
import blog from './blog'
import newsAnnouncement from './newsAnnouncement'
import whatsNew from './whatsNew'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, newsAnnouncement, whatsNew],
}
