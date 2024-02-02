import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Image
        src="/logo.png"
        alt="Boardy Logo"
        width={300}
        height={300}
        className="animate-pulse duration-700"
      />
    </div>
  );
}