import Link from "next/link"
import Image from "next/image"
import { Hexagon } from "lucide-react"

export default function AboutPage() {
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

      {/* About Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-8">About Turmeric Traceability</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
            <div>
              <p className="text-lg mb-4">
                Our blockchain-based traceability platform ensures the authenticity and quality of turmeric throughout
                the supply chain, from farm to consumer.
              </p>
              <p className="text-lg mb-4">
                By tracking every step of the journey, we provide transparency, reduce fraud, and help consumers make
                informed choices about the products they purchase.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/turmeric-image.png"
                alt="Turmeric powder and roots"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#333333] mb-6">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#333333] mb-3">For Farmers</h3>
              <p>
                Register your harvest details, including location, date, and quantity. Each batch receives a unique
                blockchain identifier.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#333333] mb-3">For Processors & Distributors</h3>
              <p>
                Track processing methods, quality checks, and transportation details to maintain the chain of custody.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#333333] mb-3">For Consumers</h3>
              <p>
                Scan product QR codes to verify authenticity and view the complete journey of your turmeric from farm to
                store.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#333333] mb-6">Benefits</h2>

          <ul className="list-disc pl-6 mb-12 space-y-2 text-lg">
            <li>Ensures authenticity and prevents adulteration</li>
            <li>Provides complete transparency across the supply chain</li>
            <li>Helps farmers get fair prices for quality products</li>
            <li>Allows consumers to make informed purchasing decisions</li>
            <li>Reduces fraud and improves food safety</li>
          </ul>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-[#d4a017] text-white font-medium rounded-md hover:bg-[#c29016] transition-colors"
            >
              Join Our Platform
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
