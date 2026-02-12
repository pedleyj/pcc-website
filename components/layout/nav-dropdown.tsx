'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface NavDropdownItem {
  name: string
  href: string
}

interface NavDropdownProps {
  label: string
  items: NavDropdownItem[]
  mobile?: boolean
  onNavigate?: () => void
}

function isExternal(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

export function NavDropdown({ label, items, mobile = false, onNavigate }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    if (mobile) return

    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobile])

  // Close desktop dropdown on Escape
  useEffect(() => {
    if (mobile) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobile])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (mobile) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium hover:bg-pcc-navy-light transition-colors"
        >
          {label}
          <ChevronDownIcon
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="ml-3 border-l border-white/20 bg-pcc-navy-light/30 rounded-r-md">
            {items.map((item) => {
              const external = isExternal(item.href)
              const linkProps = external
                ? { target: '_blank' as const, rel: 'noopener noreferrer' }
                : {}
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  {...linkProps}
                  className="flex items-center gap-1.5 rounded-md px-5 py-2 text-sm font-medium text-white/80 hover:bg-pcc-navy-light hover:text-white transition-colors"
                  onClick={() => {
                    setOpen(false)
                    onNavigate?.()
                  }}
                >
                  {item.name}
                  {external && (
                    <ArrowTopRightOnSquareIcon className="h-3 w-3 text-white/50" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Desktop
  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150)
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(!open)
          }
          if (e.key === 'ArrowDown' && !open) {
            e.preventDefault()
            setOpen(true)
          }
        }}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center text-sm font-medium hover:text-white/70 transition-colors"
      >
        {label}
        <ChevronDownIcon
          className={`ml-1 h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${
          open ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'
        }`}
        role="menu"
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            const menuItems = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="menuitem"]')
            const current = Array.from(menuItems).indexOf(document.activeElement as HTMLElement)
            menuItems[Math.min(current + 1, menuItems.length - 1)]?.focus()
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            const menuItems = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="menuitem"]')
            const current = Array.from(menuItems).indexOf(document.activeElement as HTMLElement)
            menuItems[Math.max(current - 1, 0)]?.focus()
          }
        }}
      >
        <div className="min-w-[220px] rounded-lg border border-pcc-cream bg-white py-2 shadow-lg">
          {items.map((item) => {
            const external = isExternal(item.href)
            const linkProps = external
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {}
            return (
              <Link
                key={item.href}
                href={item.href}
                {...linkProps}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-pcc-navy hover:bg-pcc-cream transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.name}
                {external && (
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-pcc-navy/40" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
