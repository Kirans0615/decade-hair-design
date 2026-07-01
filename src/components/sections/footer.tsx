import { Heart, Share2, MapPin } from "lucide-react"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { Divider } from "@/components/ui/divider"
import { CONTACT } from "@/data/contact"

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
              <Heart className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-foreground transition-transform hover:scale-110 hover:text-muted">
              <Share2 className="h-5 w-5" />
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
