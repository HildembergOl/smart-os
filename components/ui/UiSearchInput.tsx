import { SelectHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputSearchVariants = cva(
  'w-12 rounded-md py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
  {
    variants: {
      variant: {
        default: '',
      },
      scale: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      scale: 'default',
    },
  }
)

export interface UiInputProps
  extends SelectHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputSearchVariants> {
  children: React.ReactNode
  type: 'search'
}

export const UiSearchInput = forwardRef<HTMLInputElement, UiInputProps>(
  ({ className, scale, variant, name, type = 'search', ...props }, ref) => {
    return (
      <input
        className={cn(inputSearchVariants({ variant, scale, className }))}
        ref={ref}
        type={type}
        name={name}
        autoComplete="off"
        {...props}
      />
    )
  }
)

UiSearchInput.displayName = 'UiSearchInput'
