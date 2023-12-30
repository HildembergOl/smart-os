import { HtmlHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const containerVariants = cva('bg-white', {
  variants: {
    variant: {
      default: '',
      page: 'p-2 h-full w-full flex flex-col mb-4 gap-2 overflow-auto',
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
    VariantProps<typeof containerVariants> {}

export const UiContainer = ({
  className,
  size,
  variant,
  ...props
}: ComponentsContainerProps) => {
  return (
    <div
      className={cn(containerVariants({ variant, size, className }))}
      {...props}
    />
  )
}
