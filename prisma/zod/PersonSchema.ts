import { z } from 'zod'

export const PersonSchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  tenancyId: z.coerce.number().nullable(),
  reference: z.coerce.string().nullable(),
  corporateName: z.coerce.string().min(1),
  socialName: z.coerce.string().min(1),
  document: z.coerce.string().min(1),
  situationId: z.coerce.number().min(1),
  phone: z.coerce.string().min(1),
  email: z.coerce.string().email(),
  zipCode: z.coerce.number().nullable(),
  address: z.coerce.string().nullable(),
  numberAddress: z.coerce.string().min(1).nullable(),
  complement: z.coerce.string().nullable(),
  district: z.coerce.string().min(1).nullable(),
  city: z.coerce.string().min(1).nullable(),
  state: z.coerce.string().min(1).nullable(),
  codeIBGE: z.coerce.number().nullable(),
})

export type PersonDataProps = z.infer<typeof PersonSchema>
