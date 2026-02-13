'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { NavDropdown } from './nav-dropdown'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-1'
const focusRingDark = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pcc-teal focus-visible:ring-offset-1 focus-visible:ring-offset-pcc-navy'

const dropdowns = {
  'Explore Faith': {
    href: '/explore-faith',
    items: [
      { name: 'Alpha Program', href: '/explore-faith/alpha' },
      { name: 'What We Believe', href: '/about/beliefs' },
      { name: 'Questions About Christianity', href: '/explore-faith/faq' },
    ],
  },
  Connect: {
    href: '/connect',
    items: [
      { name: 'Small Groups', href: '/connect/groups' },
      { name: 'Ministries', href: '/connect/ministries' },
      { name: 'Serve Opportunities', href: '/connect/serve' },
      { name: 'Member Login', href: 'https://pcc.churchcenter.com' },
    ],
  },
  Support: {
    href: '/support',
    items: [
      { name: 'Prayer Requests', href: '/support/prayer' },
      { name: 'Stephen Ministry', href: '/support/stephen_ministry' },
      { name: 'Community Care', href: '/support/community_care' },
      { name: 'Counseling Resources', href: '/support/counseling' },
      { name: 'Marriage Support', href: '/support/marriage' },
      { name: 'Support Groups', href: '/support/support_groups' },
    ],
  },
  About: {
    href: '/about',
    items: [
      { name: 'Our Mission & Story', href: '/about' },
      { name: 'What We Believe', href: '/about/beliefs' },
      { name: 'Our Leadership', href: '/about/leadership' },
      { name: 'Our Staff', href: '/about/staff' },
      { name: 'Community Programs', href: '/about/community' },
      { name: 'Events Calendar', href: '/events' },
      { name: 'Newsletter', href: '/about/newsletter' },
    ],
  },
} as const

const simpleLinks = [
  { name: "I'm New", href: '/new' },
  { name: 'Gatherings', href: '/gatherings' },
  { name: 'Give', href: '/give' },
]

const navOrder = ["I'm New", 'Gatherings', 'Explore Faith', 'Connect', 'Support', 'About', 'Give'] as const

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
    // Return focus to hamburger button
    requestAnimationFrame(() => menuButtonRef.current?.focus())
  }, [])

  // Focus close button when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      requestAnimationFrame(() => closeButtonRef.current?.focus())
    }
  }, [mobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeMobileMenu()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen, closeMobileMenu])

  // Focus trap in mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !mobileMenuRef.current) return

      const focusableEls = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusableEls.length === 0) return

      const first = focusableEls[0]
      const last = focusableEls[focusableEls.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 bg-pcc-navy text-white shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <Logo variant="light" size="sm" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-x-8">
          {navOrder.map((name) => {
            const dropdown = dropdowns[name as keyof typeof dropdowns]
            if (dropdown) {
              return (
                <NavDropdown key={name} label={name} href={dropdown.href} items={[...dropdown.items]} />
              )
            }
            const link = simpleLinks.find((l) => l.name === name)!
            return (
              <Link
                key={name}
                href={link.href}
                className={`rounded-sm text-sm font-medium hover:text-white/70 transition-colors ${focusRing} focus-visible:ring-offset-pcc-navy`}
              >
                {name}
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link
            href="/explore-faith"
            className={`rounded-lg bg-pcc-gold px-4 py-2 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors ${focusRing} focus-visible:ring-offset-pcc-navy`}
          >
            Join Alpha
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          type="button"
          className={`md:hidden rounded-md p-1 ${focusRingDark}`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile menu overlay + slide-in panel */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-visibility ${
          mobileMenuOpen ? 'visible' : 'invisible delay-300'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        id="mobile-menu"
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Slide-in panel */}
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-pcc-navy shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {/* Menu header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <Logo variant="light" size="sm" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className={`rounded-md p-1 hover:bg-pcc-navy-light transition-colors ${focusRingDark}`}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable nav items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navOrder.map((name) => {
              const dropdown = dropdowns[name as keyof typeof dropdowns]
              if (dropdown) {
                return (
                  <NavDropdown
                    key={name}
                    label={name}
                    href={dropdown.href}
                    items={[...dropdown.items]}
                    mobile
                    onNavigate={closeMobileMenu}
                  />
                )
              }
              const link = simpleLinks.find((l) => l.name === name)!
              return (
                <Link
                  key={name}
                  href={link.href}
                  className={`block rounded-md px-3 py-3 text-base font-medium hover:bg-pcc-navy-light transition-colors ${focusRingDark}`}
                  onClick={closeMobileMenu}
                >
                  {name}
                </Link>
              )
            })}
          </div>

          {/* Sticky CTA at bottom */}
          <div className="border-t border-white/10 px-4 py-4">
            <Link
              href="/explore-faith"
              className={`block rounded-lg bg-pcc-gold px-3 py-3 text-center text-base font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors ${focusRing}`}
              onClick={closeMobileMenu}
            >
              Join Alpha
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
