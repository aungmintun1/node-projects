const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/userModel');
// const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {

    let currentUser = await User.findById(req.user.id).populate({
      path:'cart.shirt'
    })

    const lineItems = currentUser.cart.map(item => ({
      price_data: {
        currency: 'usd',
        unit_amount:item.shirt.price* 100, // Convert price to cents
        product_data: {
          name:  `${item.shirt.name} - Size: ${item.size}`,
          //images:[`/img/shirts/${item.shirt.photo}`], 
          // Add other product details if necessary, like images or descriptions
          //images have to be on a live website ,and added to stripe server, project is not live yet
        },
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}`,
      cancel_url:`${req.protocol}://${req.get('host')}`,
      customer_email: req.user.email,
      client_reference_id: req.user.id,
      line_items: lineItems,
      mode:'payment',
    });
  
    res.status(200).json({
      status: 'success',
      session
    });

  });