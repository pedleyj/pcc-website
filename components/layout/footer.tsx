import Link from 'next/link'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="bg-pcc-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Logo & Contact */}
          <div>
            <Logo variant="light" size="sm" />
            <div className="mt-4 space-y-2 text-sm text-pcc-cream">
              <p>3560 Farm Hill Boulevard</p>
              <p>Redwood City, CA 94061</p>
              <p>650-365-8094</p>
              <p>info@wearepcc.com</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-pcc-cream">
              <li><Link href="/new" className="hover:text-pcc-teal transition-colors">I'm New</Link></li>
              <li><Link href="/explore-faith/alpha" className="hover:text-pcc-teal transition-colors">Alpha</Link></li>
              <li><Link href="/ministries" className="hover:text-pcc-teal transition-colors">Ministries</Link></li>
              <li><Link href="/give" className="hover:text-pcc-teal transition-colors">Give</Link></li>
            </ul>
          </div>

          {/* Column 3: Service Times */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Times</h3>
            <ul className="space-y-2 text-sm text-pcc-cream">
              <li>Sunday: 9:00 AM</li>
              <li>Sunday: 10:45 AM</li>
              <li className="pt-2">
                <Link href="https://gathering.wearepcc.com" className="hover:text-pcc-teal transition-colors">
                  Watch Live
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Community Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-pcc-cream">
              <li><a href="https://www.peninsulacovenantpreschool.com/" className="hover:text-pcc-teal transition-colors">PCC Preschool</a></li>
              <li><a href="https://peninsulacommunitycenter.com/" className="hover:text-pcc-teal transition-colors">Community Center</a></li>
              <li><a href="https://pccsacc.com/" className="hover:text-pcc-teal transition-colors">School Age Child Care</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-pcc-cream/60">
          © {new Date().getFullYear()} Peninsula Covenant Church. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
