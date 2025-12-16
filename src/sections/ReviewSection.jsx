import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '../data/reviews';

const ReviewSection = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
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
                      <span key={i} className="text-amber-500 text-xl">&#9733;</span>
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
  );
};

export default ReviewSection;
