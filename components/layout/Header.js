import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';

let NAV_ITEMS = [];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      NAV_ITEMS = [
        { label: 'Accueil', href: '/' },
        { label: 'Vendre une voiture', href: '/voitures/ventes/publish' },
        { label: 'Louer une voiture', href: '#' },
        { label: 'Mon parking', href: '/voitures/parking' },
        { label: 'Rechercher une annonce', href: '/voitures/ventes/search' },
        { label: 'Louer', href: '#' },
      ];
    } else {
      NAV_ITEMS = [
        { label: 'Accueil', href: '/' },
        { label: 'Publier une Annonce', href: '/annonces' },
        { label: 'Voiture à Vendre', href: '/voitures/ventes/search' },
        { label: 'Voiture à Louer', href: '/locationvoiture' },
        { label: 'Inscription', href: '/register' },
      ];
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="flex items-center">
                <img src="/auto.png" alt="Auto 221" className="h-12 w-auto" />
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 ml-10">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href}>
                <a className="text-gray-600 hover:text-primary font-medium transition-colors">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right side - Login button */}
          <div className="hidden md:block">
            <Link href="/login">
              <a className="text-gray-600 hover:text-primary font-medium">
                Se Connecter
              </a>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href}>
                <a
                  className="block text-gray-600 hover:text-primary font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Link href="/login">
              <a className="block text-gray-600 hover:text-primary font-medium">
                Se Connecter
              </a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
