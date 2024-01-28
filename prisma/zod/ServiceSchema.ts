import { z } from 'zod'
import { GroupSchema } from './GroupSchema'

export const ServiceSchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  situationId: z.coerce.number(),
  tenancyId: z.coerce.number(),
  reference: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number(),
  situation: GroupSchema.optional().readonly(),
})

export type ServiceDataProps = z.infer<typeof ServiceSchema>
