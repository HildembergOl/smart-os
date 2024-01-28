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
import { ServiceDataProps } from '@/prisma/zod/ServiceSchema'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type InputSearchProps = {
  id: string
  tenancyId: number
  reference: string
  description: string
}

export default function Page() {
  const [open, setOpen] = useState<boolean>(true)
  const [dataService, setDataService] = useState<ServiceDataProps[]>([])
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

  const getServiceData = useCallback(async () => {
    const serviceData = await api
      .get('/services', {
        params,
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { services, error } = serviceData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Serviços',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (serviceData.status === 200) {
      return setDataService(services)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Serviços',
      description: 'Erro nao identificado, verifique.',
    })
  }, [params])

  useEffect(() => {
    getServiceData()
  }, [getServiceData])

  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Serviços</UiCardTitle>
            <UiCardDescription>
              Cadastro de Serviços e suas parametrizações
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
                <UiInputGroup label={'Referencia'}>
                  <UiInput className="col-span-1" {...register('reference')} />
                </UiInputGroup>
                <UiInputGroup label={'Descrição'}>
                  <UiInput
                    className="col-span-1"
                    {...register('description')}
                  />
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
                <TableHead>Referência</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataService.map((service) => {
                return (
                  <TableRow key={service.id}>
                    <TableCell>
                      {service.id?.toString().padStart(5, '0')}
                    </TableCell>
                    <TableCell>{service.reference}</TableCell>
                    <TableCell>{service.situation?.name}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      {parseFloat(service.price.toString()).toLocaleString(
                        'pt-BR',
                        {
                          style: 'currency',
                          currency: 'BRL',
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      <UiContainer className="flex flex-row items-center justify-evenly gap-2 p-2">
                        <UiButton
                          variant={'primary'}
                          size={'sm'}
                          onClick={() =>
                            router.push(`services/edit?id=${service.id}`)
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
