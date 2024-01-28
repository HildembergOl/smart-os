'use client'
import api from '@/lib/api'
import { TypeOs } from '@prisma/client'

import { useCallback, useEffect, useState } from 'react'

export const useTypeOs = (tenancyId: number) => {
  const [typeOs, setTypeOs] = useState<TypeOs[]>([])

  const getTypeOs = useCallback(async () => {
    if (!tenancyId) return

    const typeOs = await api.get(`/typeos`, {
      params: {
        tenancyId,
      },
    })

    if (typeOs.status === 200) {
      return setTypeOs(typeOs.data.typeOs)
    }
    setTypeOs([])
  }, [tenancyId])

  useEffect(() => {
    getTypeOs()
  }, [getTypeOs])

  return { typeOs, getTypeOs }
}
