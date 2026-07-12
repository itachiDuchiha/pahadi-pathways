export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <h1 className="text-2xl font-bold tracking-wide text-white">
          Pahadi Pathways
        </h1>

        <div className="hidden md:flex gap-8 text-white font-medium">

          <a href="#">Home</a>

          <a href="#">Destinations</a>

          <a href="#">Packages</a>

          <a href="#">Gallery</a>

          <a href="#">Contact</a>

        </div>

        <button className="bg-green-700 hover:bg-green-800 transition px-5 py-2 rounded-full text-white">
          Plan My Trip
        </button>

      </div>
    </nav>
  );
}