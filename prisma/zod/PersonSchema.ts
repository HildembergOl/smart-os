import { z } from 'zod'

export const PersonSchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  tenancyId: z.coerce.number(),
  reference: z.string().nullable(),
  corporateName: z.string().min(1),
  socialName: z.string().min(1),
  document: z.string().min(1),
  situationId: z.coerce.number(),
  phone: z.string().min(1),
  email: z.string().email(),
  zipCode: z.string().nullable(),
  address: z.string().nullable(),
  numberAddress: z.string().min(1).nullable(),
  complement: z.string().nullable(),
  district: z.string().min(1).nullable(),
  city: z.string().min(1).nullable(),
  state: z.string().min(1).nullable(),
  codeIBGE: z.coerce.number().nullable(),
})

export type PersonDataProps = z.infer<typeof PersonSchema>
