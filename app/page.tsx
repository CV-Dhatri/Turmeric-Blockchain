import Image from "next/image"
import Link from "next/link"
import { Hexagon } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-[#333333]">
          <Hexagon className="h-8 w-8" strokeWidth={1.5} />
          <span className="text-xl font-medium tracking-wide">TRACEABILITY</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            About
          </Link>
          <Link href="/trace-product" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            Trace Product
          </Link>
          <Link href="/login" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-[#333333] leading-tight">Traceability of Turmeric</h1>
            <p className="text-xl text-[#333333] max-w-lg">
              Ensure the provenance and authenticity of turmeric with blockchain technology
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-block px-8 py-4 bg-[#d4a017] text-white font-medium rounded-md hover:bg-[#c29016] transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/trace-product"
                className="inline-block px-8 py-4 bg-white text-[#333333] font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Trace Product
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/turmeric-image.png"
              alt="Turmeric powder in a white bowl with turmeric roots"
              width={500}
              height={400}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  )
}
