'use client'
import api from '@/lib/api'
import { Groups } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

export const useSituation = () => {
  const [situation, setSituation] = useState<Groups[]>([])

  const getSituation = useCallback(async () => {
    const situations = await api.get('/groups?parent=-1')

    if (situations.status === 200) {
      return setSituation(situations.data.groups)
    }
    setSituation([])
  }, [])

  useEffect(() => {
    getSituation()
  }, [getSituation])

  return { situation, getSituation }
}
