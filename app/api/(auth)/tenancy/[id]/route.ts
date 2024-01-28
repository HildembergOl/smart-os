import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TenancyDataProps } from '@/prisma/zod/TenancySchema'
interface NextParamsUrl {
  params: { id: string }
}

export async function GET(req: NextRequest, { params: { id } }: NextParamsUrl) {
  const res = NextResponse

  if (!id)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const tenancy = await prisma.tenancy
    .findFirst({
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
      },
    })
    .then((res) => res)
    .catch((err) =>
      res.json({ error: JSON.stringify(err, (e) => e, 2) }, { status: 400 })
    )

  if (!tenancy) return res.json({ error: 'Tenancy not found' }, { status: 400 })

  return res.json(tenancy)
}

export async function PUT(req: NextRequest, { params: { id } }: NextParamsUrl) {
  const res = NextResponse
  const body: TenancyDataProps = await req.json()

  if (!body)
    return res.json({ error: 'No have body to updated' }, { status: 400 })

  if (!id)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const {
    id: idBody,
    status,
    document,
    corporateName,
    socialName,
    situationId,
    phone,
    email,
    zipCode,
    address,
    numberAddress,
    city,
    codeIBGE,
    complement,
    district,
    state,
  } = body

  if (parseInt(id) !== idBody)
    return res.json({ error: 'Id not found' }, { status: 400 })

  const tenancy = await prisma.tenancy
    .update({
      data: {
        status,
        document,
        corporateName,
        socialName,
        situationId,
        phone,
        email,
        zipCode,
        address,
        numberAddress,
        city,
        codeIBGE,
        complement,
        district,
        state,
      },
      where: {
        id: parseInt(id),
      },
    })
    .then((res) => res)
    .catch((err) =>
      res.json({ error: JSON.stringify(err, (e) => e, 2) }, { status: 400 })
    )

  if (!tenancy) return res.json({ error: 'Tenancy not found' }, { status: 400 })

  return res.json(tenancy)
}
