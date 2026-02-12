'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { NavDropdown } from './nav-dropdown'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const dropdowns = {
  'Explore Faith': [
    { name: 'Alpha Program', href: '/explore-faith' },
    { name: 'What We Believe', href: '/about/beliefs' },
    { name: 'Questions About Christianity', href: '/explore-faith/faq' },
  ],
  Connect: [
    { name: 'Small Groups', href: '/connect/groups' },
    { name: 'Ministries', href: '/connect/ministries' },
    { name: 'Serve Opportunities', href: '/connect/serve' },
    { name: 'Member Login', href: 'https://pcc.churchcenter.com' },
  ],
  Support: [
    { name: 'Prayer Requests', href: '/support/prayer' },
    { name: 'Stephen Ministry', href: '/support/stephen-ministry' },
    { name: 'Community Care', href: '/support/community-care' },
    { name: 'Counseling Resources', href: '/support/counseling' },
    { name: 'Marriage Support', href: '/support/marriage' },
    { name: 'Support Groups', href: '/support/groups' },
  ],
  About: [
    { name: 'Our Mission & Story', href: '/about' },
    { name: 'What We Believe', href: '/about/beliefs' },
    { name: 'Our Pastor & Leadership', href: '/about/leadership' },
    { name: 'Staff Directory', href: '/about/staff' },
    { name: 'Community Programs', href: '/about/community' },
    { name: 'Events Calendar', href: '/events' },
    { name: 'Newsletter', href: '/about/newsletter' },
  ],
} as const

const simpleLinks = [
  { name: "I'm New", href: '/new' },
  { name: 'Gatherings', href: '/gatherings' },
  { name: 'Give', href: '/give' },
]

const navOrder = ["I'm New", 'Gatherings', 'Explore Faith', 'Connect', 'Support', 'About', 'Give'] as const

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

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
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-pcc-navy text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <Logo variant="light" size="sm" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-x-8">
          {navOrder.map((name) => {
            const dropdown = dropdowns[name as keyof typeof dropdowns]
            if (dropdown) {
              return (
                <NavDropdown key={name} label={name} items={[...dropdown]} />
              )
            }
            const link = simpleLinks.find((l) => l.name === name)!
            return (
              <Link
                key={name}
                href={link.href}
                className="text-sm font-medium hover:text-white/70 transition-colors"
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
            className="rounded-lg bg-pcc-gold px-4 py-2 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
          >
            Join Alpha
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile menu overlay + slide-in panel */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-visibility ${
          mobileMenuOpen ? 'visible' : 'invisible delay-300'
        }`}
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
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-pcc-navy shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <Logo variant="light" size="sm" />
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="rounded-md p-1 hover:bg-pcc-navy-light transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
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
                    items={[...dropdown]}
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
                  className="block rounded-md px-3 py-3 text-base font-medium hover:bg-pcc-navy-light transition-colors"
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
              className="block rounded-lg bg-pcc-gold px-3 py-3 text-center text-base font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
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
