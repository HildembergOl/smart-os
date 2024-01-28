import { z } from 'zod'
import { GroupSchema } from './GroupSchema'

export const TypeOsSchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  situationId: z.coerce.number(),
  tenancyId: z.coerce.number(),
  description: z.string().min(1),
  invoice: z.coerce.boolean().nullish(),
  situation: GroupSchema.optional().readonly(),
})

export type TypeOsDataProps = z.infer<typeof TypeOsSchema>
