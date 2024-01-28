import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TypeOsDataProps, TypeOsSchema } from '@/prisma/zod/TypeOsSchema'
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

  const typeOs = await prisma.typeOs.findFirst({
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

  return res.json(typeOs)
}
export async function PUT(req: NextRequest, { params: { id } }: NextParamsUrl) {
  const res = NextResponse
  const body: TypeOsDataProps = await req.json()
  const {
    id: idBody,
    situationId,
    description,
    tenancyId,
    invoice,
  } = TypeOsSchema.parse(body)

  if (!id || parseInt(id) !== idBody)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const typeOs = await prisma.typeOs.update({
    data: {
      situationId,
      description,
      invoice,
    },
    where: {
      id: idBody,
      AND: [
        {
          tenancyId: {
            equals: tenancyId,
          },
        },
      ],
    },
  })

  return res.json(typeOs)
}
