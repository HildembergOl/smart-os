import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type MenuOpenContextProps = {
  menuOpenId: number[]
  setMenuId: (id: number) => void
  openMenu: boolean
  handleOpenMenu: () => void
}

const MenuOpenContext = createContext({} as MenuOpenContextProps)

const MenuContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuOpenId, setMenuOpenId] = useState<number[]>([])
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleOpenMenu = () => {
    if (openMenu) {
      setOpenMenu(!openMenu)
      setMenuOpenId([])
      return
    }
    setOpenMenu(!openMenu)
  }

  const setMenuId = (id: number) => {
    if (!openMenu) setOpenMenu(!openMenu)

    const existId = menuOpenId.some((num) => num === id)

    if (existId) {
      return setMenuOpenId((prev) => prev.filter((item) => item !== id))
    }
    setMenuOpenId((prev) => [...prev, id])
  }

  return (
    <MenuOpenContext.Provider
      value={{
        openMenu,
        handleOpenMenu,
        menuOpenId,
        setMenuId,
      }}
    >
      <>{children}</>
    </MenuOpenContext.Provider>
  )
}
const useContextMenu = () => useContext(MenuOpenContext)

export { MenuContextProvider, MenuOpenContext, useContextMenu }
