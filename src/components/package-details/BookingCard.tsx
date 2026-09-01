import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Phone,
  MessageCircle,
} from "lucide-react";

import type { Package } from "@/data/packages";

type Props = {
  pkg: Package;
};

export default function BookingCard({ pkg }: Props) {
  return (
    <section className="bg-[#10264A] py-20">
      <div className="mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-10">

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A3D]">
                Ready to Travel?
              </p>

              <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
                Book This Tour
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                Reserve your Himalayan adventure today. Contact our travel
                experts for availability, customizations and instant booking
                assistance.
              </p>

              <div className="mt-10">

                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Starting From
                </p>

                <h3 className="mt-2 text-5xl font-bold text-[#10264A]">
                  {pkg.price}
                </h3>

                <p className="mt-2 text-gray-500">
                  Per Person
                </p>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-[#F8F8F6] p-10">

              <div className="space-y-5">

                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#10264A] py-4 font-semibold text-white transition duration-300 hover:bg-[#18355F]"
                >
                  <Calendar size={20} />
                  Book Now
                </Link>

                <Link
                  href="https://wa.me/919999999999"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#25D366] py-4 font-semibold text-[#25D366] transition duration-300 hover:bg-[#25D366] hover:text-white"
                >
                  <MessageCircle size={20} />
                  WhatsApp Enquiry
                </Link>

                <Link
                  href="tel:+919999999999"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-4 font-semibold text-[#10264A] transition duration-300 hover:bg-white"
                >
                  <Phone size={20} />
                  Call Now
                </Link>

              </div>

              <div className="mt-10 rounded-2xl bg-white p-6">

                <h4 className="text-lg font-bold text-[#10264A]">
                  Need a Custom Tour?
                </h4>

                <p className="mt-3 leading-7 text-gray-600">
                  We can customize hotels, destinations, sightseeing,
                  duration and vehicle according to your requirements.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#C89A3D]"
                >
                  Request Custom Quote
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}