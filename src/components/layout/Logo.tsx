import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/images/logo/navbar-logo5.png"
        alt="The Himalayan Compass"
        width={280}
        height={70}
        priority
        className="h-24 w-auto"
      />
    </div>
  );
}