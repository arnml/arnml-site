import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassWindowProps {
  children: ReactNode
  className?: string
  bodyClassName?: string
}

export function GlassWindow({ children, className, bodyClassName }: GlassWindowProps) {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-white/10 overflow-hidden',
        'bg-[rgba(14,18,26,0.80)] backdrop-blur-[12px]',
        'shadow-[0_30px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]',
        className
      )}
    >
      <div className="flex items-center px-[18px] py-[14px] bg-[rgba(10,13,20,0.6)] border-b border-white/[0.08]">
        <div className="flex gap-2">
          <span className="block w-[10px] h-[10px] rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.35)]" />
          <span className="block w-[10px] h-[10px] rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.35)]" />
          <span className="block w-[10px] h-[10px] rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.35)]" />
        </div>
      </div>
      <div className={cn('px-8 py-10 sm:px-10', bodyClassName)}>
        {children}
      </div>
    </div>
  )
}
