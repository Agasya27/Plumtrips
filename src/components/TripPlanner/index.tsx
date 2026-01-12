import { TripConfigForm } from './TripConfigForm';
import { PriceBreakdown } from './PriceBreakdown';
import { TripSummary } from './TripSummary';
import { ActionButtons } from './ActionButtons';
import { useTripPlanner } from '@/hooks/useTripPlanner';

export function TripPlanner() {
  const {
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
  } = useTripPlanner();

  return (
    <section className="py-8 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Custom Trip Planner
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure destinations, travel details, and accommodation to review tailored pricing instantly.
          </p>
        </div>

        {/* Search Form Card - Like PlumTrips */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              {/* Form Fields */}
              <div className="flex-1">
                <TripConfigForm
                  selectedDestination={selectedDestination}
                  numberOfDays={numberOfDays}
                  numberOfTravelers={numberOfTravelers}
                  hotelType={hotelType}
                  errors={errors}
                  onDestinationChange={setSelectedDestination}
                  onDaysChange={setNumberOfDays}
                  onTravelersChange={setNumberOfTravelers}
                  onHotelTypeChange={setHotelType}
                />
              </div>
              
              {/* Search Button */}
              <button
                onClick={searchTripPlan}
                disabled={!isValid}
                className="bg-primary text-white font-medium px-10 py-3 rounded text-sm hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors min-w-[140px]"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Trip Summary - Shows when generated */}
        {showTripSummary && selectedDestination && hotelType && priceBreakdown && (
          <div className="mb-6">
            <TripSummary
              selectedDestination={selectedDestination}
              numberOfDays={numberOfDays}
              numberOfTravelers={numberOfTravelers}
              hotelType={hotelType}
              finalPrice={priceBreakdown.finalPrice}
              onClose={closeSummary}
            />
          </div>
        )}

        {/* Price Breakdown Card */}
        {priceBreakdown && isValid && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <PriceBreakdown breakdown={priceBreakdown} isValid={isValid} />
            </div>
            <div className="px-6 py-4 bg-muted/30 border-t border-border">
              <ActionButtons
                isValid={isValid}
                onGenerate={generateTripPlan}
                onReset={resetForm}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
