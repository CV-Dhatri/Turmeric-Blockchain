import Link from "next/link"
import { Hexagon } from "lucide-react"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
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

      {/* Authentication Form */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#333333] mb-4">User Authentication</h1>
          <p className="text-xl text-center text-[#333333] mb-8">Login or register to continue</p>

          <LoginForm />
        </div>
      </main>
    </div>
  )
}
