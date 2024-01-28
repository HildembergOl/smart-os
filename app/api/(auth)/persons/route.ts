/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { PersonDataProps } from '@/prisma/zod/PersonSchema'

interface PageRouteProps {
  tenancyId: string
  page: string
  id: string
  corporateName: string
  socialName: string
  document: string
  address: string
  district: string
  city: string
}
export async function GET(req: NextRequest) {
  const res = NextResponse
  const query = req.nextUrl.searchParams
  const queryParams = Object.fromEntries(query) as unknown as PageRouteProps
  const {
    tenancyId,
    page,
    id,
    corporateName,
    socialName,
    document,
    address,
    district,
    city,
  } = queryParams

  const take = 10
  const skip = (parseInt(page) - 1) * take || undefined

  if (!tenancyId)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const [persons, rows] = await Promise.all([
    await prisma.person.findMany({
      take,
      skip,
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
            document: {
              contains: document || undefined,
            },
          },
          {
            address: {
              contains: address || undefined,
            },
          },
          {
            district: {
              contains: district || undefined,
            },
          },
          {
            city: {
              contains: city || undefined,
            },
          },
          {
            OR: [
              {
                corporateName: {
                  contains: corporateName || undefined,
                },
              },
              {
                socialName: {
                  contains: socialName || undefined,
                },
              },
            ],
          },
        ],
      },
    }),
    await prisma.person.count({
      where: {
        tenancyId: {
          equals: parseInt(tenancyId),
        },
      },
    }),
  ])

  if (!persons) return res.json({ error: 'Person not found' }, { status: 400 })

  const pages = Math.ceil(rows / (take || 1))

  return res.json({ persons, pages })
}
export async function POST(req: NextRequest) {
  const res = NextResponse
  const body: PersonDataProps = await req.json()

  if (!body)
    return res.json({ error: 'Parameteres not is funcional' }, { status: 400 })

  const {
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
  } = body

  const person = await prisma.person.create({
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
      tenancyId,
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
  })

  if (!person) return res.json({ error: 'Person not created' }, { status: 400 })

  return res.json(person)
}
