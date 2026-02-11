import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ variant = 'light', size = 'sm' }: LogoProps) {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 },
  }

  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <Image
        src={variant === 'light' ? '/images/pcc-logo-white.png' : '/images/pcc-logo-black.png'}
        alt="Peninsula Covenant Church"
        width={sizes[size].width}
        height={sizes[size].height}
        priority
      />
      <span
        className={`font-bold tracking-wide ${variant === 'light' ? 'text-white' : 'text-pcc-navy'} ${
          size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'
        }`}
        style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
      >
        pcc
      </span>
    </Link>
  )
}
