'use client'
import api from '@/lib/api'
import { Person } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

let timeUpdate: NodeJS.Timeout

export const useSearchPerson = (tenancyId: number) => {
  const [person, setPerson] = useState<Person[]>([])
  const [search, setSearch] = useState<string>()

  const setSearchPerson = (value: string) => {
    clearTimeout(timeUpdate)
    if (value.length > 3) {
      timeUpdate = setTimeout(() => setSearch(() => value), 1000)
    }
  }

  const getPersonSearch = useCallback(async () => {
    const response = await api.get('persons', {
      params: {
        tenancyId,
        corporateName: search,
        socialName: search,
      },
    })

    if (response.status === 200) {
      return setPerson(response.data.persons)
    }
    setPerson([])
  }, [search, tenancyId])

  useEffect(() => {
    if (search) {
      getPersonSearch()
    }
  }, [getPersonSearch, search])

  return { setSearchPerson, person, getPersonSearch, setPerson }
}
