import { z } from 'zod'

export const TenancySchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  document: z.string().min(1),
  corporateName: z.string().min(1),
  socialName: z.string().min(1),
  situationId: z.coerce.number(),
  phone: z.string().min(1),
  email: z.string().email(),
  zipCode: z.string().min(1),
  address: z.string().min(1),
  numberAddress: z.string().min(1),
  complement: z.string().min(1),
  district: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  codeIBGE: z.coerce.number().nullable(),
})

export type TenancyDataProps = z.infer<typeof TenancySchema>
