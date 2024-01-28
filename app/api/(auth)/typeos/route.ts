import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TypeOsDataProps, TypeOsSchema } from '@/prisma/zod/TypeOsSchema'

interface PageRouteProps {
  page: string
  id: string
  tenancyId: string
  situationId: string
  description: string
  invoice: string
}
export async function GET(req: NextRequest) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps
  const { tenancyId, page, id, description, invoice, situationId } = queryParams

  const take = 10
  const skip = (parseInt(page) - 1) * take || undefined

  if (!tenancyId)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const [typeOs, rows] = await Promise.all([
    await prisma.typeOs.findMany({
      take,
      skip,
      include: {
        situation: true,
      },
      where: {
        AND: [
          {
            id: {
              equals: id ? parseInt(id) : undefined,
            },
          },
          {
            tenancyId: {
              equals: parseInt(tenancyId),
            },
          },
          {
            description: {
              contains: description || undefined,
            },
          },
          {
            invoice: {
              equals: invoice ? JSON.parse(invoice) : undefined,
            },
          },
          {
            situationId: {
              equals: situationId ? parseInt(situationId) : undefined,
            },
          },
        ],
      },
    }),
    await prisma.typeOs.count({
      where: {
        tenancyId: {
          equals: parseInt(tenancyId),
        },
      },
    }),
  ])

  if (!typeOs) return res.json({ error: 'Person not found' }, { status: 400 })

  const pages = Math.ceil(rows / (take || 1))

  return res.json({ typeOs, pages })
}
export async function POST(req: NextRequest) {
  const res = NextResponse

  const body: TypeOsDataProps = await req.json()

  if (!body)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const { situationId, description, tenancyId, invoice } =
    TypeOsSchema.parse(body)

  const typeOs = await prisma.typeOs.create({
    data: { situationId, description, tenancyId, invoice: invoice || false },
  })

  if (!typeOs)
    return res.json({ error: 'Type Os not created' }, { status: 400 })

  return res.json(typeOs)
}
