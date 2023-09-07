"use client";
// import Stripe from "stripe";
import Cookies from "js-cookie";
import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// let productId = await fetch(
//   "https://movieflix-production.up.railway.app/api/v1/product"
// );
// productId = productId.json();
// console.log(productId);

const pay = async (productId) => {
  console.log(process.env.NODE_ENV);
  //---Get productId-----//
  const stripe = await loadStripe(
    "pk_test_51NCAQOFQZuy2dcaHp0V18YhchNNqFoPMblQnZpTw0XcvNcFcVKiqH1ADAOE5RABjz0OuocvkANwdujt3Ht0DpMrI00YdVH8ERC"
  );
  // console.log(stripe);
  try {
    //--Get checkout session from API--//
    let session = await fetch(
      `https://movieflix-ljqx.onrender.com/api/v1/payment/checkout-session/${productId}`,
      {
        headers:
          process.env.NODE_ENV === "development"
            ? {
                Authorization: `Bearer ${Cookies.get("jwt")}`,
              }
            : {},
        credentials: process.env.NODE_ENV === "production" ? "include" : "omit",
        cache: "no-store",
      }
    );

    session = await session.json();
    console.log(session);
    //--REDIRECT TO CHECKOUT--//
    // window.location.href = session.session.url;
    await stripe.redirectToCheckout({
      sessionId: session.session.id,
    });
  } catch (err) {
    alert(err);
  }
};

export default function PayButton() {
  return (
    <button
      onClick={() => pay("64715037449dc85ce00b29c5")}
      className="product-button"
    >
      Mua ngay
    </button>
  );
}
