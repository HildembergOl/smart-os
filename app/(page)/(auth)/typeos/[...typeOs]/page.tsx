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
import { TypeOsDataProps, TypeOsSchema } from '@/prisma/zod/TypeOsSchema'

type PageParamsProps = {
  params: { typeOs: string[] }
  searchParams: { id: string }
}
export default function Page({
  params: { typeOs },
  searchParams: { id },
}: PageParamsProps) {
  const router = useRouter()
  const type = typeOs[0] as 'create' | 'edit'

  const { toast } = useToast()
  const { situation } = useSituation(-1)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TypeOsDataProps>({
    defaultValues: {
      tenancyId: 1,
    },
    resolver: zodResolver(TypeOsSchema),
  })

  const submitTypeOs: SubmitHandler<TypeOsDataProps> = async (data) => {
    const {
      id: idData,
      situationId,
      description,
      invoice,
      status,
      tenancyId,
    } = data
    if (type === 'edit') {
      const typeOsData = await api
        .put(`/typeos/${id}`, {
          id: idData,
          situationId,
          description,
          invoice,
          status,
          tenancyId,
        })
        .then((res) => res)
        .catch((err) => err.response)

      const { error, ...typeOs } = typeOsData.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Tipo Ordem Serviço - Atualizar',
          description: 'Não foi possível atualizar, verifique.',
        })
      }

      if (typeOsData.status === 200) {
        reset(typeOs)
        return toast({
          description: 'Registro atualizado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Tipo Ordem Serviço - Atualizar',
        description: 'Erro não identificado',
      })
    }

    if (type === 'create') {
      const typeOsData = await api
        .post('typeos', data)
        .then((res) => res)
        .catch((err) => err.response)

      const { error, ...typeOs } = typeOsData.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Tipo Ordem Serviço - Cadastrar',
          description: 'Não foi possível cadastrar, verifique.',
        })
      }

      if (typeOsData.status === 200) {
        router.push(`edit?id=${typeOs.id}`)
        return toast({
          description: 'Registro criado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Tipo Ordem Serviço - Cadastrar',
        description: 'Erro não identificado',
      })
    }
  }

  const dataService = useCallback(async () => {
    if (!id) return

    const typeOssData = await api
      .get(`/typeos/${id}`, {
        params: {
          tenancyId: 1,
        },
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { error, ...typeOs } = typeOssData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Tipo Ordem Serviço',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (typeOssData.status === 200) {
      return reset(typeOs)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Tipo Ordem Serviço',
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
              Tipo Ordem Serviço - {type === 'edit' ? 'Atualizar' : 'Cadastrar'}
            </UiCardTitle>
            <UiCardDescription>
              {type === 'edit'
                ? 'Inativar e editar informações do cadastro de tipos de Ordem de Serviço.'
                : 'Cadastrar novo tipo de Ordem de Serviço'}
            </UiCardDescription>
          </UiCardHeader>
        </UiCard>
      </UiContainer>
      <UiContainer className="h-full">
        <UiCard className="mb-5 h-full">
          <form
            onSubmit={handleSubmit(submitTypeOs)}
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
            <UiInputGroup
              className="col-span-3"
              label={'Descrição Tipo Ordem Serviço'}
            >
              <UiInput
                data-valid={!errors.description}
                {...register('description')}
              />
            </UiInputGroup>
            <UiInputGroup className="items-center gap-1 pl-2">
              <UiInput
                className="col-span-1 w-4 ring-0"
                type="checkbox"
                {...register('invoice')}
              />
              <label>Fatura?</label>
            </UiInputGroup>
            <UiContainer className="fixed bottom-10 col-span-full flex flex-row gap-2 bg-transparent p-4 max-md:pb-96">
              <UiButton size={'xl'} variant={'primary'} type="submit">
                {type === 'edit' ? 'Editar' : 'Cadastrar'}
              </UiButton>
              <UiButton
                variant={'cancel'}
                size={'xl'}
                type="button"
                onClick={() => router.push('/typeos')}
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
