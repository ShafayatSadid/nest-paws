import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary dark:bg-secondary/90 text-cream dark:text-cream/90 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-cream/10 dark:border-cream/5">
          {/* Brand & Description */}
          <div>
            <h3 className="font-heading text-2xl font-extrabold mb-2">
              Nest<span className="text-primary">Paws</span>
            </h3>
            <p className="font-body text-sm text-cream/70 dark:text-cream/60 max-w-xs">
              Find your furry friend today. Adopt, love, and give a forever
              home to pets in need.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-3 text-primary">
              Contact Us
            </h4>
            <ul className="space-y-2 font-body text-sm">
              <li className="flex items-start gap-2">
                <HiLocationMarker className="text-primary text-lg mt-0.5" />
                <span>123 Gulshan Avenue, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <HiPhone className="text-primary text-lg" />
                <span>+880 1712-345678</span>
              </li>
              <li className="flex items-center gap-2">
                <HiMail className="text-primary text-lg" />
                <span>support@nestpaws.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-3 text-primary">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-primary/20 flex items-center justify-center transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-primary/20 flex items-center justify-center transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-primary/20 flex items-center justify-center transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-primary/20 flex items-center justify-center transition duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xl" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 text-center font-body text-sm text-cream/60 dark:text-cream/50">
          &copy; {currentYear} Nest Paws. All rights reserved.
        </div>
      </div>
    </footer>
  );
}