import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { PersonDataProps, PersonSchema } from '@/prisma/zod/PersonSchema'
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

  const person = await prisma.person.findFirst({
    include: {
      ibge: {
        include: {
          city: {
            include: {
              state: true,
            },
          },
        },
      },
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

  return res.json(person)
}

export async function PUT(req: NextRequest, { params: { id } }: NextParamsUrl) {
  const res = NextResponse
  const body: PersonDataProps = await req.json()

  const {
    id: idBody,
    status,
    situationId,
    reference,
    corporateName,
    socialName,
    document,
    phone,
    email,
    zipCode,
    address,
    numberAddress,
    complement,
    district,
    city,
    state,
    codeIBGE,
    tenancyId,
  } = PersonSchema.parse(body)

  if (!id || parseInt(id) !== idBody)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const person = await prisma.person.update({
    include: {
      ibge: {
        include: {
          city: {
            include: {
              state: true,
            },
          },
        },
      },
    },
    data: {
      status,
      situationId,
      reference,
      corporateName,
      socialName,
      document,
      phone,
      email,
      zipCode,
      address,
      numberAddress,
      complement,
      district,
      city,
      state,
      codeIBGE,
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

  return res.json(person)
}
