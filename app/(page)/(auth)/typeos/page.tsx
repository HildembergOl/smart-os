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
import { UiSelect, UiSelectOption } from '@/components/ui/UiSelect'
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
import { TypeOsDataProps } from '@/prisma/zod/TypeOsSchema'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type InputSearchProps = {
  page: string
  id: string
  tenancyId: number
  situationId: string
  description: string
  invoice: string
}

export default function Page() {
  const [open, setOpen] = useState<boolean>(true)
  const [dataOsType, setDataOsType] = useState<TypeOsDataProps[]>([])
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

  const getOsType = useCallback(async () => {
    const typeOsData = await api
      .get('/typeos', {
        params,
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { typeOs, error } = typeOsData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Tipos de Serviços',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (typeOsData.status === 200) {
      return setDataOsType(typeOs)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Tipos de Serviços',
      description: 'Erro nao identificado, verifique.',
    })
  }, [params])

  useEffect(() => {
    getOsType()
  }, [getOsType])

  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Tipo Ordem de Serviço</UiCardTitle>
            <UiCardDescription>
              Cadastro de Tipos de Serviço e suas parametrizações
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
                <UiInputGroup label={'Descrição'}>
                  <UiInput
                    className="col-span-1"
                    {...register('description')}
                  />
                </UiInputGroup>
                <UiInputGroup className="col-span-1" label={'Fatura'}>
                  <UiSelect
                    className="w-full bg-white px-2"
                    defaultValue={''}
                    {...register('invoice')}
                  >
                    <UiSelectOption value={''}>Todos</UiSelectOption>
                    <UiSelectOption value={'true'}>Sim</UiSelectOption>
                    <UiSelectOption value={'false'}>Não</UiSelectOption>
                  </UiSelect>
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
                <TableHead>Situação</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Fatura</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataOsType.map((typeOs) => {
                return (
                  <TableRow key={typeOs.id}>
                    <TableCell>
                      {typeOs.id?.toString().padStart(5, '0')}
                    </TableCell>
                    <TableCell>{typeOs.situation?.name}</TableCell>
                    <TableCell>{typeOs.description}</TableCell>
                    <TableCell>{typeOs.invoice ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>
                      <UiContainer className="flex flex-row items-center justify-evenly gap-2 p-2">
                        <UiButton
                          variant={'primary'}
                          size={'sm'}
                          onClick={() =>
                            router.push(`typeos/edit?id=${typeOs.id}`)
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
