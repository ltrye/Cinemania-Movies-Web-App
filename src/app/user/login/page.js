"use client";
import { Login } from "@/api/AuthAPI";
import Cookies from "js-cookie";
import Link from "next/link";
import { useReducer, useState } from "react";

const formReducer = (state, action) => {
  return {
    ...state,
    [action.field]: action.value,
  };
};

export default function LoginPage() {
  const [isLoad, setLoad] = useState(false);
  const [status, setStatus] = useState({ status: null, message: null });
  const [formState, setFormData] = useReducer(formReducer, {
    email: null,
    password: null,
  });

  function onInputChange(e, name) {
    setFormData({ field: name, value: e.currentTarget.value });
    console.log(formState);
  }

  async function loginButtonClickHandler(e) {
    e.preventDefault();
    setStatus({ status: null, message: null });
    //---USER INPUT----//

    //---REQUEST TO SERVER FOR TOKEN--//
    setLoad(true);
    try {
      const res = await Login({
        email: formState.email,
        password: formState.password,
      });

      setLoad(false);

      //--IF LOGIN SUCCESSFULLY--//
      if (res.status === "success") {
        setStatus({ status: "success", message: "Log in successfully!😎" });
        // if (process.env.NODE_ENV === "development")
        //   // document.cookie = `jwt=${loginStatus.token}; path=/`;

        window.location.href = "/profile";

        //--IF LOGIN FAILED--//
      } else {
        setStatus({ status: "fail", message: res.message });
      }
    } catch (err) {
      alert(err);
    }

    //------------------------------//
  }

  return (
    <>
      <form onSubmit={loginButtonClickHandler}>
        <span className="title login-title">LOGIN</span>
        <section className="login-input-group">
          <input
            onChange={(e) => onInputChange(e, "email")}
            placeholder="Email"
            className="login-input username"
          ></input>

          <input
            onChange={(e) => onInputChange(e, "password")}
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
