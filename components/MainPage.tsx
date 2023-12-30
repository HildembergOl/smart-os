import { HtmlHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const mainVariants = cva(
  'flex h-screen w-screen flex-col m-0 p-0 overflow-hidden',
  {
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
  }
)

interface ComponentsMainProps
  extends HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof mainVariants> {
  children: React.ReactNode
}
export default function UiMain({
  children,
  variant,
  size,
  className,
  ...props
}: ComponentsMainProps) {
  return (
    <main className={cn(mainVariants({ variant, size, className }))} {...props}>
      {children}
    </main>
  )
}
