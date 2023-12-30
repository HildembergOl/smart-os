'use client'
import { MainHeaderComponent } from '@/components/MainHeader'
import { UiMenuComponent } from '@/components/MenuComponent'
import { UiContainer } from '@/components/ui/UiContainer'

import UiMain from '@/components/MainPage'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UiMain>
      <UiContainer className="flex flex-row w-full h-full">
        <UiMenuComponent />
        <UiContainer className="flex flex-col w-full h-full max-w-full">
          <MainHeaderComponent />
          {children}
        </UiContainer>
      </UiContainer>
    </UiMain>
  )
}
