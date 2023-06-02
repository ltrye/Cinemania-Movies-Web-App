"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLoad, setLoad] = useState(false);
  const [status, setStatus] = useState({ status: null, message: null });

  return (
    <>
      <form onSubmit={(e) => Logging(e, setLoad, setStatus)}>
        <span className="title login-title">LOGIN</span>
        <section className="login-input-group">
          <input placeholder="Email" className="login-input username"></input>

          <input
            type="password"
            placeholder="Password"
            className="login-input password"
          ></input>
        </section>

        <button
          disabled={isLoad && true}
          className="login-submit"
          type="submit"
        >
          LOG IN
        </button>

        {isLoad && <div className="login-loading">Fetching...</div>}
        {status.status && (
          <div
            className={`login-loading ${
              status.status === "fail" ? "fail" : "sucess"
            }`}
          >
            {status.message}
          </div>
        )}

        <Link href="/user/signup">
          <span className="useFont login-option">Create new account</span>
        </Link>
        <Link href="/user/reauth">
          <span className="useFont login-option">Forget your password?</span>
        </Link>
      </form>
    </>
  );
}

async function Logging(e, setLoad, setStatus) {
  e.preventDefault();
  setStatus({ status: null, message: null });
  //---USER INPUT----//
  console.log("fetch");
  const account = {
    email: e.currentTarget.children[1].children[0].value,
    password: e.currentTarget.children[1].children[1].value,
  };

  //---REQUEST TO SERVER FOR TOKEN--//
  setLoad(true);
  try {
    const req = await fetch(
      "https://movieflix-production.up.railway.app/api/v1/user/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials:
          process.env.NODE_ENV === "development" ? "omit" : "include",
        method: "POST",
        body: JSON.stringify(account),
      }
    );
    const loginStatus = await req.json();
    setLoad(false);

    //--IF LOGIN SUCCESSFULLY--//
    if (loginStatus.status === "success") {
      setStatus({ status: "success", message: "Log in successfully!😎" });
      if (process.env.NODE_ENV === "development")
        document.cookie = `jwt=${loginStatus.token}; path=/`;

      window.location.href = "/profile";

      //--IF LOGIN FAILED--//
    } else {
      setStatus({ status: "fail", message: loginStatus.message });
    }
  } catch (err) {
    alert(err);
  }

  //------------------------------//
}
