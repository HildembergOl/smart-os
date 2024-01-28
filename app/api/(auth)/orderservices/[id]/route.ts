import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ServiceDataProps } from '@/prisma/zod/ServiceSchema'
import { OrderServiceSchema } from '@/prisma/zod/OrderServiceSchema'
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

  const service = await prisma.orderService.findFirst({
    include: {
      orderServiceItem: true,
    },
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
    situationId,
    status,
    tenancyId,
    amount,
    amountDiscount,
    amountService,
    customerId,
    dateCreated,
    typeOsId,
    dateAppoint,
    dateService,
    note,
  } = OrderServiceSchema.parse(body)

  if (!id || parseInt(id) !== idBody)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const service = await prisma.orderService.update({
    data: {
      id: idBody,
      situationId,
      status,
      tenancyId,
      amount,
      amountDiscount,
      amountService,
      customerId,
      dateCreated,
      typeOsId,
      dateAppoint,
      dateService,
      note,
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
