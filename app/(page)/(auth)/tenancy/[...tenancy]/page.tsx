'use client'
import Icon from '@/components/Icon'
import { UiButton } from '@/components/ui/UiButton'
import {
  UiCard,
  UiCardHeader,
  UiCardTitle,
  UiCardDescription,
} from '@/components/ui/UiCard'
import { UiContainer } from '@/components/ui/UiContainer'
import { UiInput } from '@/components/ui/UiInput'
import { UiInputGroup } from '@/components/ui/UiInputGroup'
import { UiSelect, UiSelectOption } from '@/components/ui/UiSelect'
import { toast } from '@/components/ui/use-toast'
import { useSearchCity } from '@/hooks/useSearchCity'
import { useSituation } from '@/hooks/useSituation'
import { useSearchCep } from '@/hooks/useViaCep'
import api from '@/lib/api'
import { TenancyDataProps, TenancySchema } from '@/prisma/zod/TenancySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type PageParamsProps = {
  params: { tenancy: string[] }
  searchParams: { id: string }
}

export default function Page({ params: { tenancy } }: PageParamsProps) {
  const id = tenancy[0]
  const router = useRouter()

  const { situation } = useSituation(-1)
  const { city, setSearchCity, getCitySearch, setCity } = useSearchCity()

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<TenancyDataProps>({
    resolver: zodResolver(TenancySchema),
  })

  const zipCode = watch('zipCode')
  const { getCepSearch } = useSearchCep(zipCode)

  const setCityData = (selected: string) => {
    if (!selected) {
      return reset({ codeIBGE: null })
    }

    const {
      name,
      city: {
        state: { acronym },
      },
    } = city.filter((el) => el.id === Number(selected))[0]

    if (selected && name && acronym) {
      return reset({
        codeIBGE: Number(selected),
        city: name.toUpperCase(),
        state: acronym.toUpperCase(),
      })
    }
  }

  const getAddressForZipCode = async () => {
    const data = await getCepSearch()

    if (data) {
      const { logradouro, bairro, complemento } = data
      return reset({
        address: logradouro.toUpperCase(),
        district: bairro.toUpperCase(),
        complement: complemento.toUpperCase(),
        codeIBGE: null,
        city: '',
        state: '',
      })
    }
  }

  const submitEditTenancy: SubmitHandler<TenancyDataProps> = async (values) => {
    const {
      id: idValues,
      address,
      city,
      codeIBGE,
      complement,
      corporateName,
      district,
      document,
      email,
      numberAddress,
      phone,
      situationId,
      socialName,
      state,
      status,
      zipCode,
    } = values

    const dataTenancy = await api
      .put(`/tenancy/${id}`, {
        id: idValues,
        address,
        city,
        codeIBGE,
        complement,
        corporateName,
        district,
        document,
        email,
        numberAddress,
        phone,
        situationId,
        socialName,
        state,
        status,
        zipCode,
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { error, ...data } = dataTenancy.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Salvar Empresa',
        description: 'Não foi possível salvar os dados da empresa, verifique.',
      })
    }

    if (data) {
      return toast({
        variant: 'default',
        title: 'Salvar Empresa',
        description: 'Dados salvos com sucesso',
      })
    }

    return toast({
      variant: 'destructive',
      title: 'Salvar Empresa',
      description: 'Erro não identificado.',
    })
  }

  const getTenancyData = useCallback(async () => {
    const dataTenancy = await api
      .get(`/tenancy/${id}`)
      .then((res) => res)
      .catch((err) => err.response)

    const { error, ...data } = dataTenancy.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Empresa',
        description: 'Não foi possível buscar dados da empresa, verifique.',
      })
    }

    if (dataTenancy.status === 200) {
      setCity(data.ibge ? [data.ibge] : [])
      return reset(data)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Empresa',
      description: 'Erro não identificado.',
    })
  }, [id, reset, setCity])

  useEffect(() => {
    getTenancyData()
  }, [getTenancyData])

  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Empresa - Atualizar</UiCardTitle>
            <UiCardDescription>
              Editar informações do cadastro da empresa.
            </UiCardDescription>
          </UiCardHeader>
        </UiCard>
      </UiContainer>
      <UiContainer className="h-full">
        <UiCard className="mb-5 h-full">
          <form
            onSubmit={handleSubmit(submitEditTenancy)}
            className="grid grid-cols-12 gap-4 p-2"
          >
            <span className="col-span-full items-start pl-2 text-base font-semibold">
              Cadastro Básico
            </span>
            <UiInputGroup className="col-span-1" label={'Código'}>
              <UiInput type="number" {...register('id')} />
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
            <UiInputGroup className="col-span-3" label={'Nome Pessoa'}>
              <UiInput
                data-valid={!errors.corporateName}
                {...register('corporateName')}
              />
            </UiInputGroup>
            <UiInputGroup className="col-span-3" label={'Razão Social'}>
              <UiInput
                data-valid={!errors.socialName}
                {...register('socialName')}
              />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Documento'}>
              <UiInput
                data-valid={!errors.document}
                type="number"
                {...register('document')}
              />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Telefone'}>
              <UiInput data-valid={!errors.phone} {...register('phone')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'E-mail'}>
              <UiInput data-valid={!errors.email} {...register('email')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Cep'}>
              <UiInput data-valid={!errors.zipCode} {...register('zipCode')} />
              <UiContainer className="flex items-center justify-center px-1">
                <Icon
                  name={'search'}
                  className="cursor-pointer hover:scale-105"
                  onClick={getAddressForZipCode}
                />
              </UiContainer>
            </UiInputGroup>
            <UiInputGroup className="col-span-4" label={'Endereço'}>
              <UiInput data-valid={!errors.address} {...register('address')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Número'}>
              <UiInput
                data-valid={!errors.numberAddress}
                {...register('numberAddress')}
              />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Bairro'}>
              <UiInput
                data-valid={!errors.district}
                {...register('district')}
              />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Complemento'}>
              <UiInput
                data-valid={!errors.complement}
                {...register('complement')}
              />
            </UiInputGroup>
            <UiContainer className="col-span-4 grid grid-cols-4 gap-1">
              <UiInputGroup className="col-span-1" label={'Pesquisa'}>
                <UiInput onChange={(e) => setSearchCity(e.target.value)} />
                <UiContainer className="flex items-center justify-center px-1">
                  <Icon
                    name={'search'}
                    className="cursor-pointer hover:scale-105"
                    onClick={getCitySearch}
                  />
                </UiContainer>
              </UiInputGroup>
              <UiInputGroup className="col-span-3" label={'Cidade IBGE'}>
                <UiSelect
                  className="w-full bg-white px-2"
                  {...register('codeIBGE', {
                    onChange(event) {
                      setCityData(event.target.value)
                    },
                  })}
                >
                  {city.map((item) => {
                    const id = item.id
                    const district = item.name
                    const city = item.city.name
                    const state = item.city.state.acronym
                    if (district === city) {
                      return (
                        <UiSelectOption
                          key={id}
                          value={id}
                        >{`${district} - ${state}`}</UiSelectOption>
                      )
                    }
                    return (
                      <UiSelectOption
                        key={id}
                        value={id}
                      >{`${district} - ${city} - ${state}`}</UiSelectOption>
                    )
                  })}
                </UiSelect>
              </UiInputGroup>
            </UiContainer>
            <UiInputGroup className="col-span-2" label={'Cidade'}>
              <UiInput disabled={!!watch().codeIBGE} {...register('city')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Estado'}>
              <UiInput disabled={!!watch().codeIBGE} {...register('state')} />
            </UiInputGroup>
            <UiContainer className="fixed bottom-10 col-span-full flex flex-row gap-2 bg-transparent p-4 max-md:pb-96">
              <UiButton size={'xl'} variant={'primary'} type="submit">
                Salvar
              </UiButton>
              <UiButton
                variant={'cancel'}
                size={'xl'}
                type="button"
                onClick={() => router.push('/home')}
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
