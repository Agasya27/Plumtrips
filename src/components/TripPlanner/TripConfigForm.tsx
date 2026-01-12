import { MapPin, Calendar, Users, Building } from 'lucide-react';
import { Destination, HotelType } from '@/lib/tripPricing';

interface TripConfigFormProps {
  selectedDestination: Destination | null;
  numberOfDays: number;
  numberOfTravelers: number;
  hotelType: HotelType | null;
  errors: Record<string, string>;
  onDestinationChange: (dest: Destination) => void;
  onDaysChange: (days: number) => void;
  onTravelersChange: (travelers: number) => void;
  onHotelTypeChange: (type: HotelType) => void;
}

const destinations: Destination[] = ['Goa', 'Manali', 'Jaipur'];
const hotelTypes: { type: HotelType; label: string; rate: string }[] = [
  { type: 'Budget', label: 'Budget', rate: '1x rate' },
  { type: 'Premium', label: 'Premium', rate: '1.5x rate' },
  { type: 'Luxury', label: 'Luxury', rate: '2x rate' },
];

export function TripConfigForm({
  selectedDestination,
  numberOfDays,
  numberOfTravelers,
  hotelType,
  errors,
  onDestinationChange,
  onDaysChange,
  onTravelersChange,
  onHotelTypeChange,
}: TripConfigFormProps) {
  return (
    <div className="space-y-5">
      {/* Row 1: Main Form Fields - Horizontal like PlumTrips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="p-4 rounded-lg border border-border bg-muted/30 sm:bg-transparent sm:p-0 sm:border-none lg:border-r lg:pr-4 lg:rounded-none">
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Destination
          </label>
          <select
            value={selectedDestination || ''}
            onChange={(e) => onDestinationChange(e.target.value as Destination)}
            className="w-full h-10 text-sm font-medium text-foreground bg-transparent border-0 focus:outline-none cursor-pointer"
          >
            <option value="" disabled>Select destination</option>
            {destinations.map((dest) => (
              <option key={dest} value={dest}>{dest}, India</option>
            ))}
          </select>
          {errors.destination && (
            <p className="text-destructive text-xs mt-1">{errors.destination}</p>
          )}
        </div>

        {/* Number of Days */}
        <div className="p-4 rounded-lg border border-border bg-muted/30 sm:bg-transparent sm:p-0 sm:border-none lg:border-r lg:pr-4 lg:rounded-none">
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            Duration
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={10}
              value={numberOfDays}
              onChange={(e) => onDaysChange(parseInt(e.target.value) || 1)}
              className="w-16 h-10 text-sm font-medium text-foreground bg-transparent border-0 focus:outline-none"
            />
            <span className="text-sm text-muted-foreground">Days</span>
          </div>
          {errors.days ? (
            <p className="text-destructive text-xs mt-1">{errors.days}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-0.5">1–10 days</p>
          )}
        </div>

        {/* Number of Travelers */}
        <div className="p-4 rounded-lg border border-border bg-muted/30 sm:bg-transparent sm:p-0 sm:border-none lg:border-r lg:pr-4 lg:rounded-none">
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <Users className="w-3.5 h-3.5 text-primary" />
            Travelers
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={6}
              value={numberOfTravelers}
              onChange={(e) => onTravelersChange(parseInt(e.target.value) || 1)}
              className="w-16 h-10 text-sm font-medium text-foreground bg-transparent border-0 focus:outline-none"
            />
            <span className="text-sm text-muted-foreground">
              {numberOfTravelers === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>
          {errors.travelers ? (
            <p className="text-destructive text-xs mt-1">{errors.travelers}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-0.5">1–6 guests</p>
          )}
        </div>

        {/* Hotel Type Selector */}
        <div className="p-4 rounded-lg border border-border bg-muted/30 sm:bg-transparent sm:p-0 sm:border-none lg:rounded-none">
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <Building className="w-3.5 h-3.5 text-primary" />
            Hotel Type
          </label>
          <select
            value={hotelType || ''}
            onChange={(e) => onHotelTypeChange(e.target.value as HotelType)}
            className="w-full h-10 text-sm font-medium text-foreground bg-transparent border-0 focus:outline-none cursor-pointer"
          >
            <option value="" disabled>Select hotel</option>
            {hotelTypes.map((item) => (
              <option key={item.type} value={item.type}>
                {item.label} ({item.rate})
              </option>
            ))}
          </select>
          {errors.hotel && (
            <p className="text-destructive text-xs mt-1">{errors.hotel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
