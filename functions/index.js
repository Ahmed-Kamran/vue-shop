const functions = require('firebase-functions');
var stripe = require('stripe')('sk_test_qVEhLnftslEW8bq2KEmHM7WR00ryT3a06v');
const cors = require('cors')({
    origin: true
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

// exports.Hello = functions.https.onRequest((request, response) => {
//     // response.send("Hello: " + request.query.lastName);
//     if (request.method == 'POST') {
//         response.send("Hello: " + request.query.lastName)
//     } else {
//         response.send("Please Send Post Request");
//     }
// });

exports.CheckoutSession = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        stripe.checkout.sessions.create({
                success_url: 'https://example.com/success',
                cancel_url: 'https://example.com/cancel',
                payment_method_types: ['card'],
                line_items: [{
                    name: 'T-shirt',
                    description: 'Comfortable cotton t-shirt',
                    amount: 1500,
                    currency: 'usd',
                    quantity: 2,
                }, ],
            },

            function(err, session) {
                // asynchronously called
                response.send(session);
            }
        );
    });

});