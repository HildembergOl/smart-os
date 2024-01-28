'use client'
import Icon from '@/components/Icon'
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
import { toast } from '@/components/ui/use-toast'
import api from '@/lib/api'
import { PersonDataProps } from '@/prisma/zod/PersonSchema'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type InputSearchProps = {
  id: string
  tenancyId: number
  corporateName: string
  socialName: string
  address: string
  city: string
  document: string
  district: string
}

export default function Page() {
  const [open, setOpen] = useState<boolean>(true)
  const [dataPerson, setDataPerson] = useState<PersonDataProps[]>([])
  const [params, setParams] = useState<Partial<InputSearchProps>>({
    tenancyId: 1,
  })

  const router = useRouter()
  const { handleSubmit, register, reset } = useForm<InputSearchProps>({
    defaultValues: params,
  })

  const searchValues: SubmitHandler<InputSearchProps> = (data) => {
    setParams(() => data)
  }

  const getPersonData = useCallback(async () => {
    const personData = await api
      .get('/persons', {
        params,
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { persons, error } = personData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Pessoas',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (personData.status === 200) {
      return setDataPerson(persons)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Pessoas',
      description: 'Erro nao identificado, verifique.',
    })
  }, [params])

  useEffect(() => {
    getPersonData()
  }, [getPersonData])

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
          <UiContainer className="flex flex-row items-center gap-2 p-4">
            <span className="flex items-center justify-center text-2xl font-semibold">
              Pesquisar
            </span>
            <Icon
              size={20}
              className={`items-baseline justify-start transition duration-700 ease-in-out ${
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
                  <UiInput
                    className="col-span-1"
                    {...register('corporateName')}
                  />
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
        <UiCard className="absolute flex w-full flex-col overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
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
              {dataPerson.map((person) => {
                return (
                  <TableRow key={person.id}>
                    <TableCell>
                      {person.id?.toString().padStart(5, '0')}
                    </TableCell>
                    <TableCell>{person.reference}</TableCell>
                    <TableCell>{person.corporateName}</TableCell>
                    <TableCell>{person.socialName}</TableCell>
                    <TableCell>{person.document}</TableCell>
                    <TableCell>{person.phone}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{`${person.address}, ${person.numberAddress}`}</TableCell>
                    <TableCell>{person.district}</TableCell>
                    <TableCell>{person.city}</TableCell>
                    <TableCell>{person.state}</TableCell>
                    <TableCell>
                      <UiContainer className="flex flex-row items-center justify-evenly gap-2 p-2">
                        <UiButton
                          variant={'primary'}
                          size={'sm'}
                          onClick={() =>
                            router.push(`persons/edit?id=${person.id}`)
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
