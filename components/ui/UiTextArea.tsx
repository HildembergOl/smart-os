import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'rounded-md border-0 border-transparent px-4 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 disabled:bg-black/10 data-[valid=false]:ring-red-600 sm:text-sm sm:leading-6',
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

export interface UiTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {}

export const UiTextArea = forwardRef<HTMLTextAreaElement, UiTextAreaProps>(
  ({ className, scale, variant, name, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(inputVariants({ variant, scale, className }))}
        name={name}
        autoComplete="off"
        {...props}
      ></textarea>
    )
  }
)

UiTextArea.displayName = 'UiTextArea'
