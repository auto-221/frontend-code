import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const NAV_PUBLIC = [
  { label: 'Accueil', href: '/' },
  { label: 'Voitures à vendre', href: '/voitures/ventes/search' },
  { label: 'Voiture à louer', href: '/locationvoiture' },
];

const NAV_AUTH = [
  { label: 'Accueil', href: '/' },
  { label: 'Voitures à vendre', href: '/voitures/ventes/search' },
  { label: 'Mes annonces', href: '/voitures/parking' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, [router.pathname]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('parkingInfo');
    setUser(null);
    router.push('/');
  };

  const navItems = user ? NAV_AUTH : NAV_PUBLIC;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/">
            <a className="flex items-center flex-shrink-0">
              <img src="/auto.png" alt="Auto 221" className="h-10 w-auto" />
            </a>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <a className={`text-sm font-medium transition-colors ${router.pathname === item.href ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/annonces">
                  <a className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    <FaPlus size={12} /> Publier
                  </a>
                </Link>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUserCircle size={20} className="text-gray-400" />
                  <span className="text-sm font-medium max-w-[120px] truncate">{user.username}</span>
                </div>
                <button onClick={logout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <FaSignOutAlt size={14} /> Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Se connecter</a>
                </Link>
                <Link href="/register">
                  <a className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    S'inscrire
                  </a>
                </Link>
              </>
            )}
          </div>

          {/* Burger mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 p-2">
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <a className="block text-sm font-medium text-gray-700 hover:text-primary py-1" onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-3 space-y-3">
            {user ? (
              <>
                <Link href="/annonces">
                  <a className="block w-full text-center bg-primary text-white font-semibold py-2 rounded-lg text-sm" onClick={() => setIsOpen(false)}>
                    + Publier une annonce
                  </a>
                </Link>
                <p className="text-sm text-gray-500">Connecté : <strong>{user.username}</strong></p>
                <button onClick={logout} className="text-sm text-red-500 font-medium">Se déconnecter</button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="block text-center border border-primary text-primary font-semibold py-2 rounded-lg text-sm" onClick={() => setIsOpen(false)}>
                    Se connecter
                  </a>
                </Link>
                <Link href="/register">
                  <a className="block text-center bg-primary text-white font-semibold py-2 rounded-lg text-sm" onClick={() => setIsOpen(false)}>
                    S'inscrire
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
