import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface PageRouteProps {
  userId: string
}
export async function GET(req: NextRequest) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps
  const { userId } = queryParams

  if (!userId)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  if (userId) {
    const tenancy = await prisma.tenancy.findMany({
      where: {
        UserTenancy: {
          some: {
            userId: parseInt(userId) || 0,
          },
        },
      },
    })

    if (!tenancy)
      return res.json({ error: 'Not found values' }, { status: 400 })

    return res.json(tenancy)
  }
}
