import Link from 'next/link'
import { Logo } from './logo'
import { FooterNewsletter } from './footer-newsletter'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/components/icons/social-icons'

export function Footer() {
  return (
    <footer className="bg-pcc-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo & Contact */}
          <div>
            <Logo variant="light" size="sm" />
            <div className="mt-4 space-y-2 text-sm text-white/90">
              <p>3560 Farm Hill Boulevard</p>
              <p>Redwood City, CA 94061</p>
              <p>
                <a href="tel:650-365-8094" className="hover:text-white transition-colors">
                  650-365-8094
                </a>
              </p>
              <p>
                <a href="mailto:info@wearepcc.com" className="hover:text-white transition-colors">
                  info@wearepcc.com
                </a>
              </p>
            </div>

            {/* Social Media */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/wearepcc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PCC on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-md text-white/70 hover:text-white transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/wearepcc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PCC on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-md text-white/70 hover:text-white transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@wearepcc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PCC on YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-md text-white/70 hover:text-white transition-colors"
              >
                <YouTubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="/new" className="hover:text-white transition-colors">I&apos;m New</Link></li>
              <li><Link href="/gatherings" className="hover:text-white transition-colors">Gatherings</Link></li>
              <li><Link href="/explore-faith/alpha" className="hover:text-white transition-colors">Alpha Program</Link></li>
              <li><Link href="/messages" className="hover:text-white transition-colors">Messages</Link></li>
              <li><Link href="/connect/groups" className="hover:text-white transition-colors">Small Groups</Link></li>
              <li><Link href="/connect/serve" className="hover:text-white transition-colors">Serve Opportunities</Link></li>
              <li><Link href="/give" className="hover:text-white transition-colors">Give</Link></li>
            </ul>
          </div>

          {/* Column 3: Service Times */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Times</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>Sunday: 9:00 AM</li>
              <li>Sunday: 10:45 AM</li>
              <li className="pt-2">
                <a
                  href="https://gathering.wearepcc.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Watch Live Online
                </a>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4 mt-8">Support</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="/support/prayer" className="hover:text-white transition-colors">Prayer Requests</Link></li>
              <li><Link href="/support/stephen-ministry" className="hover:text-white transition-colors">Stephen Ministry</Link></li>
              <li><Link href="/support/counseling" className="hover:text-white transition-colors">Counseling</Link></li>
            </ul>
          </div>

          {/* Column 4: Community Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link href="/about/community/preschool" className="hover:text-white transition-colors">
                  PCC Preschool
                </Link>
              </li>
              <li>
                <Link href="/about/community/community-center" className="hover:text-white transition-colors">
                  Peninsula Community Center
                </Link>
              </li>
              <li>
                <Link href="/about/community/sacc" className="hover:text-white transition-colors">
                  School Age Child Care (SACC)
                </Link>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-4 mt-8">About</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li><Link href="/about/beliefs" className="hover:text-white transition-colors">What We Believe</Link></li>
              <li><Link href="/about/leadership" className="hover:text-white transition-colors">Our Leadership</Link></li>
              <li><Link href="/about/staff" className="hover:text-white transition-colors">Staff Directory</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 border-t border-white/20 pt-8">
          <div className="mx-auto max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
            <p className="text-sm text-white/70 mb-4">
              Get weekly updates from PCC delivered to your inbox.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} Peninsula Covenant Church. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
