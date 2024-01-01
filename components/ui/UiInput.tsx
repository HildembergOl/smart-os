import { InputHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'rounded-md py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-500 border-0 border-transparent placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 outline-none focus:ring-inset sm:text-sm sm:leading-6 data-[valid=false]:ring-red-600 disabled:bg-black/10',
  {
    variants: {
      variant: {
        default: '',
      },
      scale: {
        default: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      scale: 'default',
    },
  }
)

export interface UiInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
  ({ className, scale, variant, name, type = 'text', ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, scale, className }))}
        name={name}
        type={name}
        ref={ref}
        autoComplete="off"
        {...props}
      ></input>
    )
  }
)

UiInput.displayName = 'UiInput'
