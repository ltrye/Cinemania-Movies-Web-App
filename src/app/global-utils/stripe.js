"use client";
import Stripe from "stripe";

// let productId = await fetch(
//   "https://movieflix-production.up.railway.app/api/v1/product"
// );
// productId = productId.json();
// console.log(productId);

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmMyZTQ3MWJiMWY3NDBkMDQyMWU0MSIsImlhdCI6MTY4NTI1NDQwNiwiZXhwIjoxNjkwNDM4NDA2fQ.cCJjC5-6hG3HTUB5FkgkOk1PmksokDQphoKk1feHncQ";
const pdheader = new Headers();
pdheader.append("Authorization", `Bearer ${jwt}`);
const pay = async (productId) => {
  //---Get productId-----//
  const stripe = Stripe(
    "pk_test_51NCAQOFQZuy2dcaHp0V18YhchNNqFoPMblQnZpTw0XcvNcFcVKiqH1ADAOE5RABjz0OuocvkANwdujt3Ht0DpMrI00YdVH8ERC"
  );
  console.log(stripe);
  try {
    // 1) Get checkout session from API
    let session = await fetch(
      `https://movieflix-production.up.railway.app/api/v1/payment/checkout-session/${productId}`,
      {
        headers: pdheader,
      }
    );

    session = await session.json();
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.session.id,
    });
  } catch (err) {
    // console.log(err);
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
