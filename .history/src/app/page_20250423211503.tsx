import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-glow">
      {/* Glow effect circles */}
      <div className="glow-circle" style={{ top: '80%', left: '20%' }} />
      <div className="glow-circle" style={{ top: '60%', left: '70%' }} />
      
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-4xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-white text-center sm:text-left">
            Accrua
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 text-center sm:text-left max-w-2xl">
            Your all-in-one solution for modern financial management and accounting.
          </p>
          
          <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-black gap-2 hover:bg-gray-100 font-medium text-sm sm:text-base h-12 px-6"
              href="#"
            >
              Get Started
            </a>
            <a
              className="rounded-full border border-solid border-white/20 transition-colors flex items-center justify-center hover:bg-white/10 text-white font-medium text-sm sm:text-base h-12 px-6"
              href="#"
            >
              Learn More
            </a>
          </div>
        </main>
        
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-white/60">
          <a
            className="flex items-center gap-2 hover:text-white transition-colors"
            href="#"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Documentation
          </a>
          <a
            className="flex items-center gap-2 hover:text-white transition-colors"
            href="#"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Features
          </a>
          <a
            className="flex items-center gap-2 hover:text-white transition-colors"
            href="#"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Contact Us
          </a>
        </footer>
      </div>
    </div>
  );
}
