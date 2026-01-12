/**
 * PlumTrips Pricing Logic
 * 
 * Pricing Rules:
 * - Base price is PER DAY (not per traveler)
 * - Hotel type applies a multiplier to the base
 * - Group discount: 10% off for MORE THAN 4 travelers (>4, not >=4)
 * - Extended stay discount: ₹2000 flat off for MORE THAN 7 days (>7)
 * - Final price is never negative
 */

export type Destination = 'Goa' | 'Manali' | 'Jaipur';
export type HotelType = 'Budget' | 'Premium' | 'Luxury';

// Base prices per day for each destination
export const BASE_PRICES: Record<Destination, number> = {
  Goa: 3000,
  Manali: 2500,
  Jaipur: 2000,
};

// Hotel type multipliers
export const HOTEL_MULTIPLIERS: Record<HotelType, number> = {
  Budget: 1,
  Premium: 1.5,
  Luxury: 2,
};

export interface TripConfig {
  selectedDestination: Destination;
  numberOfDays: number;
  numberOfTravelers: number;
  hotelType: HotelType;
}

export interface PriceBreakdown {
  basePricePerDay: number;
  basePrice: number;
  hotelMultiplier: number;
  subtotal: number;
  groupDiscount: number;
  extendedStayDiscount: number;
  totalDiscounts: number;
  finalPrice: number;
  hasGroupDiscount: boolean;
  hasExtendedStayDiscount: boolean;
}

/**
 * Calculate trip price with detailed breakdown
 * 
 * Formula:
 * basePrice = destinationPricePerDay × numberOfDays
 * subtotal = basePrice × hotelMultiplier
 * Discounts apply AFTER hotel multiplier
 * finalPrice = max(subtotal - totalDiscounts, 0)
 * 
 * @param config - Trip configuration object
 * @returns Price breakdown object with all calculations
 */
export function calculateTripPrice(config: TripConfig): PriceBreakdown {
  const { selectedDestination, numberOfDays, numberOfTravelers, hotelType } = config;
  
  // Step 1: Calculate base price (per day, NOT per traveler)
  const basePricePerDay = BASE_PRICES[selectedDestination];
  const basePrice = basePricePerDay * numberOfDays;
  
  // Step 2: Apply hotel multiplier
  const hotelMultiplier = HOTEL_MULTIPLIERS[hotelType];
  const subtotal = basePrice * hotelMultiplier;
  
  // Step 3: Calculate discounts (travelers only used for discount eligibility)
  // Group discount: MORE THAN 4 travelers (>4, not >=4)
  const hasGroupDiscount = numberOfTravelers > 4;
  const groupDiscount = hasGroupDiscount ? subtotal * 0.10 : 0;
  
  // Extended stay discount: MORE THAN 7 days (>7)
  const hasExtendedStayDiscount = numberOfDays > 7;
  const extendedStayDiscount = hasExtendedStayDiscount ? 2000 : 0;
  
  // Step 4: Calculate final price (never negative)
  const totalDiscounts = groupDiscount + extendedStayDiscount;
  const finalPrice = Math.max(0, subtotal - totalDiscounts);
  
  return {
    basePricePerDay,
    basePrice,
    hotelMultiplier,
    subtotal,
    groupDiscount,
    extendedStayDiscount,
    totalDiscounts,
    finalPrice,
    hasGroupDiscount,
    hasExtendedStayDiscount,
  };
}

/**
 * Validate trip configuration
 * @param config - Trip configuration to validate
 * @returns Object with validation results
 */
export function validateTripConfig(config: Partial<TripConfig>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  if (!config.selectedDestination) {
    errors.destination = 'Please select a destination';
  }
  
  if (!config.numberOfDays || config.numberOfDays < 1) {
    errors.days = 'Minimum 1 day required';
  } else if (config.numberOfDays > 10) {
    errors.days = 'Maximum 10 days allowed';
  }
  
  if (!config.numberOfTravelers || config.numberOfTravelers < 1) {
    errors.travelers = 'Minimum 1 traveler required';
  } else if (config.numberOfTravelers > 6) {
    errors.travelers = 'Maximum 6 travelers allowed';
  }
  
  if (!config.hotelType) {
    errors.hotel = 'Please select a hotel type';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generate a personalized trip message
 * @param config - Trip configuration
 * @returns Personalized message string
 */
export function generateTripMessage(config: TripConfig): string {
  const { selectedDestination, numberOfDays, numberOfTravelers, hotelType } = config;

  const travelerLabel = numberOfTravelers === 1 ? 'solo traveler' : `group of ${numberOfTravelers}`;
  const baseMessage = `Itinerary prepared for a ${numberOfDays}-day plan in ${selectedDestination} for a ${travelerLabel}.`;

  const notes: string[] = [];

  if (hotelType === 'Luxury') {
    notes.push('Arrangements include a luxury stay with elevated services throughout the schedule.');
  }

  if (numberOfDays > 7) {
    notes.push('The timetable allows additional downtime for an unhurried pace.');
  }

  if (numberOfTravelers > 4) {
    notes.push('Logistics account for a larger group with coordinated activities and transfers.');
  }

  if (notes.length === 0) {
    notes.push('Activities and transfers follow a balanced, well-paced itinerary.');
  }

  return `${baseMessage} ${notes.join(' ')}`;
}

/**
 * Format price in Indian Rupee format
 * @param price - Number to format
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
