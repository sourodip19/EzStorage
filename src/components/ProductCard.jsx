import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, name, description, price, image }) => {
  const { getItemCount, addToCart, removeFromCart } = useCart();
  const count = getItemCount(id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-3 right-3">
          {count === 0 ? (
            <button
              onClick={() => addToCart(id)}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
              aria-label={`Add ${name} to cart`}
            >
              <Plus className="w-5 h-5 text-stone-700" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 bg-white rounded-full shadow-lg px-2 py-1">
              <button
                onClick={() => removeFromCart(id)}
                className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                aria-label="Remove one"
              >
                <Minus className="w-4 h-4 text-red-600" />
              </button>
              <span className="text-stone-800 font-semibold min-w-[20px] text-center">{count}</span>
              <button
                onClick={() => addToCart(id)}
                className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-200 transition-colors"
                aria-label="Add one more"
              >
                <Plus className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-stone-900 mb-2">{name}</h3>
        <p className="text-stone-600 text-sm mb-3 line-clamp-2">{description}</p>
        <p className="text-emerald-700 text-xl font-bold">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
