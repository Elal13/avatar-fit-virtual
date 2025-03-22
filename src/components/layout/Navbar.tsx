
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Tienda', path: '/shop' },
    { name: 'Avatar', path: '/avatar' },
    { name: 'Armario', path: '/closet' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="font-display text-2xl font-bold text-avatar-900 mr-10"
            onClick={closeMobileMenu}
          >
            AVATAR
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-avatar-600'
                      : 'text-gray-700 hover:text-avatar-500'
                  } after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-avatar-500 after:transition-all after:duration-300 after:ease-in-out ${
                    isActive(item.path) ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-avatar-500 hover:bg-avatar-50 rounded-full"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-avatar-500 hover:bg-avatar-50 rounded-full"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-avatar-500 hover:bg-avatar-50 rounded-full relative"
            aria-label="Cart"
            asChild
          >
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-avatar-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                2
              </span>
            </Link>
          </Button>
          <Button asChild className="bg-avatar-600 hover:bg-avatar-700 rounded-lg ml-4">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-avatar-500 hover:bg-avatar-50 rounded-full relative mr-2"
            aria-label="Cart"
            asChild
          >
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-avatar-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                2
              </span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:bg-avatar-50"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-24 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xl font-medium ${
                  isActive(item.path) ? 'text-avatar-600' : 'text-gray-700'
                }`}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-gray-100">
              <Button
                className="w-full bg-avatar-600 hover:bg-avatar-700 justify-center"
                asChild
              >
                <Link to="/login" onClick={closeMobileMenu}>
                  Iniciar Sesión
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full mt-4 border-avatar-600 text-avatar-600 hover:bg-avatar-50 justify-center"
                asChild
              >
                <Link to="/signup" onClick={closeMobileMenu}>
                  Registrarse
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
