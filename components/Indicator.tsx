import { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from './ui/UiCard'
interface IndicatorProps {
  title: string
  value: number
  footer?: string
  icon?: React.ReactNode
}
export function Indicator({
  title = '',
  value = 0,
  footer = '',
  icon = undefined,
}: IndicatorProps) {
  const bgColor = ['#e2a336', '#a337e2', '##37e2a3', '']
  return (
    <>
      <UiCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <UiCardTitle>{title}</UiCardTitle>
        {icon && icon}
      </UiCardHeader>
      <UiCardContent>
        <div className="text-3xl font-bold">{value}</div>
        {footer && <p className="text-sm text-muted-foreground">{footer}</p>}
      </UiCardContent>
    </>
  )
}
