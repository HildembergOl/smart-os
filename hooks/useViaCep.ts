'use client'
import api from '@/lib/api'
import { useCallback, useEffect, useState } from 'react'

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

let timeUpdate: NodeJS.Timeout

export const useSearchCep = () => {
  const [dataCep, setDataCep] = useState<useSearchCepProps | null>(null)
  const [search, setSearch] = useState<string>()

  const setSearchCep = (search: string) => {
    clearTimeout(timeUpdate)
    if (search.length === 8) {
      timeUpdate = setTimeout(() => setSearch(search), 1000)
    }
  }

  const getCepSearch = useCallback(async () => {
    const response = await api.get(`https://viacep.com.br/ws/${search}/json/`)

    if (response.status === 200 && response.data.cep) {
      return setDataCep(response.data)
    }
    setDataCep(null)
  }, [search])

  useEffect(() => {
    if (search) {
      getCepSearch()
    }
  }, [getCepSearch, search])

  return { setSearchCep, dataCep }
}
