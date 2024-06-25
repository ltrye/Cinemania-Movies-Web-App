"use client";
// import Stripe from "stripe";
import Cookies from "js-cookie";
import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import checkLogin from "./checkLogin";
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
      `${process.env.BACKEND}payment/checkout-session/${productId}`,
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

    //--REDIRECT TO CHECKOUT--//
    await stripe.redirectToCheckout({
      sessionId: session.session.id,
    });
  } catch (err) {
    alert(err);
  }
};

export default function PayButton() {
  const [isLogged, setIsLogged] = useState({ status: undefined });
  useEffect(() => {
    //--FETCH USER DATA IF JWT VALID--//
    async function checkUserExist() {
      if (process.env.NODE_ENV === "development" && !Cookies.get("jwt"))
        return setIsLogged({ status: "fail" });
      const currentUser = await checkLogin();

      if (currentUser.status === "fail") setIsLogged({ status: "fail" });
      else if (currentUser.status === "success")
        setIsLogged({
          status: "success",
          id: currentUser.data._id,
          name: currentUser.data.name,
          photo: currentUser.data.photo,
          email: currentUser.data.email,
          premium: currentUser.data.premium,
          premiumExpires: currentUser.data.premium
            ? currentUser.data.premiumExpires
            : null,
        });
    }
    checkUserExist();
  }, []);
  return (
    <button
      onClick={() => {
        if (isLogged.status !== "success")
          return (window.location.href = "/user/login");
        pay("64715037449dc85ce00b29c5");
      }}
      className="product-button"
    >
      Mua ngay
    </button>
  );
}
