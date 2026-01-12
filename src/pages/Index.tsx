import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { WhyChoosePlumTrips } from '@/components/Layout/WhyChoosePlumTrips';
import { PopularDestinations } from '@/components/Layout/PopularDestinations';
import { TripPlanner } from '@/components/TripPlanner';

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Trip Planner Section */}
        <TripPlanner />

        {/* Popular Destinations */}
        <PopularDestinations />

        {/* Why Choose PlumTrips */}
        <WhyChoosePlumTrips />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
