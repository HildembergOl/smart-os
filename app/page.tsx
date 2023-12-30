'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import loading from '@/public/icons/loading.png'
import smart from '@/public/icons/logoDevSmart.png'

const Page = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push('/home'), 3000)
  }, [router])

  return (
    <div className="w-screen h-screen bg-amber-8 flex justify-center items-center">
      <div className="w-2/4 h-1/4 border-2 shadow-3 flex items-center justify-evenly rounded-4 p-4">
        <Image height={100} src={smart} alt={'DevSmart Soluções'} />
        <div className="flex items-center justify-center gap-5">
          <span>Você está sendo redirecionado...</span>
          <Image
            className="animate-spin"
            height={40}
            src={loading}
            alt={'Loading...'}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
