import { z } from 'zod'

export const LoginUserSchema = z.object({
  User: z.string().nullable().optional(),
  Email: z
    .string()
    .email('Informe um e-mail válido')
    .toLowerCase()
    .nullable()
    .optional(),
  Password: z.string().min(8, 'Informe no mínimo 8 caracteres'),
})

export type LoginUserFormData = z.infer<typeof LoginUserSchema>
