// import Link from 'next/link'
// import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white pt-12 pb-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold">ShopEase</h3>
//             <p className="text-gray-300 text-sm">
//               Your one-stop shop for quality products at affordable prices. We&apos;re committed to providing an exceptional shopping experience.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-300 hover:text-white transition">
//                 <Facebook size={20} />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-white transition">
//                 <Instagram size={20} />
//               </a>
//             </div>
//           </div>
          
//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="/" className="text-gray-300 hover:text-white transition text-sm">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/products" className="text-gray-300 hover:text-white transition text-sm">
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/cart" className="text-gray-300 hover:text-white transition text-sm">
//                   Cart
//                 </Link>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white transition text-sm">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white transition text-sm">
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>
          
//           {/* Customer Service */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Customer Service</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white transition text-sm">
//                   FAQ
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white transition text-sm">
//                   Shipping Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white transition text-sm">
//                   Returns & Exchanges
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white transition text-sm">
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-white transition text-sm">
//                   Terms & Conditions
//                 </a>
//               </li>
//             </ul>
//           </div>
          
//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start">
//                 <MapPin size={18} className="mr-2 text-gray-400 mt-1" />
//                 <span className="text-gray-300 text-sm">
//                   123 Shop Street, City State, 12345
//                 </span>
//               </li>
//               <li className="flex items-center">
//                 <Phone size={18} className="mr-2 text-gray-400" />
//                 <span className="text-gray-300 text-sm">(123) 456-7890</span>
//               </li>
//               <li className="flex items-center">
//                 <Mail size={18} className="mr-2 text-gray-400" />
//                 <span className="text-gray-300 text-sm">support@shopease.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
//           <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, CreditCard, ShieldCheck, Truck } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-200 pb-12">
          <div className="flex items-center justify-center md:justify-start">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $100</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure payment</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Money Back Guarantee</h3>
              <p className="text-sm text-gray-600">30 day returns policy</p>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">ShopNext</h3>
            <p className="text-gray-600 mb-4">
              Quality products for every need. Discover the best deals on our online store.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Electronics" className="text-gray-600 hover:text-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="text-gray-600 hover:text-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=Home" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-primary">
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {currentYear} ShopNext. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-4">
            <Link href="#" className="text-gray-600 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-primary text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer