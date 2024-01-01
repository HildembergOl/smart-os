import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface PageRouteProps {
  page: string
  parent: string
  id: string
}

export async function GET(req: NextRequest) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps
  const { parent, page, id } = queryParams

  const take = 10
  const skip = (parseInt(page) - 1) * take || undefined

  if (!id || !parent)
    res.json({ error: 'Select id or parent' }, { status: 400 })

  const [groups, rows] = await Promise.all([
    await prisma.groups.findMany({
      take,
      skip,
      include: {
        parent: true,
      },
      where: {
        AND: [
          {
            id: {
              equals: parseInt(id) || undefined,
            },
          },
          {
            parentId: {
              equals: parseInt(parent) || undefined,
            },
          },
        ],
      },
    }),
    await prisma.groups.count(),
  ])

  const pages = Math.ceil(rows / (take || 1))
  return res.json({ groups, pages })
}
