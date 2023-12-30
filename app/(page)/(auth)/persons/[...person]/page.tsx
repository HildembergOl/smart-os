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
import { Person } from '@prisma/client'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

type PageParamsProps = {
  params: { person: string[] }
  searchParams: { id: string }
}
const Page = (url: PageParamsProps) => {
  const type = url.params.person[0] as 'edit' | 'create'
  const { id } = url.searchParams
  const router = useRouter()
  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
    reset,
  } = useForm<Person>()
  const searchValues: SubmitHandler<Person> = (data) => {
    console.log(data)
  }
  const searchValuesNew = () => {
    const data = getValues()
    console.log(data)
  }

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
        <UiCard className="h-full">
          <form className="grid grid-cols-12 gap-4 p-2">
            <span className="col-span-full text-base font-semibold pl-2 items-start">
              Cadastro Básico
            </span>
            <UiInputGroup className="col-span-1" label={'Código'}>
              <UiInput disabled {...register('id')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Referencia'}>
              <UiInput {...register('reference')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-3" label={'Nome Pessoa'}>
              <UiInput {...register('corporateName')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-3" label={'Razão Social'}>
              <UiInput {...register('socialName')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Documento'}>
              <UiInput {...register('document')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Telefone'}>
              <UiInput {...register('phone')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'E-mail'}>
              <UiInput {...register('email')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-4" label={'Endereço'}>
              <UiInput {...register('address')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Cep'}>
              <UiInput {...register('zipCode')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Número'}>
              <UiInput {...register('numberAddress')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Complemento'}>
              <UiInput {...register('complement')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Bairro'}>
              <UiInput {...register('district')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-2" label={'Cidade'}>
              <UiInput {...register('city')} />
            </UiInputGroup>
            <UiInputGroup className="col-span-1" label={'Estado'}>
              <UiInput {...register('state')} />
            </UiInputGroup>
          </form>
        </UiCard>
      </UiContainer>
      <UiContainer className="flex flex-row gap-2 p-4 col-span-full max-md:pb-96 ">
        <UiButton
          size={'xl'}
          variant={'primary'}
          type="submit"
          onClick={searchValuesNew}
        >
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
    </UiContainer>
  )
}

export default Page
