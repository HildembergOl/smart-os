import { HtmlHTMLAttributes, MenuHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const menuVariants = cva('', {
  variants: {
    variant: {
      default: '',
      submenu: '',
      options: '',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ComponentsContainerProps
  extends VariantProps<typeof menuVariants>,
    HtmlHTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const UiMenu = ({
  className,
  size,
  variant,
  children,
  ...props
}: ComponentsContainerProps) => {
  return (
    <menu className={cn(menuVariants({ variant, size, className }))} {...props}>
      {children}
    </menu>
  )
}
