'use client'

import { MainPageLogin } from '@/components/MainLogin'
import { useForm, FormProvider } from 'react-hook-form'
import { RegisterUserFormData, RegisterUserSchema } from './zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/Form'
import Link from 'next/link'
import api from '@/lib/api'
import { toast } from '@/components/ui/use-toast'
import { AxiosResponse } from 'axios'
import { storage } from '@/services/localstorage'
import { useRouter } from 'next/navigation'
import { loginTokenUserType } from '@/types/loginTokenUserType'
import Image from 'next/image'
export default function PageRegister() {
  const FormUser = useForm<RegisterUserFormData>({
    resolver: zodResolver(RegisterUserSchema),
  })
  const router = useRouter()

  const { handleSubmit, getValues } = FormUser

  const RegisterUser = async (data: RegisterUserFormData) => {
    const userRegistered = await api
      .post('register', data)
      .then((e: AxiosResponse<loginTokenUserType>) => e)
      .catch((err) => err.response)

    if (userRegistered === undefined) {
      toast({
        variant: 'destructive',
        title: 'Erro ao conectar ao Banco de Dados.',
      })
      return
    }

    const { Permission, error } = userRegistered.data

    storage().setItem('permissions', Permission)

    if (error) {
      return toast({
        variant: 'destructive',
        title: error,
      })
    }

    toast({
      title: 'Usuário criado com sucesso.',
    })
    router.push('/home')
  }

  const RegisterTenancy = async () => {
    const { DocumentPerson } = getValues()
    if (DocumentPerson.length !== 14)
      return toast({
        variant: 'destructive',
        title: 'Preencha o CNPJ do Operador Logístico',
      })

    const tenancy = await api
      .post(`/register`, {
        createTenancy: DocumentPerson,
      })
      .then((e) => e)
      .catch((err) => err.response)

    if (tenancy.status === 200) {
      return toast({
        title: 'Operador criado com sucesso.',
      })
    }

    return toast({
      variant: 'destructive',
      title: tenancy.data.error,
    })
  }

  return (
    <MainPageLogin>
      <Image
        src="/background-login.jpeg"
        alt="Mix Logistica"
        fill
        className="h-full rounded-md bg-white object-cover"
        priority
      />
      <div className="fixed start-0 z-10 flex h-full w-full max-w-md flex-col items-center justify-center gap-4 rounded-xl bg-white/40 shadow-2xl max-md:h-max max-md:p-4">
        <Image
          src="/logo.png"
          alt="Next Generation of Stock Control"
          title="Next Generation of Stock Control"
          width={250}
          height={120}
          className="flex"
          priority
        />
        <FormProvider {...FormUser}>
          <Form.Container>
            <Form.Root onSubmit={handleSubmit(RegisterUser)}>
              <Form.Content>
                <Form.Label htmlFor="DocumentPerson">
                  CNPJ Operador Logístico
                </Form.Label>
                <Form.Input
                  name="DocumentPerson"
                  type="number"
                  maxLength={14}
                  placeholder="Digite o CNPJ da empresa"
                />
                <Form.Error field="DocumentPerson" />
              </Form.Content>
              <Form.Content>
                <Form.Label htmlFor="NamePerson">Nome Competo</Form.Label>
                <Form.Input
                  name="NamePerson"
                  type="text"
                  placeholder="Digite seu nome completo"
                />
                <Form.Error field="NamePerson" />
              </Form.Content>
              <Form.Content>
                <Form.Label htmlFor="User">Usuário</Form.Label>
                <Form.Input
                  name="User"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                />
                <Form.Error field="User" />
              </Form.Content>
              <Form.Content>
                <Form.Label htmlFor="Email">E-mail</Form.Label>
                <Form.Input
                  name="Email"
                  type="email"
                  placeholder="Digite seu nome de e-mail"
                />
                <Form.Error field="Email" />
              </Form.Content>
              <Form.Content>
                <Form.Label htmlFor="Password">Senha</Form.Label>
                <Form.Input
                  name="Password"
                  type="password"
                  placeholder="Digite sua senha"
                />
                <Form.Error field="Password" />
              </Form.Content>
              <Form.Button namebutton="Criar Usuário" variant={'green'} />
            </Form.Root>
          </Form.Container>
          <Form.Container>
            <Form.Button
              onClick={RegisterTenancy}
              namebutton="Cadastrar Operador"
              variant={'blue'}
            />
            <Link
              href={'/login'}
              className="flex flex-col items-end justify-center gap-4"
            >
              <span className="text-xs font-semibold text-slate-950/70">
                Já tem conta?
              </span>
            </Link>
          </Form.Container>
        </FormProvider>
      </div>
    </MainPageLogin>
  )
}
/*
<main className=" flex h-screen w-screen flex-col items-center justify-center bg-cyan-500 bg-gradient-to-r from-indigo-600 p-10">
            <div className="rounded bg-white p-2">
                <div className="flex flex-row items-center justify-center text-lg font-bold">
                    Registrar Usuário
                </div>
                <div className="flex flex-col items-start justify-center p-5">
                    <Login.Input
                        name="CodDepositor"
                        type="number"
                        placeholder="Código de acesso da empresa"
                        label="Nome"
                    />
                    <Login.Input
                        name="NamePerson"
                        type="text"
                        placeholder="Digite seu nome completo"
                        label="Nome"
                    />
                    <Login.Input
                        name="Email"
                        type="Email"
                        placeholder="digite seu e-mail"
                        label="E-mail"
                    />
                    <Login.Input
                        name="Password"
                        type="Password"
                        placeholder="digite ssua senha"
                        label="Senha"
                    />
                    <Login.Submit
                        type="submit"
                        label="Registrar"
                        className="bg-sky-700/80 hover:bg-sky-700/90"
                        onClick={handleClickRegister}
                    />
                </div>
            </div>
        </main>
*/
