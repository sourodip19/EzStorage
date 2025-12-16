import { Package } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-emerald-800" />
            <span className="text-2xl font-bold text-stone-900">EZStorage</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">
              Home
            </a>
            <a href="#features" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="text-stone-700 hover:text-emerald-800 transition-colors font-medium">
              About Us
            </a>
            <button className="bg-emerald-800 text-stone-50 px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors font-medium">
              Sign Up
            </button>
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
