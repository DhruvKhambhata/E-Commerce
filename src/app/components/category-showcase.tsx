import Image from "next/image"
import Link from "next/link"

export function CategoryShowcase() {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/category/tshirts" className="group relative overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="T-Shirts Category"
              width={600}
              height={400}
              className="object-cover w-full h-[300px] transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">T-Shirts</h3>
            </div>
          </Link>
          <Link href="/category/mugs" className="group relative overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Mugs Category"
              width={600}
              height={400}
              className="object-cover w-full h-[300px] transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Mugs</h3>
            </div>
          </Link>
          <Link href="/category/jewelry" className="group relative overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Jewelry Category"
              width={600}
              height={400}
              className="object-cover w-full h-[300px] transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">Jewelry</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

