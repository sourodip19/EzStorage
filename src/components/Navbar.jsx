import { Package, ShoppingCart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, openAuthModal, logout } = useAuth();
  const { getTotalCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getTotalCount();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-emerald-800" />
            <span className="text-2xl font-bold text-stone-900">EZStorage</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/#home" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">
              Home
            </a>
            <a href="/#features" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">
              Features
            </a>
            <a href="/#about" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">
              About Us
            </a>

            <button 
              onClick={() => navigate('/booking')}
              className="relative text-stone-700 hover:text-emerald-800 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white font-semibold">
                    {user.profilePhoto ? (
                      <img 
                        src={user.profilePhoto} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="text-stone-700 font-medium">Hi, {user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-stone-500 hover:text-stone-700 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={openAuthModal}
                className="bg-emerald-800 text-stone-50 px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors font-medium"
              >
                Sign Up
              </button>
            )}
          </div>

          <button className="md:hidden text-stone-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
