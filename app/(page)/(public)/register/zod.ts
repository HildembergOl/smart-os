import { z } from 'zod'

export const RegisterUserSchema = z.object({
  DocumentPerson: z
    .string()
    .min(14, 'Mínimo 14 caracteres.')
    .max(14, 'Máximo 14 caracteres.'),
  /*   .transform((document) => {
            switch (document.length) {
                case 11:
                    return document.replace(
                        /^(\d{3})(\d{3})(\d{3})(\d{2})/,
                        '$1.$2.$3-$4'
                    )
                case 14:
                    return document.replace(
                        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                        '$1.$2.$3/$4-$5'
                    )
            }
            return document.toString()
        })*/
  NamePerson: z
    .string()
    .nonempty('Informe seu nome completo')
    .transform((user) => {
      return user
        .trim()
        .toLowerCase()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  User: z
    .string()
    .nonempty('Informe um nome de usuário')
    .transform((user) => {
      const userCode = user.trim().toLowerCase().split(' ').join()
      const random = Math.random() * 10548
      return '@' + userCode.concat(random.toFixed(0).toString())
    }),
  Email: z.string().email('Informe um e-mail válido').toLowerCase().nonempty(),
  Password: z.string().min(8, 'Informe no mínimo 8 caracteres').nonempty(''),
})

export type RegisterUserFormData = z.infer<typeof RegisterUserSchema>
