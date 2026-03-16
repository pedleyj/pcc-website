import Link from 'next/link'
import { Logo } from './logo'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

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
                <a href="https://www.peninsulacovenantpreschool.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  PCC Preschool
                </a>
              </li>
              <li>
                <a href="https://peninsulacommunitycenter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Peninsula Community Center
                </a>
              </li>
              <li>
                <a href="https://pccsacc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  School Age Child Care (SACC)
                </a>
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

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} Peninsula Covenant Church. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
