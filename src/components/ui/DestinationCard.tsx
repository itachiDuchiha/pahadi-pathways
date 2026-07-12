type DestinationCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function DestinationCard({
  title,
  description,
  image,
}: DestinationCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <img
        src={image}
        alt={title}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="mt-3 text-gray-600 leading-relaxed">
          {description}
        </p>

        <button className="mt-6 rounded-full bg-green-700 px-6 py-3 text-white transition hover:bg-green-800">
          Explore →
        </button>
      </div>
    </div>
  );
}