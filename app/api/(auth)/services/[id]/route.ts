import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ServiceDataProps, ServiceSchema } from '@/prisma/zod/ServiceSchema'
interface NextParamsUrl {
  params: { id: string }
}

interface PageRouteProps {
  tenancyId: string
}

export async function GET(req: NextRequest, { params: { id } }: NextParamsUrl) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps
  const { tenancyId } = queryParams

  if (!id || !tenancyId)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const service = await prisma.service.findFirst({
    where: {
      id: {
        equals: parseInt(id),
      },
      AND: [
        {
          tenancyId: {
            equals: parseInt(tenancyId),
          },
        },
      ],
    },
  })

  return res.json(service)
}
export async function PUT(req: NextRequest, { params: { id } }: NextParamsUrl) {
  const res = NextResponse
  const body: ServiceDataProps = await req.json()
  const {
    id: idBody,
    status,
    situationId,
    reference,
    description,
    price,
    tenancyId,
  } = ServiceSchema.parse(body)

  if (!id || parseInt(id) !== idBody)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const service = await prisma.service.update({
    data: {
      id: parseInt(id),
      status,
      situationId,
      reference,
      description,
      price,
    },
    where: {
      id: parseInt(id),
      AND: [
        {
          tenancyId: {
            equals: tenancyId,
          },
        },
      ],
    },
  })

  return res.json(service)
}
