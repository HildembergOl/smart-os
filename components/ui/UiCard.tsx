import { HTMLAttributes, HtmlHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ComponentsCardProps extends HtmlHTMLAttributes<HTMLDivElement> {}

interface ComponentsCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

interface ComponentsCardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const UiCard = ({ className, ...props }: ComponentsCardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border-2 border-slate-200 bg-white text-slate-900/80 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export const UiCardHeader = ({ className, ...props }: ComponentsCardProps) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
}

export const UiCardContent = ({ className, ...props }: ComponentsCardProps) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
}

export const UiCardTitle = ({
  className,
  ...props
}: ComponentsCardTitleProps) => {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
}

export const UiCardDescription = ({
  className,
  ...props
}: ComponentsCardDescriptionProps) => {
  return (
    <p
      className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
      {...props}
    />
  )
}
