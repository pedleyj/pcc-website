'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils/cn'

interface NavDropdownItem {
  name: string
  href: string
}

interface NavDropdownProps {
  label: string
  href?: string
  items: NavDropdownItem[]
  mobile?: boolean
  onNavigate?: () => void
  isActive?: boolean
}

function isExternal(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-1'
const focusRingDark = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-1 focus-visible:ring-offset-pcc-navy'

export function NavDropdown({ label, href, items, mobile = false, onNavigate, isActive = false }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const menuId = `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`

  // Focus first menu item when desktop dropdown opens via keyboard
  const focusFirstItem = useCallback(() => {
    requestAnimationFrame(() => {
      const firstItem = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')
      firstItem?.focus()
    })
  }, [])

  // Return focus to trigger when closing
  const closeAndReturnFocus = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

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

  // Close desktop dropdown on Escape and return focus
  useEffect(() => {
    if (mobile || !open) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeAndReturnFocus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobile, open, closeAndReturnFocus])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (mobile) {
    return (
      <div>
        <div className="flex items-center">
          {href ? (
            <Link
              href={href}
              className={cn(
                'flex-1 rounded-md px-3 py-3 text-base font-medium transition-colors',
                isActive ? 'bg-pcc-navy-light text-white' : 'hover:bg-pcc-navy-light',
                focusRingDark
              )}
              onClick={() => onNavigate?.()}
            >
              {label}
            </Link>
          ) : (
            <span className="flex-1 px-3 py-3 text-base font-medium">{label}</span>
          )}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-haspopup="true"
            aria-controls={menuId}
            aria-label={`${open ? 'Collapse' : 'Expand'} ${label} menu`}
            className={`rounded-md p-3 hover:bg-pcc-navy-light transition-colors ${focusRingDark}`}
          >
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div
          id={menuId}
          role="menu"
          aria-label={label}
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
                  role="menuitem"
                  aria-label={external ? `${item.name} (opens in new tab)` : undefined}
                  className={`flex items-center gap-1.5 rounded-md px-5 py-2 text-sm font-medium text-white/80 hover:bg-pcc-navy-light hover:text-white transition-colors ${focusRingDark}`}
                  onClick={() => {
                    setOpen(false)
                    onNavigate?.()
                  }}
                >
                  {item.name}
                  {external && (
                    <ArrowTopRightOnSquareIcon className="h-3 w-3 text-white/50" aria-hidden="true" />
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
      <div className={cn(
        'flex items-center rounded-md border px-3 py-1.5 transition-colors',
        isActive ? 'border-white/60' : 'border-transparent hover:border-white/40'
      )}>
        {href ? (
          <Link
            href={href}
            className={`text-sm font-medium transition-colors ${focusRing} focus-visible:ring-offset-pcc-navy`}
          >
            {label}
          </Link>
        ) : (
          <span className="text-sm font-medium">{label}</span>
        )}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setOpen((prev) => {
                if (!prev) requestAnimationFrame(() => focusFirstItem())
                return !prev
              })
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              if (!open) {
                setOpen(true)
                focusFirstItem()
              } else {
                focusFirstItem()
              }
            }
          }}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${label} menu`}
          className={`ml-0.5 rounded-sm p-0.5 transition-colors ${focusRing} focus-visible:ring-offset-pcc-navy`}
        >
          <ChevronDownIcon
            className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        ref={menuRef}
        id={menuId}
        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${
          open ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'
        }`}
        role="menu"
        aria-label={label}
        onKeyDown={(e) => {
          const menuItems = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]')
          if (!menuItems) return
          const current = Array.from(menuItems).indexOf(document.activeElement as HTMLElement)

          if (e.key === 'ArrowDown') {
            e.preventDefault()
            menuItems[Math.min(current + 1, menuItems.length - 1)]?.focus()
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (current <= 0) {
              closeAndReturnFocus()
            } else {
              menuItems[current - 1]?.focus()
            }
          }
          if (e.key === 'Tab') {
            setOpen(false)
          }
          if (e.key === 'Home') {
            e.preventDefault()
            menuItems[0]?.focus()
          }
          if (e.key === 'End') {
            e.preventDefault()
            menuItems[menuItems.length - 1]?.focus()
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
                aria-label={external ? `${item.name} (opens in new tab)` : undefined}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm text-pcc-navy hover:bg-pcc-cream transition-colors ${focusRing} focus-visible:ring-offset-white`}
                onClick={() => setOpen(false)}
              >
                {item.name}
                {external && (
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-pcc-navy/40" aria-hidden="true" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
