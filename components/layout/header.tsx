'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from './logo'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "I'm New", href: '/new' },
    { name: 'Gatherings', href: '/gatherings' },
    { name: 'Alpha', href: '/alpha' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'About', href: '/about' },
    { name: 'Give', href: '/give' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-pcc-navy text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <Logo variant="light" size="sm" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-pcc-teal transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link
            href="/alpha"
            className="rounded-lg bg-pcc-gold px-4 py-2 text-sm font-semibold text-pcc-navy hover:bg-pcc-gold-light transition-colors"
          >
            Join Alpha
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-pcc-navy-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/alpha"
              className="block rounded-lg bg-pcc-gold px-3 py-2 text-center text-base font-semibold text-pcc-navy"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Alpha
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
