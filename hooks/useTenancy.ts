'use client'
import api from '@/lib/api'
import { Tenancy } from '@prisma/client'
import { useCallback, useEffect, useState } from 'react'

export const useTenancy = (userId: number) => {
  const [tenancy, setTenancy] = useState<Tenancy[]>([])

  const getTenancy = useCallback(async () => {
    if (!userId) return

    const tenancys = await api.get(`/tenancy`, {
      params: {
        userId,
      },
    })

    if (tenancys.status === 200) {
      return setTenancy(tenancys.data)
    }
    setTenancy([])
  }, [userId])

  useEffect(() => {
    getTenancy()
  }, [getTenancy])

  return { tenancy, getTenancy }
}
