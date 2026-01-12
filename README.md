# PlumTrips – Trip Planner

A modern, single-page trip planning interface with real-time pricing, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Interactive Trip Configuration**: Select destination, days, travelers, and hotel type
- **Real-time Price Updates**: Prices recalculate instantly as you modify selections
- **Smart Discounts**: Automatic discounts for groups and extended stays
- **Trip Summary Generation**: Beautiful summary card with personalized messaging
- **State Persistence**: Selections saved to localStorage and restored on page refresh
- **Responsive Design**: Works seamlessly on mobile and desktop

---

## 💰 Pricing Logic

The pricing is calculated in `src/lib/tripPricing.ts` using the `calculateTripPrice()` function.

### Base Prices (per day, per traveler)

| Destination | Base Price |
|------------|------------|
| Goa        | ₹3,000     |
| Manali     | ₹2,500     |
| Jaipur     | ₹2,000     |

### Hotel Multipliers

| Hotel Type | Multiplier |
|-----------|------------|
| Budget    | 1.0x       |
| Premium   | 1.5x       |
| Luxury    | 2.0x       |

### Discounts Applied

1. **Group Discount**: 10% off when travelers > 4
2. **Extended Stay Discount**: Flat ₹2,000 off when days > 7
3. **Group Trip Bonus** (Custom): 5% off when days ≥ 5 AND travelers ≥ 3

### Calculation Formula

```
basePrice = basePricePerDay × numberOfDays × numberOfTravelers
afterMultiplier = basePrice × hotelMultiplier
finalPrice = max(0, afterMultiplier - allDiscounts)
```

---

## ✨ Additional Logic Rule Added

**Group Trip Bonus Discount**: A 5% promotional discount is automatically applied when:
- Trip duration is 5 or more days, AND
- Party size is 3 or more travelers

This simulates an "early booking" incentive for well-planned group trips, encouraging longer stays with larger groups.

---

## 🔧 Refactoring Decisions

### Separation of Concerns
- **Pricing logic** (`tripPricing.ts`): Pure functions for calculations, completely decoupled from UI
- **State management** (`useTripPlanner.ts`): Custom hook managing all trip state and localStorage
- **UI components**: Small, focused components (Header, TripConfigForm, PriceBreakdown, etc.)

### Why This Structure?
1. **Testability**: Pricing functions can be unit tested independently
2. **Reusability**: The hook can be used in different UI implementations
3. **Maintainability**: Changes to pricing logic don't affect UI code
4. **Type Safety**: Full TypeScript types for all configurations and breakdowns

---

## 🐛 Debugging Price Update Issues

If prices aren't updating correctly:

1. **Check Console**: Open browser DevTools and look for errors
2. **Verify localStorage**: Run `localStorage.getItem('plumtrips_config')` in console
3. **Check State**: The `useTripPlanner` hook logs state changes via `useEffect`
4. **Validate Inputs**: Ensure all fields are filled (destination & hotel type required)

### Common Issues:
- **Price shows "Complete all selections"**: Select both destination AND hotel type
- **Discounts not applying**: Verify you meet the threshold (5+ travelers, 8+ days)
- **Old values persisting**: Click "Reset" or clear `plumtrips_config` from localStorage

---

## 🚀 Production Improvements

### Recommended Enhancement: Backend API Integration

For a production version, implement a backend API for pricing:

```typescript
// Instead of client-side calculation
const response = await fetch('/api/calculate-price', {
  method: 'POST',
  body: JSON.stringify(tripConfig),
});
const pricing = await response.json();
```

**Benefits:**
- Prices can be updated without app deployment
- Add dynamic pricing (seasonal rates, flash sales)
- Prevent price manipulation by malicious users
- Enable A/B testing of pricing strategies
- Add proper booking flow with payment integration

### Other Production Considerations:
- Add unit tests for pricing logic
- Implement error boundaries for UI resilience
- Add loading states for async operations
- Integrate with a real booking/payment system
- Add analytics tracking for user behavior

---

## 🛠️ Tech Stack

- **React 18** – UI library
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling
- **Lucide React** – Icons
- **Vite** – Build tool

---

## 📁 Project Structure

```
src/
├── components/
│   └── TripPlanner/
│       ├── index.tsx         # Main container
│       ├── Header.tsx        # Page header
│       ├── TripConfigForm.tsx# Configuration inputs
│       ├── PriceBreakdown.tsx# Live pricing display
│       ├── TripSummary.tsx   # Generated summary
│       └── ActionButtons.tsx # Generate/Reset buttons
├── hooks/
│   └── useTripPlanner.ts     # State management hook
├── lib/
│   └── tripPricing.ts        # Pricing logic & utilities
└── pages/
    └── Index.tsx             # Main page
```

---

