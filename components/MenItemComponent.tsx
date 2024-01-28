import Image from 'next/image'
import chevronDown from '@/public/icons/chevron-down.svg'
import { MenuItemDataProps } from './MenuNested'
import Link from 'next/link'
import { UiMenu } from './Menu'
import { UiContainer } from './ui/UiContainer'
import { useContextMenu } from '@/context/MenuContext'

interface MenuItemProps {
  data: MenuItemDataProps
  children?: React.ReactNode
  isMenu?: boolean
}

export const MenuItem = ({ isMenu = false, data, children }: MenuItemProps) => {
  const { openMenu, menuOpenId, setMenuId, handleOpenMenu } = useContextMenu()
  const { id, label, src, icon } = data

  const menuOpen = menuOpenId.some((item) => item === id)
  if (isMenu) {
    return (
      <>
        {!openMenu && (
          <Image
            className={`cursor-pointer ${openMenu ? 'pl-3' : 'mt-2'}`}
            data-id={1}
            height={35}
            width={35}
            src={`/icons/${icon}.png`}
            onClick={() => setMenuId(id)}
            title={label}
            alt="icon"
          />
        )}
        {openMenu && (
          <UiMenu
            variant={'options'}
            className={
              'mb-2 flex w-full cursor-pointer flex-col justify-center gap-1 rounded-md border-[1px] bg-gray-100'
            }
          >
            <li
              className={
                'flex w-full flex-row items-start justify-between py-2'
              }
              onClick={() => setMenuId(id)}
            >
              <div className="flex flex-row justify-center gap-2">
                <Image
                  className={`cursor-pointer ${openMenu ? 'pl-3' : 'mt-2'}`}
                  data-id={2}
                  height={35}
                  width={35}
                  src={`/icons/${icon}.png`}
                  onClick={() => setMenuId(id)}
                  title={label}
                  alt="icon"
                />
                <span className="ml-2">{label}</span>
              </div>
              <Image
                className={`mr-3 ${menuOpen ? 'rotate-180' : ''}`}
                width={20}
                src={chevronDown}
                alt={''}
              />
            </li>
            {menuOpen && (
              <UiContainer className="bg-white p-2 ">{children}</UiContainer>
            )}
          </UiMenu>
        )}
      </>
    )
  }
  return (
    <li className="my-1 flex w-full flex-row items-start justify-between">
      <Link
        href={src}
        className="mb-1 flex w-full flex-row items-center justify-start gap-2"
        onClick={() => handleOpenMenu()}
      >
        {icon && (
          <Image
            className={`cursor-pointer ${openMenu ? 'pl-3' : 'mt-2'}`}
            data-id={3}
            width={35}
            height={35}
            src={`/icons/${icon}.png`}
            onClick={() => setMenuId(id)}
            title={label}
            alt="icon"
          />
        )}
        <span className="ml-2">{label}</span>
      </Link>
    </li>
  )
}
