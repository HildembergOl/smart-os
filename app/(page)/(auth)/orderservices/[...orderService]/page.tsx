'use client'
import { UiButton } from '@/components/ui/UiButton'
import {
  UiCard,
  UiCardDescription,
  UiCardHeader,
  UiCardTitle,
} from '@/components/ui/UiCard'
import { UiContainer } from '@/components/ui/UiContainer'
import { UiInput } from '@/components/ui/UiInput'
import { UiInputGroup } from '@/components/ui/UiInputGroup'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { UiSelect, UiSelectOption } from '@/components/ui/UiSelect'
import { useSituation } from '@/hooks/useSituation'
import { useCallback, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/lib/api'
import { useToast } from '@/components/ui/use-toast'
import {
  OrderServiceDataProps,
  OrderServiceSchema,
} from '@/prisma/zod/OrderServiceSchema'
import { useTypeOs } from '@/hooks/useTypeOs'
import { UiTextArea } from '@/components/ui/UiTextArea'
import Icon from '@/components/Icon'
import { Check, PlusCircleIcon, Trash2 } from 'lucide-react'

type PageParamsProps = {
  params: { orderService: string[] }
  searchParams: { id: string }
}
export default function Page({
  params: { orderService },
  searchParams: { id },
}: PageParamsProps) {
  const router = useRouter()
  const type = orderService[0] as 'create' | 'edit'

  const { toast } = useToast()
  const { situation } = useSituation(-1)
  const { typeOs } = useTypeOs(1)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<OrderServiceDataProps>({
    defaultValues: {
      tenancyId: 1,
      amount: 0.0,
      amountDiscount: 0.0,
      amountService: 0.0,
      customerId: 1,
    },
    resolver: zodResolver(OrderServiceSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orderServiceItem',
  })

  console.log('Errors:', errors)
  console.log('Data:', watch())
  const { customer, codeOS } = watch()

  const submitOrderService: SubmitHandler<OrderServiceDataProps> = async (
    data
  ) => {
    const {
      id: idData,
      situationId,
      status,
      tenancyId,
      amount,
      amountDiscount,
      amountService,
      customerId,
      dateCreated,
      typeOsId,
      codeOS,
      dateAppoint,
      dateService,
      note,
    } = data
    if (type === 'edit') {
      const orderServiceData = await api
        .put(`/orderservices/${id}`, {
          id: idData,
          situationId,
          status,
          tenancyId,
          amount,
          amountDiscount,
          amountService,
          customerId,
          dateCreated,
          typeOsId,
          codeOS,
          dateAppoint,
          dateService,
          note,
        })
        .then((res) => res)
        .catch((err) => err.response)

      const { error, ...orderService } = orderServiceData.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Ordem de Serviço - Atualizar',
          description: 'Não foi possível atualizar, verifique.',
        })
      }

      if (orderServiceData.status === 200) {
        reset(orderService)
        return toast({
          description: 'Registro atualizado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Ordem de Serviço - Atualizar',
        description: 'Erro não identificado',
      })
    }

    if (type === 'create') {
      const orderServiceData = await api
        .post('orderservices', {
          id: idData,
          situationId,
          status,
          tenancyId,
          amount,
          amountDiscount,
          amountService,
          customerId,
          dateCreated,
          typeOsId,
          codeOS,
          dateAppoint,
          dateService,
          note,
        })
        .then((res) => res)
        .catch((err) => err.response)

      const { error, ...orderService } = orderServiceData.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Ordem de Serviço - Cadastrar',
          description: 'Não foi possível cadastrar, verifique.',
        })
      }

      if (orderServiceData.status === 200) {
        router.push(`edit?id=${orderService.id}`)
        return toast({
          description: 'Registro criado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Ordem de Serviço - Cadastrar',
        description: 'Erro não identificado',
      })
    }
  }

  const dataOrderService = useCallback(async () => {
    if (!id) return

    const orderServicesData = await api
      .get(`/orderservices/${id}`, {
        params: {
          tenancyId: 1,
        },
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { error, ...orderService } = orderServicesData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Ordem de Serviço',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (orderServicesData.status === 200) {
      return reset(orderService)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Ordem de Serviço',
      description: 'Erro nao identificado, verifique.',
    })
  }, [id, reset, toast])

  const newItem = () => {
    if (!id) {
      return toast({
        variant: 'destructive',
        title: 'Salve o cabeçalho antes de continuar',
      })
    }

    append({
      id: 0,
      amount: 0,
      discount: 0,
      orderServiceId: parseInt(id),
      price: 0,
      quantity: 0,
      status: true,
      serviceId: null,
    })
  }

  const confirmItem = (id: number, index: number) => {
    console.log(id, index)
  }

  const deleteItem = (id: number, index: number) => {
    console.log(id)
    remove(index)
  }

  useEffect(() => {
    dataOrderService()
  }, [dataOrderService])

  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>
              Ordem de Serviço - {type === 'edit' ? 'Atualizar' : 'Cadastrar'}
            </UiCardTitle>
            <UiCardDescription>
              {type === 'edit'
                ? 'Editar informações de Ordem de de Serviço.'
                : 'Cadastrar nova Ordem de de Serviço'}
            </UiCardDescription>
          </UiCardHeader>
        </UiCard>
      </UiContainer>
      <UiContainer className="h-full">
        <UiCard className="mb-5 h-full">
          <form
            onSubmit={handleSubmit(submitOrderService)}
            className="flex h-full flex-col justify-between"
          >
            <UiContainer className="grid grid-cols-12 gap-4 p-2">
              <span className="col-span-full items-start pl-2 text-base font-semibold">
                Dados da Ordem de Serviço
              </span>
              <UiInputGroup className="col-span-1" label={'Código'}>
                <UiInput type="number" disabled {...register('id')} />
              </UiInputGroup>
              <UiInputGroup className="col-span-1" label={'Ordem Serviço'}>
                <UiInput
                  data-valid={!errors.codeOS}
                  disabled
                  defaultValue={codeOS?.toString().padStart(5, '0')}
                />
              </UiInputGroup>
              <UiInputGroup
                data-valid={!errors.situationId}
                className="col-span-2"
                label={'Situação'}
              >
                <UiSelect
                  className="w-full bg-white px-2"
                  {...register('situationId')}
                >
                  {situation.map((item) => {
                    const { id, name } = item
                    return (
                      <UiSelectOption key={id} value={id.toString()}>
                        {name}
                      </UiSelectOption>
                    )
                  })}
                </UiSelect>
              </UiInputGroup>
              <UiInputGroup
                data-valid={!errors.typeOs}
                className="col-span-2"
                label={'Tipo Ordem Seviço'}
              >
                <UiSelect
                  className="w-full bg-white px-2"
                  {...register('typeOsId')}
                >
                  {typeOs.map((item) => {
                    const { id, description } = item
                    return (
                      <UiSelectOption key={id} value={id.toString()}>
                        {description}
                      </UiSelectOption>
                    )
                  })}
                </UiSelect>
              </UiInputGroup>
              <UiInputGroup className="col-span-2" label={'Emissão'}>
                <UiInput
                  type="date"
                  data-valid={!errors.dateCreated}
                  {...register('dateCreated')}
                />
              </UiInputGroup>
              <UiInputGroup className="col-span-2" label={'Agendamento'}>
                <UiInput
                  type="date"
                  data-valid={!errors.dateAppoint}
                  {...register('dateAppoint')}
                />
              </UiInputGroup>
              <UiInputGroup className="col-span-2" label={'Atendimento'}>
                <UiInput
                  type="date"
                  data-valid={!errors.dateService}
                  {...register('dateService')}
                />
              </UiInputGroup>
              <UiInputGroup
                className="col-span-4 h-20"
                label={'Dados do Cliente'}
              >
                <UiCard
                  data-valid={!errors.customerId}
                  className="h-20 w-full border-0 p-2 ring-1 ring-inset ring-gray-500 
                  focus:ring-inset focus:ring-amber-500 disabled:bg-black/10 
                  data-[valid=false]:ring-red-600 sm:text-sm sm:leading-6"
                >
                  {customer && (
                    <>
                      <span>
                        <strong>Nome:</strong>
                        {` ${customer.id} - ${customer?.corporateName}`}{' '}
                      </span>
                      <span>
                        <strong>Razão Social:</strong>
                        {` ${customer.socialName}`}
                      </span>
                      <span>
                        <strong>Endereço:</strong>
                        {` ${customer.address}, ${customer.numberAddress} - ${customer.district}`}
                      </span>
                      <span>
                        <strong>Cidade:</strong>
                        {`${customer.city}/${customer.state}`}
                      </span>
                    </>
                  )}
                </UiCard>
                <Icon
                  className="absolute bottom-6 right-4 z-0 cursor-pointer hover:scale-105"
                  size={32}
                  name={'search'}
                />
              </UiInputGroup>
              <UiInputGroup
                className="col-span-8 h-20"
                label={'Observações do Serviço'}
              >
                <UiTextArea data-valid={!errors.note} {...register('note')} />
              </UiInputGroup>
            </UiContainer>
            <UiContainer className="mb-4">
              <PlusCircleIcon
                onClick={newItem}
                size={32}
                className="ml-4 cursor-pointer stroke-blue-800 hover:scale-105"
              />
            </UiContainer>
            <UiContainer className="relative col-span-full h-full max-h-96 overflow-auto bg-slate-100/50 px-4 py-2 ">
              <UiContainer className="absolute flex flex-col gap-1 bg-slate-100/50 p-3">
                {fields.map((item, index) => {
                  return (
                    <UiContainer
                      key={item.id}
                      className="grid h-24 w-full grid-cols-12 items-center gap-2 border border-l-8 border-gray-400 border-l-amber-500 p-2 shadow-sm"
                    >
                      <UiInputGroup
                        className="col-span-1"
                        label={'Cod Serviço'}
                      >
                        <UiInput
                          className="col-span-1"
                          {...register(`orderServiceItem.${index}.serviceId`)}
                        />
                      </UiInputGroup>
                      <UiInputGroup className="col-span-3" label={'Serviço'}>
                        <UiInput
                          {...register(
                            `orderServiceItem.${index}.service.${index}.description`
                          )}
                        />
                      </UiInputGroup>
                      <UiInputGroup className="col-span-1" label={'Preço'}>
                        <UiInput
                          {...register(`orderServiceItem.${index}.price`)}
                        />
                      </UiInputGroup>
                      <UiInputGroup className="col-span-1" label={'Desconto'}>
                        <UiInput
                          {...register(`orderServiceItem.${index}.discount`)}
                        />
                      </UiInputGroup>
                      <UiInputGroup className="col-span-1" label={'Total'}>
                        <UiInput
                          {...register(`orderServiceItem.${index}.amount`)}
                        />
                      </UiInputGroup>
                      <UiInputGroup
                        className="col-span-4"
                        label={'Observações do Serviço'}
                      >
                        <UiTextArea
                          data-valid={!errors.note}
                          {...register(`orderServiceItem.${index}.note`)}
                        />
                      </UiInputGroup>
                      <UiContainer className="col-span-1 flex flex-row justify-evenly gap-2 p-2">
                        <UiContainer>
                          <Check
                            color="green"
                            className="cursor-pointer hover:scale-105"
                            onClick={() => confirmItem(item.id, index)}
                          />
                        </UiContainer>
                        <UiContainer>
                          <Trash2
                            color="red"
                            className="cursor-pointer hover:scale-105"
                            onClick={() => deleteItem(item.id, index)}
                          />
                        </UiContainer>
                      </UiContainer>
                    </UiContainer>
                  )
                })}
              </UiContainer>
            </UiContainer>
            <UiContainer className="col-span-full flex flex-row justify-between gap-2 bg-transparent p-4 max-md:pb-96">
              <UiContainer className="flex flex-row gap-2">
                <UiButton size={'xl'} variant={'primary'} type="submit">
                  {type === 'edit' ? 'Editar' : 'Cadastrar'}
                </UiButton>
                <UiButton
                  variant={'cancel'}
                  size={'xl'}
                  type="button"
                  onClick={() => router.push('/orderservices')}
                >
                  Cancelar
                </UiButton>
              </UiContainer>
              <UiContainer className="flex flex-row gap-2">
                <UiInputGroup className="h-14 w-32" label={'Serviço R$'}>
                  <UiInput
                    className="text-xl font-bold"
                    data-valid={!errors.amountService}
                    type="number"
                    step="0.01"
                    {...register('amountService')}
                  />
                </UiInputGroup>
                <UiInputGroup className="h-14 w-32" label={'Desconto R$'}>
                  <UiInput
                    className="text-xl font-bold"
                    data-valid={!errors.amountDiscount}
                    type="number"
                    step="0.01"
                    {...register('amountDiscount')}
                  />
                </UiInputGroup>
                <UiInputGroup className="h-14 w-32" label={'Total'}>
                  <UiInput
                    className="text-xl font-bold"
                    data-valid={!errors.amount}
                    type="number"
                    step="0.01"
                    {...register('amount')}
                  />
                </UiInputGroup>
              </UiContainer>
            </UiContainer>
          </form>
        </UiCard>
      </UiContainer>
    </UiContainer>
  )
}
