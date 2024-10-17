"use client";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [isLoad, setLoad] = useState(false);
  const [status, setStatus] = useState({ status: null, message: null });

  return (
    <>
      <form onSubmit={(e) => Signing(e, setLoad, setStatus)}>
        <span className="title login-title">SIGN UP</span>
        <section className="login-input-group">
          <input placeholder="Name" className="login-input username"></input>
          <input placeholder="Email" className="login-input username"></input>

          <input
            type="password"
            placeholder="Password"
            className="login-input password"
          ></input>
          <input
            type="password"
            placeholder="Confirm password"
            className="login-input password"
          ></input>
        </section>

        <button
          disabled={isLoad && true}
          className="login-submit"
          type="submit"
        >
          Sign up
        </button>

        {isLoad && <div className="login-loading">Fetching...</div>}
        {status.status && (
          <div
            className={`useFont login-loading ${
              status.status === "fail" ? "fail" : "sucess"
            }`}
          >
            {status.message}
          </div>
        )}
        <Link href="/user/login">
          <span className="useFont login-option">Already have an account?</span>
        </Link>
      </form>
    </>
  );
}

async function Signing(e, setLoad, setStatus) {
  e.preventDefault();
  setStatus({ status: null, message: null });
  //---USER INPUT----//
  const account = {
    name: e.currentTarget.children[1].children[0].value,
    email: e.currentTarget.children[1].children[1].value,
    password: e.currentTarget.children[1].children[2].value,
    passwordConfirm: e.currentTarget.children[1].children[3].value,
  };

  //---REQUEST TO SERVER FOR TOKEN--//
  setLoad(true);
  try {
    const req = await fetch(
      "https:///movieflix-ljqx.onrender.com/api/v1/user/signup",
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify(account),
      }
    );
    const loginStatus = await req.json();
    setLoad(false);

    //--IF LOGIN SUCCESSFULLY--//
    if (loginStatus.status === "success") {
      setStatus({ status: "success", message: "Sign up successfully!😎" });

      window.location.href = "/user/login";
    } else {
      //--IF LOGIN FAIL--------//
      setStatus({ status: "fail", message: loginStatus.message });
    }
  } catch (err) {
    alert(err);
  }

  //------------------------------//
}
