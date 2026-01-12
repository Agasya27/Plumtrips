import { useEffect, useState } from 'react';
import { PriceBreakdown as PriceBreakdownType, formatPrice } from '@/lib/tripPricing';

interface PriceBreakdownProps {
  breakdown: PriceBreakdownType | null;
  isValid: boolean;
}

export function PriceBreakdown({ breakdown, isValid }: PriceBreakdownProps) {
  const [animatePrice, setAnimatePrice] = useState(false);

  useEffect(() => {
    if (breakdown) {
      setAnimatePrice(true);
      const timer = setTimeout(() => setAnimatePrice(false), 300);
      return () => clearTimeout(timer);
    }
  }, [breakdown?.finalPrice]);

  if (!isValid || !breakdown) {
    return (
      <div className="h-full flex flex-col">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Price Summary
        </h2>
        <div className="flex-1 flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground text-center">
            Complete all fields to see pricing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground mb-4">
        Price Summary
      </h2>

      <div className="space-y-2">
        {/* Base Calculation */}
        <div className="flex justify-between py-2 text-sm">
          <span className="text-muted-foreground">
            Base Price ({formatPrice(breakdown.basePricePerDay)}/day × {breakdown.basePrice / breakdown.basePricePerDay} days)
          </span>
          <span className="text-foreground font-medium">
            {formatPrice(breakdown.basePrice)}
          </span>
        </div>

        {/* Hotel Multiplier */}
        <div className="flex justify-between py-2 text-sm">
          <span className="text-muted-foreground">
            Hotel Multiplier ({breakdown.hotelMultiplier}x)
          </span>
          <span className="text-foreground font-medium">
            {formatPrice(breakdown.subtotal)}
          </span>
        </div>

        {/* Discounts Section */}
        {breakdown.totalDiscounts > 0 && (
          <>
            <div className="border-t border-border my-3" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Applied Discounts
            </p>
            {breakdown.hasGroupDiscount && (
              <div className="flex justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">Group Discount (10%)</span>
                <span className="text-green-600 font-medium">-{formatPrice(breakdown.groupDiscount)}</span>
              </div>
            )}
            {breakdown.hasExtendedStayDiscount && (
              <div className="flex justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">Extended Stay Discount</span>
                <span className="text-green-600 font-medium">-{formatPrice(breakdown.extendedStayDiscount)}</span>
              </div>
            )}
          </>
        )}

        {/* Final Price */}
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Total Amount</span>
            <span 
              className={`text-xl font-bold text-primary transition-transform duration-200 ${
                animatePrice ? 'scale-110' : 'scale-100'
              }`}
            >
              {formatPrice(breakdown.finalPrice)}
            </span>
          </div>
          {breakdown.totalDiscounts > 0 && (
            <p className="text-xs text-green-600 mt-2 text-right font-medium">
              You save {formatPrice(breakdown.totalDiscounts)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
