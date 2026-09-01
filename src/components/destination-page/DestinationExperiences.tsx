type Props = {
  destination: {
    name: string;
    experiences?: string[];
  };
};

export default function DestinationExperiences({
  destination,
}: Props) {
  const experiences =
    destination.experiences && destination.experiences.length > 0
      ? destination.experiences
      : [
          "Scenic sightseeing",
          "Nature walks",
          "Local food experiences",
          "Photography",
          "Sunrise & sunset viewpoints",
          "Cultural exploration",
        ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">

      <div className="text-center">

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89A3D]">
          Experiences
        </p>

        <h2 className="mt-4 text-4xl font-bold text-[#10264A]">
          Things To Do In {destination.name}
        </h2>

      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {experiences.map((experience) => (
          <div
            key={experience}
            className="rounded-3xl bg-[#F8F8F8] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 text-4xl">
              🏔️
            </div>

            <h3 className="text-xl font-bold text-[#10264A]">
              {experience}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}