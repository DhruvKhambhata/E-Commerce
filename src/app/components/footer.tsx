import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/tshirts">T-Shirts</Link></li>
              <li><Link href="/category/mugs">Mugs</Link></li>
              <li><Link href="/category/jewelry">Jewelry</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shipping">Shipping</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>© 2024 StyleHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

