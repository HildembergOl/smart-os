import { MenuItem } from './MenItemComponent'
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
    if (!openMenu)
      return (
        <Image
          className={`cursor-pointer ${openMenu ? 'pl-3' : 'mt-2'}`}
          key={`keyImageMenuNested${item.id}`}
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
        <MenuItem key={`keyMenuItemMenuNested${item.id}`} isMenu data={item}>
          {<MenuNested data={item.parent} />}
        </MenuItem>
      )
    }
    return (
      <UiMenu
        key={`keyUiMenuMenuNested${item.id}`}
        className="mb-1 flex w-full cursor-pointer flex-col justify-center gap-1 rounded-sm py-1 hover:bg-amber-400/60"
      >
        <MenuItem data={item} />
      </UiMenu>
    )
  })
}
