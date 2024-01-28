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
import { SubmitHandler, useForm } from 'react-hook-form'
import { UiSelect, UiSelectOption } from '@/components/ui/UiSelect'
import { useSituation } from '@/hooks/useSituation'
import { useCallback, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/lib/api'
import { useToast } from '@/components/ui/use-toast'
import { ServiceDataProps, ServiceSchema } from '@/prisma/zod/ServiceSchema'

type PageParamsProps = {
  params: { service: string[] }
  searchParams: { id: string }
}
export default function Page({
  params: { service },
  searchParams: { id },
}: PageParamsProps) {
  const router = useRouter()
  const type = service[0] as 'create' | 'edit'

  const { toast } = useToast()
  const { situation } = useSituation(-1)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ServiceDataProps>({
    defaultValues: {
      tenancyId: 1,
    },
    resolver: zodResolver(ServiceSchema),
  })

  const submitServiceValues: SubmitHandler<ServiceDataProps> = async (data) => {
    const {
      id: idData,
      situationId,
      description,
      price,
      reference,
      status,
      tenancyId,
    } = data
    if (type === 'edit') {
      const serviceData = await api
        .put(`/services/${id}`, {
          id: idData,
          situationId,
          description,
          price,
          reference,
          status,
          tenancyId,
        })
        .then((res) => res)
        .catch((err) => err.response)

      const { error, ...service } = serviceData.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Serviço - Atualizar',
          description: 'Não foi possível atualizar, verifique.',
        })
      }

      if (serviceData.status === 200) {
        reset(service)
        return toast({
          description: 'Registro atualizado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Serviço - Atualizar',
        description: 'Erro não identificado',
      })
    }

    if (type === 'create') {
      const service = await api
        .post('services', data)
        .then((res) => res)
        .catch((err) => err.response)

      const { error, ...servicesData } = service.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Serviço - Cadastrar',
          description: 'Não foi possível cadastrar, verifique.',
        })
      }

      if (service.status === 200) {
        router.push(`edit?id=${servicesData.id}`)
        return toast({
          description: 'Registro criado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Serviço - Cadastrar',
        description: 'Erro não identificado',
      })
    }
  }

  const dataService = useCallback(async () => {
    //eslint: ignore
    if (!id) return

    const servicesData = await api
      .get(`/services/${id}`, {
        params: {
          tenancyId: 1,
        },
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { error, ...service } = servicesData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Serviços',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (servicesData.status === 200) {
      return reset(service)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Serviços',
      description: 'Erro nao identificado, verifique.',
    })
  }, [id, reset, toast])

  useEffect(() => {
    dataService()
  }, [dataService])
  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>
              Serviços - {type === 'edit' ? 'Atualizar' : 'Cadastrar'}
            </UiCardTitle>
            <UiCardDescription>
              {type === 'edit'
                ? 'Inativar e editar informações do cadastro de serviços.'
                : 'Cadastrar novo serviço'}
            </UiCardDescription>
          </UiCardHeader>
        </UiCard>
      </UiContainer>
      <UiContainer className="h-full">
        <UiCard className="mb-5 h-full">
          <form
            onSubmit={handleSubmit(submitServiceValues)}
            className="grid grid-cols-12 gap-4 p-2"
          >
            <span className="col-span-full items-start pl-2 text-base font-semibold">
              Cadastro Básico
            </span>
            <UiInputGroup className="col-span-1" label={'Código'}>
              <UiInput type="number" disabled {...register('id')} />
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
                    <UiSelectOption key={id} value={id}>
                      {name}
                    </UiSelectOption>
                  )
                })}
              </UiSelect>
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Referencia'}>
              <UiInput
                data-valid={!errors.reference}
                {...register('reference')}
              />
            </UiInputGroup>
            <UiInputGroup className="col-span-3" label={'Descrição Serviço'}>
              <UiInput
                data-valid={!errors.description}
                {...register('description')}
              />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Preço R$'}>
              <UiInput
                data-valid={!errors.price}
                type="number"
                step="0.01"
                {...register('price')}
              />
            </UiInputGroup>
            <UiContainer className="fixed bottom-10 col-span-full flex flex-row gap-2 bg-transparent p-4 max-md:pb-96">
              <UiButton size={'xl'} variant={'primary'} type="submit">
                {type === 'edit' ? 'Editar' : 'Cadastrar'}
              </UiButton>
              <UiButton
                variant={'cancel'}
                size={'xl'}
                type="button"
                onClick={() => router.push('/services')}
              >
                Cancelar
              </UiButton>
            </UiContainer>
          </form>
        </UiCard>
      </UiContainer>
    </UiContainer>
  )
}
