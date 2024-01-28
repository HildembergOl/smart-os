import { z } from 'zod'
import { ServiceSchema } from './ServiceSchema'

export const OrderServiceItemSchema = z.object({
  id: z.coerce.number().nullish(),
  status: z.coerce.boolean(),
  orderServiceId: z.coerce.number(),
  serviceId: z.coerce.number().nullish(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  discount: z.coerce.number(),
  amount: z.coerce.number(),
  note: z.coerce.string().nullish(),
  service: z.array(ServiceSchema).nullish(),
})

export type OrderServiceItemDataProps = z.infer<typeof OrderServiceItemSchema>
