<template>
  <div class="checkout">
    <Navbar></Navbar>
    <!-- <h1>This is an checkout page</h1> -->
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-8">
          <h4 class="py-4 d-flex">Checkout Page</h4>
          <ul>
            <li v-for="item in this.$store.state.cart" class="media">
              <img :src="item.productImage" width="80px" class="align-self-center mr-3" />
              <div class="media-body">
                <h3 class="mt-0 d-flex">{{item.productName}}</h3>
                <span
                  class="float-right del_item"
                  @click="$store.commit('removeFromCart',item)"
                  style="cursor:pointer;"
                >X</span>
                <h4 class="mt-0 d-flex">{{item.productPrice | currency}}</h4>
                <p class="mt-0 d-flex">Quantity : {{item.productQuantity}}</p>
              </div>
              <!-- <div class="mt-5">
                  <h4>Total: {{item.productQuantity}} x {{item.productPrice | currency}}</h4>
              </div>-->
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <p>Total Price : {{ this.$store.getters.totalPrice | currency}}</p>

          <button class="btn btn-primary" @click="pay">Checkout</button>
          <!-- <form action="/charge" method="post" id="payment-form">
            <div class="form-row">
              <label for="card-element">Credit or debit card</label>
          <div id="card-element">-->
          <!-- A Stripe Element will be inserted here. -->
          <!-- </div> -->

          <!-- Used to display form errors. -->
          <!-- <div id="card-errors" role="alert"></div>
            </div>

            <button>Submit Payment</button>
          </form>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Card, createToken } from "vue-stripe-elements-plus";
import axios from "axios";
// const Stripe = require("stripe");
var stripe = Stripe("pk_test_r1ukNyqyCq8ko0o6S2TzEyHT00WOnd8xF3");
export default {
  data() {
    return {
      sessionId: ""
    };
  },

  methods: {
    pay() {
      //data = {id:100,id:100}
      let data = this.$store.state.cart.map(item => ({
        [item.productId]: item.productQuantity
      }));
      data = Object.assign({}, ...data);
      // console.log(data);
      axios
        .get(
          "https://us-central1-vue-shop-ebb44.cloudfunctions.net/CheckoutSession",
          // "http://localhost:5000/vue-shop-ebb44/us-central1/CheckoutSession",
          {
            params: {
              products: data
            }
          }
        )
        .then(response => {
          this.sessionId = response.data;
          console.log(response.data);

          stripe
            .redirectToCheckout({
              // sessionId: "{{CHECKOUT_SESSION_ID}}"
              sessionId: this.sessionId.id
            })
            .then(function(result) {});
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {}
};

// // Create a Stripe client.
// var stripe = Stripe("pk_test_dbcNbOvmNphdIdhrC7c2jsz900Jw8Sp6OI");

// // Create an instance of Elements.
// var elements = stripe.elements();

// // Custom styling can be passed to options when creating an Element.
// // (Note that this demo uses a wider set of styles than the guide below.)
// var style = {
//   base: {
//     color: "#32325d",
//     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//     fontSmoothing: "antialiased",
//     fontSize: "16px",
//     "::placeholder": {
//       color: "#aab7c4"
//     }
//   },
//   invalid: {
//     color: "#fa755a",
//     iconColor: "#fa755a"
//   }
// };

// // Create an instance of the card Element.
// var card = elements.create("card", { style: style });

// // Add an instance of the card Element into the `card-element` <div>.
// card.mount("#card-element");

// // Handle real-time validation errors from the card Element.
// card.addEventListener("change", function(event) {
//   var displayError = document.getElementById("card-errors");
//   if (event.error) {
//     displayError.textContent = event.error.message;
//   } else {
//     displayError.textContent = "";
//   }
// });

// // Handle form submission.
// var form = document.getElementById("payment-form");
// form.addEventListener("submit", function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       // Inform the user if there was an error.
//       var errorElement = document.getElementById("card-errors");
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the token to your server.
//       stripeTokenHandler(result.token);
//     }
//   });
// });

// // Submit the form with the token ID.
// function stripeTokenHandler(token) {
//   // Insert the token ID into the form so it gets submitted to the server
//   var form = document.getElementById("payment-form");
//   var hiddenInput = document.createElement("input");
//   hiddenInput.setAttribute("type", "hidden");
//   hiddenInput.setAttribute("name", "stripeToken");
//   hiddenInput.setAttribute("value", token.id);
//   form.appendChild(hiddenInput);

//   // Submit the form
//   form.submit();
// }
//
</script>
<style scoped lang="scss">
.del_item {
  border: 1px solid black;
  padding: 4px 5px 4px 5px;
}
.del_item:hover {
  color: white;
  background: red;
  transition-duration: 0.5s;
}

/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>