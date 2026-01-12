import { X, CheckCircle } from 'lucide-react';
import { Destination, HotelType, formatPrice, generateTripMessage } from '@/lib/tripPricing';

interface TripSummaryProps {
  selectedDestination: Destination;
  numberOfDays: number;
  numberOfTravelers: number;
  hotelType: HotelType;
  finalPrice: number;
  onClose: () => void;
}

export function TripSummary({
  selectedDestination,
  numberOfDays,
  numberOfTravelers,
  hotelType,
  finalPrice,
  onClose,
}: TripSummaryProps) {
  const message = generateTripMessage({
    selectedDestination,
    numberOfDays,
    numberOfTravelers,
    hotelType,
  });

  return (
    <div className="bg-white border border-primary/20 rounded shadow-sm fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            Booking Preview
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white rounded transition-colors"
          aria-label="Close summary"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-5">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Destination</p>
            <p className="font-semibold text-foreground">{selectedDestination}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Duration</p>
            <p className="font-semibold text-foreground">
              {numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Travelers</p>
            <p className="font-semibold text-foreground">
              {numberOfTravelers} {numberOfTravelers === 1 ? 'Person' : 'People'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Hotel Type</p>
            <p className="font-semibold text-foreground">{hotelType}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
            <p className="font-bold text-primary text-lg">{formatPrice(finalPrice)}</p>
          </div>
        </div>

        {/* Message */}
        <div className="bg-muted/50 rounded p-4 border border-border">
          <p className="text-sm text-foreground leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}
