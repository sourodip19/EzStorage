import { Briefcase, Package2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute right-0 top-0 w-2/5 h-full bg-emerald-800 rounded-bl-[200px]"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl md:text-7xl font-serif mb-8">
              <span className="text-stone-800 block mb-2">Welcome To</span>
              <span className="text-stone-900 font-bold">EZStorage</span>
            </h1>
            <button 
              onClick={() => navigate('/booking')}
              className="bg-emerald-700 text-stone-50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg"
            >
              Book Now
            </button>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative">
              <Briefcase className="w-64 h-64 text-emerald-900/20" strokeWidth={1} />
              <Package2 className="w-48 h-48 text-amber-700/30 absolute -top-8 -right-8" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
