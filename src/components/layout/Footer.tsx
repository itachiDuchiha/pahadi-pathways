export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Pahadi Pathways
          </h2>

          <p className="mt-4 leading-7">
            Where Every Mountain Tells a Story.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-3">
            <li>Home</li>
            <li>Packages</li>
            <li>Destinations</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Popular Destinations
          </h3>

          <ul className="mt-4 space-y-3">
            <li>Shimla</li>
            <li>Manali</li>
            <li>Spiti Valley</li>
            <li>Kasol</li>
            <li>Dharamshala</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Contact
          </h3>

          <div className="mt-4 space-y-3">
            <p>📍 Himachal Pradesh, India</p>
            <p>📧 info@pahadipathways.com</p>
            <p>📞 +91 XXXXX XXXXX</p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-400 md:flex-row">
          <p>© 2026 Pahadi Pathways. All rights reserved.</p>

          <p>Crafted with ❤️ for travelers who love Himachal.</p>
        </div>
      </div>
    </footer>
  );
}