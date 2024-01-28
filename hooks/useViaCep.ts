'use client'
import api from '@/lib/api'
import { useEffect, useState } from 'react'

type useSearchCepProps = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export const useSearchCep = (zipCode: string | null) => {
  const [dataCep, setDataCep] = useState<useSearchCepProps | null>(null)
  const [search, setSearch] = useState<string>('')

  const getCepSearch = async (): Promise<useSearchCepProps | null> => {
    if (!search) return null

    const response = await api.get(`https://viacep.com.br/ws/${search}/json/`)

    if (response.status === 200 && response.data.cep) {
      setDataCep(response.data)
      return response.data
    }
    setDataCep(null)
    return null
  }

  useEffect(() => {
    if (zipCode?.length === 8) {
      setSearch(() => zipCode)
    }
  }, [zipCode])

  return { dataCep, getCepSearch }
}
