import { ChevronLeft, ChevronRight } from 'lucide-react';
import hyderabadImage from '@/assets/hyderabad.jpg';
import mumbaiImage from '@/assets/mumbai.jpg';
import goaImage from '@/assets/Goa.jpg';
import bangaluruImage from '@/assets/bangaluru.jpg';
import delhiImage from '@/assets/delhi.png';

const destinations = [
  { 
    name: 'New Delhi and NCR', 
    accommodations: '12,786',
    image: delhiImage
  },
  { 
    name: 'Goa', 
    accommodations: '9,254',
    image: goaImage
  },
  { 
    name: 'Bangalore', 
    accommodations: '5,372',
    image: bangaluruImage
  },
  { 
    name: 'Mumbai', 
    accommodations: '4,177',
    image: mumbaiImage
  },
  { 
    name: 'Hyderabad', 
    accommodations: '2,735',
    image: hyderabadImage
  },
];

export function PopularDestinations() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <h2 className="text-2xl font-bold text-foreground mb-8">
          Top destinations in India
        </h2>

        {/* Destinations Carousel */}
        <div className="relative">
          {/* Navigation Arrow Left */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Destinations Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-muted">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Info */}
                <h3 className="text-sm font-semibold text-foreground text-center">
                  {dest.name}
                </h3>
                <p className="text-xs text-muted-foreground text-center mt-0.5">
                  {dest.accommodations} accommodations
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Arrow Right */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-border rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
