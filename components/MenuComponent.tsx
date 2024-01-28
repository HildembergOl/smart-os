import Image from 'next/image'
import { UiContainer } from './ui/UiContainer'
import menuOpen from '@/public/icons/menu_open.png'
import menuClose from '@/public/icons/menu_close.png'
import smart from '@/public/icons/logoDevSmart.png'
import { data } from '@/constants/api-menu'
import { MenuNested } from './MenuNested'
import { useContextMenu } from '@/context/MenuContext'
import { useId } from 'react'
import Link from 'next/link'
import { UiInput } from './ui/UiInput'
import LogoLight from '@/public/icons/logo_light.png'
import LogoIcon from '@/public/icons/Icon_light.png'
import Icon from './Icon'
import { useRouter } from 'next/navigation'

export const UiMenuComponent = () => {
  const { openMenu, handleOpenMenu } = useContextMenu()
  const keyMenuNested = useId()

  const router = useRouter()

  return (
    <UiContainer
      className={`flex h-full max-h-fit flex-col rounded-r-lg border-r p-2 transition-all duration-1000 ease-in-out ${
        openMenu ? 'fixed inset-0 z-[1] w-72 max-md:w-full' : 'w-14'
      }`}
    >
      <UiContainer className="flex h-full flex-col gap-2">
        <UiContainer
          className={`flex flex-row ${
            openMenu ? 'justify-end' : 'justify-center'
          }`}
        >
          <Image
            className="cursor-pointer transition delay-150 ease-in-out hover:scale-110"
            width={20}
            src={openMenu ? menuOpen : menuClose}
            alt="menu"
            onClick={handleOpenMenu}
          />
        </UiContainer>
        <UiContainer
          className={`flex flex-col p-1  ${
            openMenu ? 'my-10' : 'items-start justify-start'
          }`}
        >
          <Image
            className={`flex cursor-pointer flex-col ${
              openMenu ? '' : 'items-start justify-start'
            }`}
            height={75}
            src={openMenu ? LogoLight : LogoIcon}
            alt={'Icone Dark Smart OS'}
            onClick={() => {
              router.push('/home')
              handleOpenMenu()
            }}
          />
        </UiContainer>
        <UiContainer
          className={`flex flex-col p-1 ${
            openMenu ? '' : 'mt-2 items-center justify-center'
          }`}
          title="Pesquisar"
        >
          {openMenu ? (
            <UiInput placeholder="Pesquisar..." disabled />
          ) : (
            <Icon
              className="cursor-pointer"
              size={30}
              name={'search'}
              strokeWidth={1.5}
              onClick={() => handleOpenMenu()}
            />
          )}
        </UiContainer>
        <UiContainer
          className={`flex h-full flex-1 flex-col overflow-auto ${
            openMenu ? 'p-1 ' : 'items-center justify-start gap-4'
          }`}
        >
          <MenuNested key={keyMenuNested} data={data} />
        </UiContainer>
        <Link
          href={'http://www.devsmart.com.br'}
          target="_blank"
          className="flex w-full flex-row items-center justify-center border-t-2 py-2"
        >
          <Image width={60} height={60} src={smart} alt={''} />
          {openMenu && (
            <button className="flex w-full items-center justify-center font-medium">
              DevSmart Soluções
            </button>
          )}
        </Link>
      </UiContainer>
    </UiContainer>
  )
}
