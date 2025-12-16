import { Package } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="bg-stone-800 text-stone-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Package className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold text-white">EZStorage.</span>
            </div>
            <p className="text-stone-400 mb-6 leading-relaxed">
              Your trusted partner for secure and convenient storage solutions. 
              We make storing your belongings easy, safe, and accessible.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-stone-400 hover:text-emerald-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-stone-400 hover:text-emerald-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#features" className="text-stone-400 hover:text-emerald-500 transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-stone-400 hover:text-emerald-500 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="text-stone-400">+91 9876543210</li>
              <li>
                <a href="mailto:contact@ezstorage.com" className="text-stone-400 hover:text-emerald-500 transition-colors">
                  contact@ezstorage.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 pt-8">
          <p className="text-center text-stone-500">
            Copyright 2025 &copy; EZStorage.com - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
