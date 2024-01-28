import { OptionHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const selectVariants = cva(
  'rounded-md border-0 border-transparent py-1.5 pl-2 pr-4 text-gray-900 outline-none ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 disabled:bg-black/10 data-[valid=false]:ring-red-600 sm:text-sm sm:leading-6',
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
const optionsVariants = cva(
  'h-20 w-full rounded-md px-2 py-1.5 text-gray-900 sm:text-sm sm:leading-6',
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

export interface UiSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

export const UiSelect = forwardRef<HTMLSelectElement, UiSelectProps>(
  ({ className, scale, variant, name, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(selectVariants({ variant, scale, className }))}
        name={name}
        autoComplete="off"
        {...props}
      >
        <UiSelectOption value={''}>Todos</UiSelectOption>
        {children}
      </select>
    )
  }
)

UiSelect.displayName = 'UiSelect'

export interface UiSelectOptionProps
  extends OptionHTMLAttributes<HTMLOptionElement>,
    VariantProps<typeof optionsVariants> {}

export const UiSelectOption = forwardRef<
  HTMLOptionElement,
  UiSelectOptionProps
>(({ className, scale, variant, value, ...props }, ref) => {
  return (
    <option
      ref={ref}
      value={value}
      className={cn(optionsVariants({ variant, scale, className }))}
      {...props}
    />
  )
})

UiSelectOption.displayName = 'UiSelectOption'
