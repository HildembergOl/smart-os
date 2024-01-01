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
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PersonDataProps, PersonSchema } from '@/prisma/zod/PersonSchema'
import { UiSelect, UiSelectOption } from '@/components/ui/UiSelect'
import { useSituation } from '@/hooks/useSituation'
import { useSearchCity } from '@/hooks/useSearchCity'
import { ChangeEvent, useEffect } from 'react'
import { useSearchCep } from '@/hooks/useViaCep'

type PageParamsProps = {
  params: { person: string[] }
  searchParams: { id: string }
}
const Page = (url: PageParamsProps) => {
  const { situation } = useSituation()
  const { city, setSearchCity } = useSearchCity()
  const { dataCep, setSearchCep } = useSearchCep()

  const type = url.params.person[0] as 'edit' | 'create'
  const { id } = url.searchParams
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    setFocus,
  } = useForm<PersonDataProps>({
    defaultValues: {
      tenancyId: 1,
    },
    resolver: zodResolver(PersonSchema),
  })
  const submitPersonValues: SubmitHandler<PersonDataProps> = (data) => {
    console.log('Data:', data)
  }

  const setCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value

    if (!selected) {
      setValue('codeIBGE', null)
      return
    }

    const {
      name,
      city: {
        state: { acronym },
      },
    } = city.filter((el) => el.id === Number(selected))[0]

    if (selected && name && acronym) {
      setValue('codeIBGE', Number(selected))
      setValue('city', name.toUpperCase())
      setValue('state', acronym.toUpperCase())
    }
  }

  const setZipCode = () => {
    if (dataCep) {
      const { logradouro, bairro, complemento, localidade } = dataCep
      setValue('address', logradouro.toUpperCase())
      setValue('district', bairro.toUpperCase())
      setValue('complement', complemento.toUpperCase())
      setSearchCity(localidade)
      setFocus('codeIBGE')
    }
  }

  console.log(errors)

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
              <UiInput
                data-valid={!errors.zipCode}
                {...register('zipCode', {
                  onChange(event) {
                    setSearchCep(event.target.value)
                    setValue('zipCode', event.target.value)
                  },
                  onBlur() {
                    setZipCode()
                  },
                })}
              />
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
            <UiContainer className="col-span-3 grid grid-cols-4 gap-1">
              <UiInputGroup className="col-span-1" label={'Pesquisa'}>
                <UiInput onChange={(e) => setSearchCity(e.target.value)} />
              </UiInputGroup>
              <UiInputGroup className="col-span-3" label={'Cidade IBGE'}>
                <UiSelect
                  className="w-full bg-white px-2"
                  {...register('codeIBGE')}
                  onChange={(e) => setCity(e)}
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

export default Page
