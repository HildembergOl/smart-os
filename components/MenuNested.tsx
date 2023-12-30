import { useId } from 'react'
import { MenuItem } from './MenItemComponent'
import { UiContainer } from './ui/UiContainer'
import { UiMenu } from './Menu'
import { useContextMenu } from '@/context/MenuContext'
import Image from 'next/image'

export type MenuItemDataProps = {
  id: number
  label: string
  src: string
  icon: string
  parent: MenuItemDataProps[] | null
}
type MenuNestedDataProps = {
  data: MenuItemDataProps[]
}

export const MenuNested = ({ data }: MenuNestedDataProps) => {
  const { openMenu, setMenuId } = useContextMenu()
  return data.map((item) => {
    const keyMenuItem = useId()
    const keyImage = useId()

    if (!openMenu)
      return (
        <Image
          className={`cursor-pointer ${openMenu ? 'pl-3' : 'mt-2'}`}
          key={keyImage}
          width={30}
          height={30}
          src={`/icons/${item.icon}.png`}
          alt={''}
          onClick={() => setMenuId(item.id)}
          title={item.label}
        />
      )

    if (item.parent) {
      return (
        <MenuItem key={keyMenuItem} isMenu data={item}>
          {<MenuNested data={item.parent} />}
        </MenuItem>
      )
    }
    return (
      <UiMenu
        key={keyMenuItem}
        className="flex flex-col w-full py-1 gap-1 justify-center mb-1 cursor-pointer rounded-sm hover:bg-amber-400/60"
      >
        <MenuItem data={item} />
      </UiMenu>
    )
  })
}
