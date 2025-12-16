import { Map, Calculator, PawPrint, FileText, Award, Package2 } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const FeatureSection = () => {
  return (
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
  );
};

export default FeatureSection;
