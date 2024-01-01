/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })

// ACTIVATE LOG OF SELECTS ON PRISMA
// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma

// Declara uma variável global para receber a conexão do prisma, a partir daí
// cria uma nova conexão ou usa a mesma que já está na instância;
