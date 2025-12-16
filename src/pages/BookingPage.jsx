import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-stone-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Choose Your Storage
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Select the storage containers that best fit your needs. Add items to your cart and proceed to booking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
