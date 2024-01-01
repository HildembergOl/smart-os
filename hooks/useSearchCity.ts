'use client'
import api from '@/lib/api'
import { IbgeDistrict, IbgeCity, IbgeState } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

type useSearchCityProps = IbgeDistrict & {
  city: IbgeCity & {
    state: IbgeState
  }
}

let timeUpdate: NodeJS.Timeout

export const useSearchCity = () => {
  const [city, setCity] = useState<useSearchCityProps[]>([])
  const [search, setSearch] = useState<string>()

  const setSearchCity = (search: string) => {
    clearTimeout(timeUpdate)
    if (search.length > 3) {
      timeUpdate = setTimeout(() => setSearch(() => search), 1000)
    }
  }

  const getCitySearch = useCallback(async () => {
    const response = await api.get(`citys?name=${search}`)

    if (response.status === 200) {
      return setCity(response.data.citys)
    }
    setCity([])
  }, [search])

  useEffect(() => {
    if (search) {
      getCitySearch()
    }
  }, [getCitySearch, search])

  return { setSearchCity, city }
}
