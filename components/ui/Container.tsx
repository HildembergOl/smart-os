import { HtmlHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const containerVariants = cva('', {
  variants: {
    variant: {
      default: '',
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
  extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode
}
export const UiContainer = ({
  children,
  className,
  size,
  variant,
  ...props
}: ComponentsContainerProps) => {
  return (
    <div
      className={cn(containerVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  )
}
