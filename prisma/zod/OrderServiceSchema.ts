import { z } from 'zod'
import { GroupSchema } from './GroupSchema'
import { TypeOsSchema } from './TypeOsSchema'
import { PersonSchema } from './PersonSchema'
import { OrderServiceItemSchema } from './OrderServiceItemSchema'

export const OrderServiceSchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  tenancyId: z.coerce.number(),
  situationId: z.coerce.number(),
  customerId: z.coerce.number(),
  typeOsId: z.coerce.number(),
  dateCreated: z.coerce.date().nullish(),
  dateAppoint: z.coerce.date().nullish(),
  dateService: z.coerce.date().nullish(),
  codeOS: z.coerce.number().nullish(),
  amountService: z.coerce.number(),
  amountDiscount: z.coerce.number(),
  amount: z.coerce.number(),
  note: z.coerce.string().optional(),
  situation: GroupSchema.nullish(),
  typeOs: TypeOsSchema.nullish(),
  customer: PersonSchema.nullish(),
  orderServiceItem: z.array(OrderServiceItemSchema).optional(),
})

export type OrderServiceDataProps = z.infer<typeof OrderServiceSchema>
