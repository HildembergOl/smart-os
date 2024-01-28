import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  OrderServiceDataProps,
  OrderServiceSchema,
} from '@/prisma/zod/OrderServiceSchema'

interface PageRouteProps {
  page: string
  tenancyId: string
  id: string
  codeOS: string
  typeOsId: string
  situationId: string
  socialName: string
  dateCreated: string
  dateAppoint: string
  dateService: string
}

export async function GET(req: NextRequest) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps

  const {
    tenancyId,
    page,
    id,
    situationId,
    typeOsId,
    codeOS,
    dateAppoint: appoint,
    dateCreated: date,
    dateService: service,
    socialName,
  } = queryParams

  console.log(queryParams)

  const take = 10
  const skip = (parseInt(page) - 1) * take || undefined

  if (!tenancyId)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const [orderService, rows] = await Promise.all([
    await prisma.orderService.findMany({
      take,
      skip,
      include: {
        situation: true,
        customer: true,
        typeOs: true,
      },
      where: {
        AND: [
          {
            tenancyId: {
              equals: parseInt(tenancyId),
            },
          },
          {
            id: {
              equals: id ? parseInt(id) : undefined,
            },
          },
          {
            situationId: {
              equals: situationId ? parseInt(situationId) : undefined,
            },
          },
          {
            typeOsId: {
              equals: typeOsId ? parseInt(typeOsId) : undefined,
            },
          },
          {
            codeOS: {
              equals: codeOS ? parseInt(codeOS) : undefined,
            },
          },
          {
            dateCreated: {
              equals: date ? new Date(date) : undefined,
            },
          },
          {
            dateAppoint: {
              equals: appoint ? new Date(appoint) : undefined,
            },
          },
          {
            dateService: {
              equals: service ? new Date(service) : undefined,
            },
          },
          {
            customer: {
              corporateName: {
                contains: socialName || undefined,
              },
            },
          },
          {
            customer: {
              socialName: {
                contains: socialName || undefined,
              },
            },
          },
        ],
      },
    }),
    await prisma.orderService.count({
      where: {
        tenancyId: {
          equals: parseInt(tenancyId),
        },
      },
    }),
  ])

  if (!orderService)
    return res.json({ error: 'Order Service not found' }, { status: 400 })

  const pages = Math.ceil(rows / (take || 1))

  return res.json({ orderService, pages })
}

export async function POST(req: NextRequest) {
  const res = NextResponse

  const body: OrderServiceDataProps = await req.json()

  if (!body)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const {
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

  const transaction = await prisma.$transaction(async (trx) => {
    let [lastRow] = await Promise.all([
      await trx.orderService.count({
        where: {
          tenancyId,
        },
        orderBy: {
          id: 'desc',
        },
      }),
    ])

    const [orderService] = await Promise.all([
      await trx.orderService.create({
        data: {
          situationId,
          status,
          tenancyId,
          amount,
          codeOS: lastRow++,
          amountDiscount,
          amountService,
          customerId,
          dateCreated,
          typeOsId,
          dateAppoint,
          dateService,
          note,
        },
      }),
    ])

    return orderService
  })

  if (!transaction)
    return res.json({ error: 'Order Service not created' }, { status: 400 })

  return res.json(transaction)
}
