import { UiContainer } from './ui/UiContainer'

export const MainHeaderComponent = () => {
  return (
    <UiContainer className="flex h-20 w-full justify-start items-center rounded-r-lg p-1 border-b shadow-xl">
      <UiContainer className="flex flex-col p-1">
        <span className="pl-2 max-md:text-xs">Versão: 1.0.0.0</span>
        <span className="pl-2 max-md:text-xs">
          Usuário: Hildemberg Correia Oliveira - Smart Solutions
        </span>
      </UiContainer>
    </UiContainer>
  )
}
