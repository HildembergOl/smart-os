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
              'flex flex-col w-full gap-1 justify-center cursor-pointer rounded-md bg-gray-100 border-[1px]'
            }
          >
            <li
              className={
                'flex flex-row w-full justify-between items-center py-2'
              }
              onClick={() => setMenuId(id)}
            >
              <div className="flex flex-row justify-start gap-2">
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
                className={`mr-3 ${openMenu ? 'rotate-180' : ''}`}
                width={20}
                src={chevronDown}
                alt={''}
              />
            </li>
            {menuOpen && (
              <UiContainer className="p-2 bg-white ">{children}</UiContainer>
            )}
          </UiMenu>
        )}
      </>
    )
  }
  return (
    <li className="flex flex-row w-full justify-between items-center my-1">
      <Link
        href={src}
        className="flex flex-row justify-start w-full mb-1 gap-2"
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
