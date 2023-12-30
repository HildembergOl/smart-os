'use client'
import { MenuContextProvider } from '@/context/MenuContext'

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return <MenuContextProvider>{children}</MenuContextProvider>
}
