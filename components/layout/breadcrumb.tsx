import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

type BreadcrumbItem = {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-6 flex items-center gap-1 text-sm text-white/70" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-white transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
