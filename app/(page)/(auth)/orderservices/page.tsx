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
import { useSituation } from '@/hooks/useSituation'
import { useTypeOs } from '@/hooks/useTypeOs'
import api from '@/lib/api'
import { OrderServiceDataProps } from '@/prisma/zod/OrderServiceSchema'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'

export default function Page() {
  const [open, setOpen] = useState<boolean>(true)
  const [dataOrderService, setDataOrderService] = useState<
    OrderServiceDataProps[]
  >([])
  const [params, setParams] = useState<Partial<OrderServiceDataProps>>({
    tenancyId: 1,
  })

  const { situation } = useSituation(-1)
  const { typeOs } = useTypeOs(1)

  const router = useRouter()
  const { handleSubmit, register, reset } = useForm<
    Partial<OrderServiceDataProps>
  >({
    defaultValues: params,
  })

  const searchValues: SubmitHandler<Partial<OrderServiceDataProps>> = (
    data
  ) => {
    const {
      tenancyId,
      id,
      codeOS,
      typeOsId,
      situationId,
      customer,
      dateCreated,
      dateAppoint,
      dateService,
    } = data

    setParams(() => {
      return {
        tenancyId,
        id,
        codeOS,
        typeOsId,
        situationId,
        socialName: customer?.socialName,
        dateCreated,
        dateAppoint,
        dateService,
      }
    })
  }

  const getOrderService = useCallback(async () => {
    const orderServiceData = await api
      .get('/orderservices', {
        params,
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { orderService, error } = orderServiceData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Serviços',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (orderServiceData.status === 200) {
      return setDataOrderService(orderService)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Serviços',
      description: 'Erro nao identificado, verifique.',
    })
  }, [params])

  useEffect(() => {
    getOrderService()
  }, [getOrderService])

  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Ordem de Serviços</UiCardTitle>
            <UiCardDescription>
              Listagem e cadastro de Ordem de Serviços
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
                className="grid grid-cols-6 gap-2 p-2"
                onSubmit={handleSubmit(searchValues)}
              >
                <UiInputGroup label={'Código'}>
                  <UiInput className="col-span-1" {...register('id')} />
                </UiInputGroup>
                <UiInputGroup label={'Número OS'}>
                  <UiInput className="col-span-1" {...register('codeOS')} />
                </UiInputGroup>
                <UiInputGroup className="col-span-1" label={'Tipo Os'}>
                  <UiSelect
                    className="w-full bg-white px-2"
                    defaultValue={'null'}
                    {...register('typeOsId')}
                  >
                    {typeOs &&
                      typeOs.map((val) => {
                        return (
                          <UiSelectOption
                            key={`tpos-opt-${val.id}`}
                            value={val.id.toString()}
                          >
                            {val.description}
                          </UiSelectOption>
                        )
                      })}
                  </UiSelect>
                </UiInputGroup>
                <UiInputGroup className="col-span-1" label={'Situação'}>
                  <UiSelect
                    className="w-full bg-white px-2"
                    defaultValue={'null'}
                    {...register('situationId')}
                  >
                    {situation &&
                      situation.map((val) => {
                        return (
                          <UiSelectOption
                            key={`st-opt-${val.id}`}
                            value={val.id.toString()}
                          >
                            {val.name}
                          </UiSelectOption>
                        )
                      })}
                  </UiSelect>
                </UiInputGroup>
                <UiInputGroup label={'Nome Cliente'}>
                  <UiInput
                    className="col-span-4"
                    {...register('customer.socialName', {})}
                  />
                </UiInputGroup>
                <UiInputGroup label={'Data Criação'}>
                  <UiInput
                    className="col-span-1"
                    type="date"
                    {...register('dateCreated')}
                  />
                </UiInputGroup>{' '}
                <UiInputGroup label={'Data Agendamento'}>
                  <UiInput
                    className="col-span-1"
                    type="date"
                    {...register('dateAppoint')}
                  />
                </UiInputGroup>
                <UiInputGroup label={'Data Atendimento'}>
                  <UiInput
                    className="col-span-1"
                    type="date"
                    {...register('dateService')}
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
                <TableHead>Numero</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead>Tipo Os</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead>Agendamento</TableHead>
                <TableHead>Atendimento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>{'Serviço (R$)'}</TableHead>
                <TableHead>{'Desconto (R$)'}</TableHead>
                <TableHead>{'Total (R$)'}</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataOrderService.map((orderService) => {
                return (
                  <TableRow key={orderService.id}>
                    <TableCell>
                      {orderService.id?.toString().padStart(5, '0')}
                    </TableCell>
                    <TableCell>{orderService.codeOS}</TableCell>
                    <TableCell>{orderService.situation?.name}</TableCell>
                    <TableCell>{orderService.typeOs?.description}</TableCell>
                    <TableCell>
                      {orderService.dateCreated?.toString()}
                    </TableCell>
                    <TableCell>
                      {orderService.dateAppoint?.toString()}
                    </TableCell>
                    <TableCell>
                      {orderService.dateService?.toString()}
                    </TableCell>
                    <TableCell>
                      {orderService.customer?.corporateName}
                    </TableCell>
                    <TableCell>{orderService.amount}</TableCell>
                    <TableCell>{orderService.amountDiscount}</TableCell>
                    <TableCell>{orderService.amountService}</TableCell>
                    <TableCell>
                      <UiContainer className="flex flex-row items-center justify-evenly gap-2 p-2">
                        <UiButton
                          variant={'primary'}
                          size={'sm'}
                          onClick={() =>
                            router.push(
                              `orderservices/edit?id=${orderService.id}`
                            )
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
