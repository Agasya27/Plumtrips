import { useState, useEffect, useCallback } from 'react';
import {
  TripConfig,
  Destination,
  HotelType,
  PriceBreakdown,
  calculateTripPrice,
  validateTripConfig,
} from '@/lib/tripPricing';

const STORAGE_KEY = 'plumtrips_config';

interface UseTripPlannerReturn {
  // State
  selectedDestination: Destination | null;
  numberOfDays: number;
  numberOfTravelers: number;
  hotelType: HotelType | null;
  priceBreakdown: PriceBreakdown | null;
  errors: Record<string, string>;
  isValid: boolean;
  showTripSummary: boolean;
  
  // Actions
  searchTripPlan: () => void;
  setSelectedDestination: (dest: Destination) => void;
  setNumberOfDays: (days: number) => void;
  setNumberOfTravelers: (travelers: number) => void;
  setHotelType: (type: HotelType) => void;
  generateTripPlan: () => void;
  resetForm: () => void;
  closeSummary: () => void;
}

const defaultConfig = {
  selectedDestination: null as Destination | null,
  numberOfDays: 3,
  numberOfTravelers: 2,
  hotelType: null as HotelType | null,
};

const isDestination = (value: unknown): value is Destination =>
  value === 'Goa' || value === 'Manali' || value === 'Jaipur';

const isHotelType = (value: unknown): value is HotelType =>
  value === 'Budget' || value === 'Premium' || value === 'Luxury';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function useTripPlanner(): UseTripPlannerReturn {
  const [selectedDestination, setSelectedDestinationState] = useState<Destination | null>(
    defaultConfig.selectedDestination
  );
  const [numberOfDays, setNumberOfDaysState] = useState(defaultConfig.numberOfDays);
  const [numberOfTravelers, setNumberOfTravelersState] = useState(defaultConfig.numberOfTravelers);
  const [hotelType, setHotelTypeState] = useState<HotelType | null>(defaultConfig.hotelType);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTripSummary, setShowTripSummary] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        return;
      }

      const parsed = JSON.parse(saved);

      if (isDestination(parsed.selectedDestination)) {
        setSelectedDestinationState(parsed.selectedDestination);
      }

      if (typeof parsed.numberOfDays === 'number' && Number.isFinite(parsed.numberOfDays)) {
        setNumberOfDaysState(clamp(Math.round(parsed.numberOfDays), 1, 10));
      }

      if (typeof parsed.numberOfTravelers === 'number' && Number.isFinite(parsed.numberOfTravelers)) {
        setNumberOfTravelersState(clamp(Math.round(parsed.numberOfTravelers), 1, 6));
      }

      if (isHotelType(parsed.hotelType)) {
        setHotelTypeState(parsed.hotelType);
      }
    } catch (e) {
      console.error('Failed to load saved trip config:', e);
    }
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const config = {
      selectedDestination,
      numberOfDays,
      numberOfTravelers,
      hotelType,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [selectedDestination, numberOfDays, numberOfTravelers, hotelType]);

  // Recalculate price whenever inputs change
  useEffect(() => {
    const config: Partial<TripConfig> = {
      selectedDestination: selectedDestination ?? undefined,
      numberOfDays,
      numberOfTravelers,
      hotelType: hotelType ?? undefined,
    };

    const validation = validateTripConfig(config);
    setErrors(validation.errors);

    if (validation.isValid && selectedDestination && hotelType) {
      const breakdown = calculateTripPrice({
        selectedDestination,
        numberOfDays,
        numberOfTravelers,
        hotelType,
      });
      setPriceBreakdown(breakdown);
    } else {
      setPriceBreakdown(null);
    }

    setIsValid(validation.isValid);
  }, [selectedDestination, numberOfDays, numberOfTravelers, hotelType]);

  const setSelectedDestination = useCallback((dest: Destination) => {
    setSelectedDestinationState(dest);
    setShowTripSummary(false);
  }, []);

  const setNumberOfDays = useCallback((days: number) => {
    setNumberOfDaysState(clamp(days, 1, 10));
    setShowTripSummary(false);
  }, []);

  const setNumberOfTravelers = useCallback((travelers: number) => {
    setNumberOfTravelersState(clamp(travelers, 1, 6));
    setShowTripSummary(false);
  }, []);

  const setHotelType = useCallback((type: HotelType) => {
    setHotelTypeState(type);
    setShowTripSummary(false);
  }, []);

  const generateTripPlan = useCallback(() => {
    if (isValid && priceBreakdown) {
      setShowTripSummary(true);
    }
  }, [isValid, priceBreakdown]);

  const searchTripPlan = useCallback(() => {
    setShowTripSummary(false);
  }, []);

  const resetForm = useCallback(() => {
    setSelectedDestinationState(defaultConfig.selectedDestination);
    setNumberOfDaysState(defaultConfig.numberOfDays);
    setNumberOfTravelersState(defaultConfig.numberOfTravelers);
    setHotelTypeState(defaultConfig.hotelType);
    setShowTripSummary(false);
    setPriceBreakdown(null);
    setErrors({});
    setIsValid(false);

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const closeSummary = useCallback(() => {
    setShowTripSummary(false);
  }, []);

  return {
    selectedDestination,
    numberOfDays,
    numberOfTravelers,
    hotelType,
    priceBreakdown,
    errors,
    isValid,
    showTripSummary,
    searchTripPlan,
    setSelectedDestination,
    setNumberOfDays,
    setNumberOfTravelers,
    setHotelType,
    generateTripPlan,
    resetForm,
    closeSummary,
  };
}
