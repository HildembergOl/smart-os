'use client'
import Icon from '@/components/Icon'
import { Indicator } from '@/components/Indicator'
import { UiButton } from '@/components/ui/UiButton'
import {
  UiCard,
  UiCardDescription,
  UiCardHeader,
  UiCardTitle,
} from '@/components/ui/UiCard'
import { UiContainer } from '@/components/ui/UiContainer'
import { UiDialog } from '@/components/ui/UiDialog'
import { UiInput } from '@/components/ui/UiInput'
import { UiInputGroup } from '@/components/ui/UiInputGroup'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { dataPerson } from '@/constants/api-person'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type InputSearchProps = {
  id: string
  name: string
  address: string
  city: string
  document: string
  district: string
}

const Page = () => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
    reset,
  } = useForm<InputSearchProps>()
  const searchValues: SubmitHandler<InputSearchProps> = (data) => {
    console.log(data)
  }
  console.log(errors)

  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Pessoas</UiCardTitle>
            <UiCardDescription>
              Cadastro de Fornecedores e clientes.
            </UiCardDescription>
          </UiCardHeader>
        </UiCard>
        <UiCard className="sticky top-0">
          <UiContainer className="flex flex-row p-4 gap-2 items-center">
            <span className="flex items-center justify-center text-2xl font-semibold">
              Pesquisar
            </span>
            <Icon
              size={20}
              className={`items-baseline justify-start transition ease-in-out duration-700 ${
                open ? 'rotate-180' : ''
              }`}
              name="arrow-down-right-square"
              onClick={() => setOpen(!open)}
            />
          </UiContainer>
          {open && (
            <UiContainer>
              <form
                className="grid grid-cols-8 gap-2 p-2"
                onSubmit={handleSubmit(searchValues)}
              >
                <UiInputGroup label={'Código'}>
                  <UiInput className="col-span-1" {...register('id')} />
                </UiInputGroup>
                <UiInputGroup label={'Nome Pessoa'}>
                  <UiInput className="col-span-1" {...register('name')} />
                </UiInputGroup>
                <UiInputGroup label={'Documento'}>
                  <UiInput className="col-span-1" {...register('document')} />
                </UiInputGroup>
                <UiInputGroup label={'Endereço'}>
                  <UiInput className="col-span-1" {...register('address')} />
                </UiInputGroup>
                <UiInputGroup label={'Bairro'}>
                  <UiInput className="col-span-1" {...register('district')} />
                </UiInputGroup>{' '}
                <UiInputGroup label={'Cidade'}>
                  <UiInput className="col-span-1" {...register('city')} />
                </UiInputGroup>
                <UiContainer className="flex flex-row gap-2 max-md:col-span-full">
                  <UiButton variant={'primary'} type="submit">
                    Pesquisar
                  </UiButton>
                  <UiButton
                    variant={'secondary'}
                    type="button"
                    onClick={() => reset()}
                  >
                    Limpar
                  </UiButton>
                </UiContainer>
              </form>
            </UiContainer>
          )}
        </UiCard>
      </UiContainer>
      <UiContainer className="relative">
        <UiCard className="absolute flex flex-col w-full overflow-x-auto overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referencia</TableHead>
                <TableHead>Razão Social</TableHead>
                <TableHead>Fantasia</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataPerson.map((person, i) => {
                return (
                  <TableRow key={person.document + i}>
                    <TableCell>
                      {person.reference + ' ' + i.toString().padStart(3, '0')}
                    </TableCell>
                    <TableCell>
                      {person.corporateName +
                        ' ' +
                        i.toString().padStart(3, '0')}
                    </TableCell>
                    <TableCell>
                      {person.socialName + ' ' + i.toString().padStart(3, '0')}
                    </TableCell>
                    <TableCell>{person.document}</TableCell>
                    <TableCell>{person.phone}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{`${person.address}, ${person.numberAddress}`}</TableCell>
                    <TableCell>{person.district}</TableCell>
                    <TableCell>{person.city}</TableCell>
                    <TableCell>{person.state}</TableCell>
                    <TableCell>
                      <UiContainer className="flex flex-row p-2 items-center gap-2 justify-evenly">
                        <UiButton
                          variant={'primary'}
                          size={'sm'}
                          onClick={() =>
                            router.push(`persons/edit?id=${person.reference}`)
                          }
                        >
                          Editar
                        </UiButton>
                        <UiDialog>
                          <UiButton variant={'red'} size={'sm'}>
                            Excluir
                          </UiButton>
                        </UiDialog>
                      </UiContainer>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </UiCard>
      </UiContainer>
    </UiContainer>
  )
}
export default Page
