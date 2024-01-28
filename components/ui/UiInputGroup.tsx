import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  label?: string
  children: React.ReactNode
}

export const UiInputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'relative flex max-w-full h-10 max-md:col-span-full max-md:pb-1',
          className
        )}
      >
        {label && (
          <label className="absolute -inset-2 left-2 z-0 mb-1 max-h-3 max-w-fit rounded bg-white px-1 text-xs font-bold ">
            {label}
          </label>
        )}
        {children}
      </div>
    )
  }
)
UiInputGroup.displayName = 'InputGroup'
