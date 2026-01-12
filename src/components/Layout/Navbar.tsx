import { Plane, Building2, Palmtree, Bus, FileText, MoreHorizontal, HelpCircle, User } from 'lucide-react';
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
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center">
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
          </div>
        </div>
      </div>
    </header>
  );
}
