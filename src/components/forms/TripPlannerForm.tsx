import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Checkbox from "../ui/Checkbox";

const serviceOptions = [
  "Complete Tour Package",
  "Hotel Booking",
  "Taxi Service",
  "Custom Itinerary",
  "Honeymoon Trip",
  "Family Vacation",
  "Adventure Trip",
  "Not Sure Yet",
];

export default function TripPlannerForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          🏔 Let's Plan Your Himachal Journey
        </h2>

        <p className="mt-3 text-gray-600">
          Fill in a few details and our local travel experts will help
          you plan the perfect trip.
        </p>

        <p className="mt-2 text-sm text-green-700 font-medium">
          ⏱ Takes less than 1 minute
        </p>
      </div>

      <div className="space-y-5">

        <Input
          label="Your Name"
          required
          placeholder="Enter your name"
        />

        <Input
          label="Mobile Number"
          type="tel"
          required
          placeholder="Enter your mobile number"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Starting City"
          placeholder="e.g. Delhi, Chandigarh, Mumbai"
        />

        <div>
          <h3 className="mb-4 font-semibold text-gray-800">
            How can we help you?
          </h3>

          <div className="grid gap-3 md:grid-cols-2">
            {serviceOptions.map((service) => (
              <Checkbox
                key={service}
                label={service}
              />
            ))}
          </div>
        </div>

        <TextArea
          label="Tell us about your dream trip"
          placeholder="Tell us anything that will help us plan your journey..."
        />

        <div className="pt-4 text-center">
          <Button>
            Get My Free Travel Plan
          </Button>

          <p className="mt-4 text-sm text-gray-500">
            🔒 Your information is private and will only be used to
            help plan your trip.
          </p>
        </div>

      </div>

    </div>
  );
}