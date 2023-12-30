'use client'
import { useForm, FormProvider } from 'react-hook-form'
import { LoginUserSchema, LoginUserFormData } from './zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/Form'
import Link from 'next/link'
import api from '@/lib/api'
import { AxiosResponse } from 'axios'
import { loginTokenUserType } from '@/types/loginTokenUserType'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'
import { storage } from '@/services/localstorage'
import { MainPageLogin } from '@/components/MainLogin'
import Image from 'next/image'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Label } from '@/components/ui/label'

export default function PageLogin() {
  const [loginEmail, setLoginEmail] = useState(true)
  const FormUser = useForm<LoginUserFormData>({
    resolver: zodResolver(LoginUserSchema),
  })
  const { handleSubmit } = FormUser
  const router = useRouter()

  const RegisterUser = async (data: LoginUserFormData) => {
    const userRegistered = await api
      .post('login', data)
      .then((e: AxiosResponse<loginTokenUserType>) => e)
      .catch((err) => err.response)

    if (userRegistered === undefined) {
      toast({
        variant: 'destructive',
        title: 'Erro ao conectar ao Banco de Dados.',
      })
      return
    }

    const { Token, Permission, error } = await userRegistered.data

    if (userRegistered.status === 200) {
      Cookie.set('tokenUserWMS', Token, {
        secure: true,
      })

      storage().setItem('permissions', Permission)

      toast({
        title: 'Login realizado com sucesso.',
      })
      router.push('/home')
    }

    if (userRegistered.status !== 200) {
      toast({
        variant: 'destructive',
        title: error,
      })
    }
  }

  return (
    <MainPageLogin>
      <Image
        src="/background-login.jpeg"
        alt="WMS NEXT"
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
        <div className="flex w-full max-w-xs items-center justify-start gap-2">
          <Switch
            defaultChecked={loginEmail}
            onCheckedChange={() => setLoginEmail(!loginEmail)}
          />
          <Label>Login por e-mail</Label>
        </div>
        <Form.Container>
          <FormProvider {...FormUser}>
            <Form.Root onSubmit={handleSubmit(RegisterUser)}>
              {!loginEmail && (
                <Form.Content>
                  <Form.Label htmlFor="User">Usuário</Form.Label>
                  <Form.Input
                    name="User"
                    type="text"
                    placeholder="Digite seu nome de usuário"
                  />
                  <Form.Error field="User" />
                </Form.Content>
              )}
              {loginEmail && (
                <Form.Content>
                  <Form.Label htmlFor="Email">E-mail</Form.Label>
                  <Form.Input
                    name="Email"
                    type="Email"
                    placeholder="Digite seu nome de e-mail"
                  />
                  <Form.Error field="Email" />
                </Form.Content>
              )}
              <Form.Content>
                <Form.Label htmlFor="Password">Senha</Form.Label>
                <Form.Input
                  name="Password"
                  type="Password"
                  placeholder="Digite sua senha"
                />
                <Form.Error field="Password" />
              </Form.Content>
              <Form.Button namebutton="Login" variant={'red'} />
            </Form.Root>
          </FormProvider>
        </Form.Container>
        <Form.Container>
          <Link
            href={'/register'}
            className="flex w-full max-w-xs flex-col gap-4"
          >
            <Form.Button namebutton="Criar Usuário" variant={'green'} />
          </Link>
          <Link
            href={'/forgot-password'}
            className="flex flex-col items-end justify-center gap-4"
          >
            <span className=" text-xs font-semibold text-slate-950/70">
              Redefinir Senha?
            </span>
          </Link>
        </Form.Container>
      </div>
      <div className=" fixed right-0 z-10 mr-6 hidden h-full max-h-40 w-full max-w-5xl flex-col items-center justify-center gap-4 rounded bg-white/70">
        {' '}
        Teste
      </div>
    </MainPageLogin>
  )
}
