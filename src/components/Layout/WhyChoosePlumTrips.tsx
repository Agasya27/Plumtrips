import { CalendarCheck, IndianRupee, RotateCcw, Headphones, Sparkles } from 'lucide-react';

const features = [
  {
    icon: CalendarCheck,
    title: 'Easy Booking',
    description: 'We offer easy and convenient flight bookings with attractive offers.',
    color: 'text-primary',
    bgColor: 'bg-primary/5',
  },
  {
    icon: IndianRupee,
    title: 'Lowest Price',
    description: 'We ensure low rates on hotel reservation, holiday packages and on flight tickets.',
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/5',
  },
  {
    icon: RotateCcw,
    title: 'Instant Refund',
    description: 'Get instant refunds effortlessly on your travel bookings with us.',
    color: 'text-[#10b981]',
    bgColor: 'bg-[#10b981]/5',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get assistance 24/7 on any kind of travel related query. We are happy to assist you.',
    color: 'text-primary',
    bgColor: 'bg-primary/5',
  },
  {
    icon: Sparkles,
    title: 'Exciting Deals',
    description: 'Enjoy exciting deals on flights, hotels, buses, car rental and tour packages.',
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/5',
  },
];

export function WhyChoosePlumTrips() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <h2 className="text-2xl font-bold text-foreground mb-10">
          Why Book With Us?
        </h2>

        {/* Features Grid - 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
