import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  label: string
  children: React.ReactNode
}

export const UiInputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex max-w-full h-10 max-md:col-span-full max-md:pb-1',
          className
        )}
      >
        <div
          ref={ref}
          className="absolute -inset-2 left-2 z-0 max-h-3 max-w-fit rounded bg-background px-1 text-xs bg-white font-bold"
          {...props}
        >
          {label}
        </div>
        {children}
      </div>
    )
  }
)
UiInputGroup.displayName = 'InputGroup'
