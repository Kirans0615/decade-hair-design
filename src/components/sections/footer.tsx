import { MapPin } from "lucide-react"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { Divider } from "@/components/ui/divider"
import { CONTACT } from "@/data/contact"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-6 pb-14 pt-24 md:px-10">
      <Divider className="mb-16" />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        <div>
          <DHDLogo size="md" animate={false} />
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted">Visit</h4>
          <p className="flex items-start gap-2 font-sans text-sm text-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> {CONTACT.address}
          </p>
          <p className="mt-3 font-sans text-sm text-foreground">{CONTACT.phone}</p>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted">Hours</h4>
          {CONTACT.hoursLines.map((line) => (
            <p key={line} className="font-sans text-sm text-foreground">{line}</p>
          ))}
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted">Follow</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="text-foreground transition-transform hover:scale-110 hover:text-muted">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-foreground transition-transform hover:scale-110 hover:text-muted">
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <p className="mt-16 text-center font-sans text-[11px] uppercase tracking-[0.3em] text-muted">
        © 2026 Decade Hair Design. All rights reserved.
      </p>
    </footer>
  )
}
