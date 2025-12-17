import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import { calculateMonths } from '../utils/dateCalculations';
import { supabase } from '../lib/supabase';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    startDate,
    endDate,
    paymentOption,
    getTotalCount,
    clearCart
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  useEffect(() => {
    if (!user) {
      navigate('/booking');
      return;
    }

    if (getTotalCount() === 0) {
      navigate('/booking');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user, navigate, getTotalCount]);

  const createOrder = async () => {
    try {
      const orderData = {
        user_id: user.id,
        start_date: startDate,
        end_date: endDate,
        months: months,
        total_price: totalPrice,
        payment_option: paymentOption,
        amount_to_pay: amountToPay,
        payment_status: 'pending'
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .maybeSingle();

      if (orderError) throw orderError;

      const orderItems = cartProducts.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity * months
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    } catch (err) {
      console.error('Order creation error:', err);
      throw err;
    }
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      setError('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const order = await createOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(amountToPay * 100),
        currency: 'INR',
        name: 'EZStorage',
        description: `Storage booking for ${months} ${months === 1 ? 'month' : 'months'}`,
        order_id: order.razorpay_order_id,
        handler: async function (response) {
          try {
            const { error: updateError } = await supabase
              .from('orders')
              .update({
                payment_status: 'completed',
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id
              })
              .eq('id', order.id);

            if (updateError) throw updateError;

            setPaymentSuccess(true);
            clearCart();
            setTimeout(() => {
              navigate('/');
            }, 3000);
          } catch (err) {
            console.error('Payment verification error:', err);
            setError('Payment completed but verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: {
          color: '#15803d'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (err) {
      console.error('Payment initiation error:', err);
      setError('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-stone-100 pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-stone-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-stone-600 text-lg mb-6">
              Your storage booking has been confirmed. You will be redirected to the home page shortly.
            </p>
            <div className="flex items-center justify-center space-x-2 text-stone-500">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/booking')}
          className="flex items-center space-x-2 text-emerald-700 font-semibold hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8">
          Complete Your Payment
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                {cartProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-stone-700 pb-3 border-b border-stone-200 last:border-0"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-stone-500">
                        Qty: {item.quantity} × {months} {months === 1 ? 'month' : 'months'}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity * months).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Storage Details</h2>
              <div className="space-y-2 text-stone-700">
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span className="font-semibold">{startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span className="font-semibold">{endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">
                    {months} {months === 1 ? 'month' : 'months'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="text-xl font-bold text-stone-900 mb-4">Payment Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-stone-700">
                  <span>Total Price:</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Payment Option:</span>
                  <span className="font-semibold">
                    {paymentOption === 'full' ? 'Full Payment' : 'Half Payment (50%)'}
                  </span>
                </div>
                {paymentOption === 'half' && (
                  <div className="flex justify-between text-stone-500 text-sm">
                    <span>Remaining Amount:</span>
                    <span>${(totalPrice / 2).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-2xl font-bold text-stone-900">
                    <span>Amount to Pay:</span>
                    <span className="text-emerald-700">${amountToPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-emerald-700 text-white py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Pay ${amountToPay.toFixed(2)} with Razorpay</span>
              )}
            </button>

            <p className="text-center text-sm text-stone-500">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
