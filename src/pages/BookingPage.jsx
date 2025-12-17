import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Calendar, CreditCard, Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { calculateMonths, getMinEndDate, getTodayDate, formatDate } from '../utils/dateCalculations';

const BookingPage = () => {
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();
  const {
    cartItems,
    startDate,
    endDate,
    paymentOption,
    updateStartDate,
    updateEndDate,
    updatePaymentOption,
    getTotalCount,
    removeFromCart
  } = useCart();

  const [showCart, setShowCart] = useState(false);
  const cartCount = getTotalCount();

  const cartProducts = useMemo(() => {
    return Object.entries(cartItems).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return { ...product, quantity };
    });
  }, [cartItems]);

  const months = calculateMonths(startDate, endDate);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((sum, item) => {
      return sum + (item.price * item.quantity * months);
    }, 0);
  }, [cartProducts, months]);

  const amountToPay = paymentOption === 'half' ? totalPrice / 2 : totalPrice;

  const handleProceedToPayment = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (cartCount === 0) {
      alert('Please add items to your cart');
      return;
    }

    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-stone-100 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {!showCart ? (
          <>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                  Choose Your Storage
                </h1>
                <p className="text-stone-600 text-lg">
                  Select the storage containers that best fit your needs.
                </p>
              </div>
              {cartCount > 0 && (
                <button
                  onClick={() => setShowCart(true)}
                  className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>View Cart ({cartCount})</span>
                </button>
              )}
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
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900">
                Your Cart
              </h1>
              <button
                onClick={() => setShowCart(false)}
                className="text-emerald-700 font-semibold hover:text-emerald-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-20 h-20 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-600 text-xl mb-6">Your cart is empty</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cartProducts.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-6 flex items-center space-x-6"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-stone-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-stone-600 text-sm mb-2">
                          ${item.price}/month × {item.quantity} × {months} months
                        </p>
                        <p className="text-emerald-700 font-bold text-lg">
                          ${(item.price * item.quantity * months).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          for (let i = 0; i < item.quantity; i++) {
                            removeFromCart(item.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-600 transition-colors"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="w-5 h-5 text-emerald-700" />
                      <h3 className="text-lg font-bold text-stone-900">
                        Storage Duration
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          min={getTodayDate()}
                          onChange={(e) => updateStartDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          End Date (Min: 1 month)
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          min={getMinEndDate(startDate)}
                          onChange={(e) => updateEndDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        />
                      </div>

                      <div className="bg-emerald-50 rounded-lg p-4">
                        <p className="text-sm text-stone-700 mb-1">
                          <span className="font-semibold">From:</span> {formatDate(startDate)}
                        </p>
                        <p className="text-sm text-stone-700 mb-2">
                          <span className="font-semibold">To:</span> {formatDate(endDate)}
                        </p>
                        <p className="text-lg font-bold text-emerald-700">
                          Duration: {months} {months === 1 ? 'month' : 'months'}
                        </p>
                        <p className="text-xs text-stone-500 mt-2">
                          Days beyond 7 after full months count as an additional month
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="w-5 h-5 text-emerald-700" />
                      <h3 className="text-lg font-bold text-stone-900">
                        Payment Summary
                      </h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-stone-700">
                        <span>Subtotal</span>
                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Payment Option
                        </label>
                        <select
                          value={paymentOption}
                          onChange={(e) => updatePaymentOption(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        >
                          <option value="full">Full Payment</option>
                          <option value="half">Half Payment (50%)</option>
                        </select>
                      </div>

                      <div className="border-t pt-3">
                        <div className="flex justify-between text-xl font-bold text-stone-900">
                          <span>Amount to Pay</span>
                          <span className="text-emerald-700">${amountToPay.toFixed(2)}</span>
                        </div>
                        {paymentOption === 'half' && (
                          <p className="text-sm text-stone-500 mt-2">
                            Remaining: ${(totalPrice / 2).toFixed(2)} to be paid later
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToPayment}
                      className="w-full bg-emerald-700 text-white py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
