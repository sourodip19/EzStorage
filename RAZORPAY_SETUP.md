# Razorpay Integration Setup Guide

Your EZStorage application now includes a complete booking and payment system with Razorpay integration. Follow these steps to complete the setup.

## Features Implemented

1. **Cart System with Date Selection**
   - Start and end date pickers with 1-month minimum
   - Smart month calculation with 7-day rule
   - Real-time price calculation
   - Payment option selection (Full or Half payment)

2. **Database Integration**
   - Orders and order items tables created in Supabase
   - Row Level Security enabled for data protection
   - Automatic order tracking

3. **Razorpay Payment Integration**
   - Secure payment processing
   - Order creation and verification
   - Payment status tracking

## Setup Instructions

### Step 1: Get Your Razorpay Credentials

1. Create a Razorpay account at [https://razorpay.com](https://razorpay.com)
2. Log in to your Razorpay Dashboard
3. Navigate to **Settings** > **API Keys**
4. Copy your **Key ID** (starts with `rzp_test_` or `rzp_live_`)

### Step 2: Configure Environment Variables

Open your `.env` file and replace the placeholder:

```
VITE_RAZORPAY_KEY_ID=your_actual_razorpay_key_id
```

Example:
```
VITE_RAZORPAY_KEY_ID=rzp_test_abc123xyz456
```

### Step 3: Test the Payment Flow

1. Start your application
2. Sign up or log in (Supabase authentication is integrated)
3. Add items to your cart
4. Select start and end dates
5. Choose payment option (Full or Half)
6. Click "Proceed to Payment"
7. Complete the test payment using Razorpay test cards

## Razorpay Test Cards

Use these test cards in test mode:

- **Success:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date

## How the System Works

### Date Calculation Rule

The system calculates storage duration using a special 7-day rule:
- If the remaining days after full months are 7 or fewer: No additional charge
- If the remaining days exceed 7: Counts as one additional month

**Examples:**
- 3 months + 7 days = 3 months (charged for 3 months)
- 3 months + 8 days = 4 months (charged for 4 months)

### Payment Options

1. **Full Payment**: Pay 100% upfront
2. **Half Payment**: Pay 50% now, remaining 50% later

### Price Calculation

```
Total Price = (Product Price × Quantity × Number of Months)
```

For multiple products, all items are calculated and summed together.

## Database Schema

### Orders Table
- Stores booking information
- Tracks payment status
- Links to authenticated users

### Order Items Table
- Stores individual products in each order
- Tracks quantity and pricing at time of order

## Security Features

- Row Level Security (RLS) on all database tables
- Users can only view and manage their own orders
- Secure payment processing through Razorpay
- Authentication required for all booking operations

## Troubleshooting

### Payment not working
- Check that your Razorpay Key ID is correct in `.env`
- Ensure you're using test mode credentials for testing
- Check browser console for any errors

### Database errors
- Verify Supabase connection in `.env`
- Check that migrations have been applied
- Ensure RLS policies are active

### Authentication issues
- Clear browser cache and cookies
- Check Supabase authentication settings
- Verify email confirmation is disabled in Supabase (default)

## Next Steps

Once you've tested with test credentials and everything works:

1. Switch to Razorpay live mode credentials
2. Update the Razorpay Key ID in your environment variables
3. Test with real payment methods
4. Monitor orders in your Supabase dashboard

## Support

For Razorpay-specific issues:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

For Supabase issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Support](https://supabase.com/support)
