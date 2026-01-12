import plumtripsLogo from '@/assets/plumtrips-logo.png';

const footerLinks = {
  'Travel & Tourism': ['Travel Blog', 'Subscribe for Offers', 'Testimonials', 'FAQs'],
  'Services': ['Flights', 'Hotels', 'Bus', 'Holidays', 'Visa'],
  'Help & Support': ['Become a Partner', 'Web Check In', 'Contact Us', 'About Us'],
};

export function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <a href="#" className="inline-block mb-4 bg-white rounded px-2 py-1">
              <img 
                src={plumtripsLogo} 
                alt="PlumTrips logo" 
                className="h-8 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-white/60 leading-relaxed">
              PlumTrips offers end-to-end travel solutions including flight tickets, hotel bookings, holiday packages, and more.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              © 2026 PlumTrips India Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
