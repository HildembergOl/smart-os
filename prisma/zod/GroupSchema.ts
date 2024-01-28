import { z } from 'zod'

export const GroupSchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  name: z.string().min(1),
  note: z.string().min(1),
  parentId: z.coerce.number().min(1).optional(),
})

export type GroupDataProps = z.infer<typeof GroupSchema>
