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
      <UiContainer className="flex h-full w-full flex-row">
        <UiMenuComponent />
        <UiContainer className="flex h-full w-full max-w-full flex-col">
          <MainHeaderComponent />
          {children}
        </UiContainer>
      </UiContainer>
    </UiMain>
  )
}
