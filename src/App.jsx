import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import FeatureSection from './sections/FeatureSection';
import ReviewSection from './sections/ReviewSection';
import FooterSection from './sections/FooterSection';

function App() {
  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ReviewSection />
      <FooterSection />
    </div>
  );
}

export default App;
