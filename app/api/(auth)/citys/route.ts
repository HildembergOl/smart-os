import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface PageRouteProps {
  page: string
  name: string
}

export async function GET(req: NextRequest) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps
  const { name, page } = queryParams

  const take = 10
  const skip = (parseInt(page) - 1) * take || undefined

  const [citys, rows] = await Promise.all([
    await prisma.ibgeDistrict.findMany({
      take,
      skip,
      include: {
        city: {
          include: {
            state: true,
          },
        },
      },
      where: {
        name: {
          startsWith: name,
        },
      },
    }),
    await prisma.ibgeDistrict.count(),
  ])

  const pages = Math.ceil(rows / (take || 1))
  return res.json({ citys, pages })
}
