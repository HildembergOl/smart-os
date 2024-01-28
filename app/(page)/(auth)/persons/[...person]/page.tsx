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
import { PersonDataProps, PersonSchema } from '@/prisma/zod/PersonSchema'
import { UiSelect, UiSelectOption } from '@/components/ui/UiSelect'
import { useSituation } from '@/hooks/useSituation'
import { useSearchCity } from '@/hooks/useSearchCity'
import { useCallback, useEffect } from 'react'
import { useSearchCep } from '@/hooks/useViaCep'
import Icon from '@/components/Icon'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/lib/api'
import { useToast } from '@/components/ui/use-toast'

type PageParamsProps = {
  params: { person: string[] }
  searchParams: { id: string }
}
export default function Page({
  params: { person },
  searchParams: { id },
}: PageParamsProps) {
  const router = useRouter()
  const type = person[0]
  const { toast } = useToast()
  const { situation } = useSituation(-1)
  const { city, setSearchCity, getCitySearch, setCity } = useSearchCity()

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<PersonDataProps>({
    defaultValues: {
      tenancyId: 1,
    },
    resolver: zodResolver(PersonSchema),
  })

  const values = watch()
  const { getCepSearch } = useSearchCep(watch('zipCode'))
  const submitPersonValues: SubmitHandler<PersonDataProps> = async (data) => {
    const {
      id: idData,
      status,
      situationId,
      tenancyId,
      reference,
      corporateName,
      document,
      email,
      socialName,
      address,
      numberAddress,
      city,
      codeIBGE,
      complement,
      district,
      state,
      phone,
      zipCode,
    } = data
    if (type === 'edit') {
      const personData = await api
        .put(`/persons/${id}`, {
          id: idData,
          status,
          situationId,
          tenancyId,
          reference,
          corporateName,
          document,
          email,
          socialName,
          address,
          numberAddress,
          city,
          codeIBGE,
          complement,
          district,
          state,
          phone,
          zipCode,
        })
        .then((res) => res)
        .catch((err) => err.response)

      const { error } = personData.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Pessoa - Atualizar',
          description: 'Não foi possível atualizar, verifique.',
        })
      }

      if (personData.status === 200) {
        return toast({
          description: 'Registro atualizado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Pessoa - Atualizar',
        description: 'Erro não identificado',
      })
    }

    if (type === 'create') {
      const person = await api
        .post('persons', data)
        .then((res) => res)
        .catch((err) => err.response)

      const { error, ...personData } = person.data

      if (error) {
        return toast({
          variant: 'destructive',
          title: 'Pessoa - Cadastrar',
          description: 'Não foi possível cadastrar, verifique.',
        })
      }

      if (person.status === 200) {
        router.push(`edit?id=${personData.id}`)
        return toast({
          description: 'Registro criado com sucesso',
        })
      }

      return toast({
        variant: 'destructive',
        title: 'Pessoa - Cadastrar',
        description: 'Erro não identificado',
      })
    }
  }

  const setCityData = (selected: string) => {
    if (!selected) {
      return reset({ ...values, codeIBGE: null })
    }

    const {
      name,
      city: {
        state: { acronym },
      },
    } = city.filter((el) => el.id === Number(selected))[0]

    if (selected && name && acronym) {
      return reset({
        ...values,
        codeIBGE: Number(selected),
        city: name.toUpperCase(),
        state: acronym.toUpperCase(),
      })
    }
  }

  const dataPerson = useCallback(async () => {
    if (!id) return

    const personData = await api
      .get(`/persons/${id}`, {
        params: {
          tenancyId: 1,
        },
      })
      .then((res) => res)
      .catch((err) => err.response)

    const { error, ...person } = personData.data

    if (error) {
      return toast({
        variant: 'destructive',
        title: 'Buscar Pessoas',
        description: 'Não foi possível buscar os dados, verifique.',
      })
    }

    if (personData.status === 200) {
      setCity(person.ibge ? [person.ibge] : [])
      return reset(person)
    }

    return toast({
      variant: 'destructive',
      title: 'Buscar Pessoas',
      description: 'Erro nao identificado, verifique.',
    })
  }, [id, reset, setCity, toast])

  const getAddressForZipCode = async () => {
    const data = await getCepSearch()

    if (data) {
      const { logradouro, bairro, complemento } = data
      return reset({
        ...values,
        address: logradouro.toUpperCase(),
        district: bairro.toUpperCase(),
        complement: complemento.toUpperCase(),
        codeIBGE: null,
        city: '',
        state: '',
      })
    }
  }

  useEffect(() => {
    dataPerson()
  }, [dataPerson])

  return (
    <UiContainer className="relative" variant={'page'}>
      <UiContainer className="flex flex-col gap-2">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>
              Pessoas - {type === 'edit' ? 'Atualizar' : 'Cadastrar'}
            </UiCardTitle>
            <UiCardDescription>
              {type === 'edit'
                ? 'Inativar e editar informações do cadastro de pessoas.'
                : 'Cadastrar nova pessoa'}
            </UiCardDescription>
          </UiCardHeader>
        </UiCard>
      </UiContainer>
      <UiContainer className="h-full">
        <UiCard className="mb-5 h-full">
          <form
            onSubmit={handleSubmit(submitPersonValues)}
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
                {type === 'edit' ? 'Editar' : 'Cadastrar'}
              </UiButton>
              <UiButton
                variant={'cancel'}
                size={'xl'}
                type="button"
                onClick={() => router.push('/persons')}
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
