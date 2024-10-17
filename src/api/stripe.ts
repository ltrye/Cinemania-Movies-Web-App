"use client";
// import Stripe from "stripe";
import Cookies from "js-cookie";
import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import getUserInfo from "./checkLogin";
import { BACKEND } from "@/constant/AppConstant";

const pay = async (productId) => {
  //---Get productId-----//
  const stripe = await loadStripe(
    "pk_test_51NCAQOFQZuy2dcaHp0V18YhchNNqFoPMblQnZpTw0XcvNcFcVKiqH1ADAOE5RABjz0OuocvkANwdujt3Ht0DpMrI00YdVH8ERC"
  );
  // console.log(stripe);
  try {
    //--Get checkout session from API--//
    let res = await fetch(`${BACKEND}/payment/checkout-session/${productId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    res = await res.json();
    //--REDIRECT TO CHECKOUT--//
    await stripe.redirectToCheckout({
      sessionId: res.session.id,
    });
  } catch (err) {
    alert(err);
  }
};

export default function PayButton() {
  return (
    <button
      onClick={() => {
        pay("64715037449dc85ce00b29c5");
      }}
      className="product-button text-black rounded-md"
    >
      Mua ngay
    </button>
  );
}
