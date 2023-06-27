import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const checkout = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: '{{PRICE_ID}}', // Replace with the actual Price ID of your product
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${URL}?success=true`,
      cancel_url: `${URL}?canceled=true`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    res.redirect(303, cancel_url);
  }
};
