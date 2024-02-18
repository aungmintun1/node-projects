/* eslint-disable */
import axios from 'axios';
const stripe = Stripe('pk_test_51OkouIJ4pPgw30DxgN8tgYwaYgMotVCdDNnyFdSKagZtuSyeZQ3hE6bOm6vRWqtJt5WLBv3cPV0nhZRK8NQ1MO7600nAH4nQyD');

export const bookShirt = async () => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:8000/bookings/checkout-session`
    );
   
    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
  }
};



// this function redirects the uesr to the checkout page and intiates the request through axios