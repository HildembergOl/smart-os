import {
  HtmlHTMLAttributes,
  InputHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
  forwardRef,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const selectVariants = cva(
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
const optionsVariants = cva(
  'w-full rounded-md py-1.5 pl-2 pr-2 text-gray-900 sm:text-sm sm:leading-6',
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
        className={cn(selectVariants({ variant, scale, className }))}
        name={name}
        ref={ref}
        autoComplete="off"
        {...props}
      >
        <UiSelectOption value={''}></UiSelectOption>
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
>(({ className, scale, variant, value, ...props }, ref = null) => {
  return (
    <option
      value={value}
      className={cn(optionsVariants({ variant, scale, className }))}
      ref={ref}
      {...props}
    />
  )
})

UiSelectOption.displayName = 'UiSelectOption'
