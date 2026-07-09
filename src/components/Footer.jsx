import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  // ফুটারের লিঙ্কগুলোর ডাটা অবজেক্ট (সহজে মেইনটেইন করার জন্য)
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Dashboard", href: "#" },
        { label: "Updates", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, href: "https://www.facebook.com/lokman.hossen.697687", label: "Facebook" },
    { icon: <FaTwitter size={16} />, href: "#", label: "Twitter" },
    { icon: <FaLinkedinIn size={16} />, href: "https://www.linkedin.com/in/lokman-hossen-dev", label: "LinkedIn" },
    { icon: <FaGithub size={16} />, href: "https://github.com/lokman1313", label: "GitHub" },
  ];

  return (
    <footer className="w-full border-t border-separator bg-background text-gray-600 dark:text-gray-400">
      <div className="mx-auto px-6 py-12 md:py-16">
        

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5">

          <div className="md:col-span-2 flex flex-col gap-4">
            <p className="font-bold text-xl text-black dark:text-white select-none">
              Knowledge<span className="text-orange-500">Hub</span>
            </p>
            <p className="text-sm max-w-sm leading-relaxed">
              Your trusted platform for growth in knowledge and skills. We strive to make information and technology simple for everyone.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h3 className="font-semibold text-sm text-black dark:text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* কপিরাইট টেক্সট */}
          <p className="text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Knowledge<span className="text-orange-500 font-medium">Hub</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-500 dark:bg-zinc-800 dark:hover:bg-orange-500 text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all duration-300 active:scale-95"
              >
                {social.icon}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}