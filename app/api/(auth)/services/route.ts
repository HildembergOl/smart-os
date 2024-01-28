import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ServiceDataProps } from '@/prisma/zod/ServiceSchema'

interface PageRouteProps {
  page: string
  id: string
  tenancyId: string
  situationId: string
  reference: string
  description: string
  price: string
}
export async function GET(req: NextRequest) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps
  const { tenancyId, page, id, description, price, reference, situationId } =
    queryParams

  const take = 10
  const skip = (parseInt(page) - 1) * take || undefined

  if (!tenancyId)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const [services, rows] = await Promise.all([
    await prisma.service.findMany({
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
            price: {
              equals: price ? parseFloat(price) : undefined,
            },
          },
          {
            reference: {
              contains: reference || undefined,
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
    await prisma.service.count({
      where: {
        tenancyId: {
          equals: parseInt(tenancyId),
        },
      },
    }),
  ])

  if (!services) return res.json({ error: 'Person not found' }, { status: 400 })

  const pages = Math.ceil(rows / (take || 1))

  return res.json({ services, pages })
}
export async function POST(req: NextRequest) {
  const res = NextResponse

  const body: ServiceDataProps = await req.json()

  if (!body)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const { status, situationId, reference, description, price, tenancyId } = body

  const service = await prisma.service.create({
    data: {
      tenancyId,
      status,
      situationId,
      reference,
      description,
      price,
    },
  })

  if (!service)
    return res.json({ error: 'Service not created' }, { status: 400 })

  return res.json(service)
}
