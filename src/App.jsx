import { useState } from 'react';
import { Map, Calculator, PawPrint, FileText, Award, Package2, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import Navbar from './components/Navbar';
import FeatureCard from './components/FeatureCard';

function App() {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      name: "Archana Roy",
      text: "EZStorage made my moving experience so much easier! The live map feature helped me find the perfect storage location, and the price estimator was spot-on. Highly recommend their services for anyone looking for reliable storage solutions.",
      rating: 5
    },
    {
      name: "Michael Chen",
      text: "I've been using EZStorage for over a year now, and their pet sitting service is a game-changer. Knowing my belongings and my pets are taken care of gives me incredible peace of mind. The reward system is also a nice bonus!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      text: "The fragile item care at EZStorage is exceptional. They handled my antique furniture with utmost care. The digital agreement process was smooth, and their customer service is top-notch. Worth every penny!",
      rating: 5
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />

      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute right-0 top-0 w-2/5 h-full bg-emerald-800 rounded-bl-[200px]"></div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl font-serif mb-8">
                <span className="text-stone-800 block mb-2">Welcome To</span>
                <span className="text-stone-900 font-bold">EZStorage</span>
              </h1>
              <button className="bg-emerald-700 text-stone-50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg">
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

      <section id="features" className="py-20 px-6 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="Live Map" icon={Map} />
            <FeatureCard title="Price Estimator" icon={Calculator} />
            <FeatureCard title="Pet Sitter" icon={PawPrint} />
            <FeatureCard title="E-Agreement" icon={FileText} />
            <FeatureCard title="Reward System" icon={Award} />
            <FeatureCard title="Fragile Item's Care" icon={Package2} />
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6 bg-stone-100 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-2/5 h-3/4 bg-emerald-800 rounded-tr-[200px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-16 text-stone-900">REVIEWS</h2>

          <div className="max-w-2xl mx-auto">
            <div className="bg-stone-200/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
              <div className="flex items-start space-x-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-stone-900">{reviews[currentReview].name}</h3>
                    <div className="flex space-x-1">
                      {[...Array(reviews[currentReview].rating)].map((_, i) => (
                        <span key={i} className="text-amber-500 text-xl">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-stone-700 text-lg leading-relaxed">{reviews[currentReview].text}</p>
                </div>

                <div className="w-16 h-16 rounded-full bg-emerald-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {reviews[currentReview].name.charAt(0)}
                </div>
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={prevReview}
                  className="bg-emerald-800 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextReview}
                  className="bg-emerald-800 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-center space-x-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentReview ? 'bg-emerald-800' : 'bg-stone-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-emerald-900 text-stone-100 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">© 2024 EZStorage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
