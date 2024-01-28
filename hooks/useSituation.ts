'use client'
import api from '@/lib/api'
import { Groups } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

export const useSituation = (parentId: number) => {
  const [situation, setSituation] = useState<Groups[]>([])

  const getSituation = useCallback(async () => {
    if (!parentId) return

    const situations = await api.get(`/groups`, {
      params: {
        parentId,
      },
    })

    if (situations.status === 200) {
      return setSituation(situations.data.groups)
    }
    setSituation([])
  }, [parentId])

  useEffect(() => {
    getSituation()
  }, [getSituation])

  return { situation, getSituation }
}
