import { InputHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'rounded-md border-0 border-transparent px-4 py-1.5 text-sm leading-6 text-gray-900 outline-none ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 disabled:bg-black/10 data-[valid=false]:ring-red-600',
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
        ref={ref}
        className={cn(inputVariants({ variant, scale, className }))}
        name={name}
        type={type}
        autoComplete="off"
        {...props}
      ></input>
    )
  }
)

UiInput.displayName = 'UiInput'
