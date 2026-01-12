import { useState } from 'react';
import { Plane, Building2, Palmtree, Bus, FileText, MoreHorizontal, HelpCircle, User, Menu, X } from 'lucide-react';
import plumtripsLogo from '@/assets/plumtrips-logo.png';

const navItems = [
  { label: 'Flights', icon: Plane, active: false },
  { label: 'Hotels', icon: Building2, active: false },
  { label: 'Trip Planner', icon: Palmtree, active: true },
  { label: 'Holiday', icon: Palmtree, active: false },
  { label: 'Bus', icon: Bus, active: false },
  { label: 'Visa', icon: FileText, active: false },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center" onClick={handleCloseMobileMenu}>
            <img 
              src={plumtripsLogo} 
              alt="PlumTrips logo" 
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors border-b-2 ${
                  item.active
                    ? 'text-primary border-primary'
                    : 'text-foreground border-transparent hover:text-primary'
                }`}
              >
                <item.icon className="w-5 h-5" strokeWidth={1.5} />
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="flex items-center gap-2 px-5 py-4 text-sm font-medium text-foreground border-b-2 border-transparent hover:text-primary transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" strokeWidth={1.5} />
              More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-primary" strokeWidth={2} />
              </div>
              Help
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary" strokeWidth={2} />
              </div>
              <span className="hidden sm:inline">Login or Signup</span>
            </a>
            <button
              type="button"
              className="md:hidden w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Toggle navigation"
              onClick={handleToggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-border pb-4">
            <ul className="flex flex-col gap-1 pt-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    onClick={handleCloseMobileMenu}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-primary/5 text-primary'
                        : 'text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <item.icon className="w-4 h-4" strokeWidth={1.5} />
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  onClick={handleCloseMobileMenu}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
                  More Options
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
