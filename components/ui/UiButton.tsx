import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'rounded-md border-[1px] px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 items-center justify-center leading-none inline-flex text-gray-900 font-medium outline-none hover:shadow-[0_0_0_2px]',
  {
    variants: {
      variant: {
        default: '',
        primary: 'bg-yellow-400/80 hover:bg-yellow-400/40',
        secondary: 'bg-secondary hover:bg-secondary/50',
        cancel: 'text-red-700 bg-red-700/20 hover:bg-red-700/50',
        green: 'bg-emerald-600 hover:bg-emerald-600/50',
        red: 'bg-red-400/80 hover:bg-red-400/40',
        blue: 'bg-blue hover:bg-blue/50',
        yellow: 'bg-amber-400 hover:bg-amber-400/50',
        none: '',
      },
      size: {
        default: 'w-20',
        sm: 'w-16',
        xl: 'w-28',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface UiButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const UiButton = forwardRef<HTMLButtonElement, UiButtonProps>(
  ({ className, size, variant, name, type = 'submit', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

UiButton.displayName = 'UiButton'
