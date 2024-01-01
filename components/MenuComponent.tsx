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
      className={`flex flex-col h-full rounded-r-lg p-2 border-r max-h-fit transition-all ease-in-out duration-1000 ${
        openMenu ? 'w-72 fixed inset-0 max-md:w-full z-[1]' : 'w-14'
      }`}
    >
      <UiContainer className="flex flex-col h-full gap-2">
        <UiContainer
          className={`flex flex-row ${
            openMenu ? 'justify-end' : 'justify-center'
          }`}
        >
          <Image
            className="transition ease-in-out delay-150 hover:scale-110 cursor-pointer"
            width={20}
            src={openMenu ? menuOpen : menuClose}
            alt="menu"
            onClick={handleOpenMenu}
          />
        </UiContainer>
        <UiContainer
          className={`flex flex-col p-1  ${
            openMenu ? 'my-10' : 'justify-start items-start'
          }`}
        >
          <Image
            className={`flex flex-col cursor-pointer ${
              openMenu ? '' : 'justify-start items-start'
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
            openMenu ? '' : 'justify-start items-start mt-2'
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
          className={`flex flex-col h-full flex-1 overflow-auto ${
            openMenu ? 'p-1 ' : 'justify-start items-start gap-4'
          }`}
        >
          <MenuNested key={keyMenuNested} data={data} />
        </UiContainer>
        <Link
          href={'http://www.devsmart.com.br'}
          target="_blank"
          className="flex flex-row w-full items-center justify-center border-t-2 py-2"
        >
          <Image width={60} height={60} src={smart} alt={''} />
          {openMenu && (
            <button className="flex w-full justify-center items-center font-medium">
              DevSmart Soluções
            </button>
          )}
        </Link>
      </UiContainer>
    </UiContainer>
  )
}
