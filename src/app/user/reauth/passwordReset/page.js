"use client";
import Link from "next/link";
import { useState } from "react";

export default function PassChange({ params }) {
  const [isLoad, setLoad] = useState(false);
  const [status, setStatus] = useState({ status: null, message: null });

  return (
    <>
      <form onSubmit={(e) => updatePassword(e, setLoad, setStatus)}>
        <span className="title login-title">PASSWORD RECOVERY</span>
        <section className="login-input-group">
          <input
            placeholder="Password"
            className="login-input username"
          ></input>
          <input
            placeholder="ConfirmPassword"
            className="login-input username"
          ></input>
        </section>

        <button className="login-submit" type="submit">
          Send verification
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
        <Link href="user/login">
          <span className="useFont login-option">Back to login</span>
        </Link>
      </form>
    </>
  );
}

async function updatePassword(e, setLoad, setStatus, token) {
  e.preventDefault();
  setStatus({ status: null, message: null });
  //---USER INPUT----//
  console.log(e.currentTarget);
  const account = {
    password: e.currentTarget.children[1].children[0].value,
    passwordConfirm: e.currentTarget.children[1].children[1].value,
  };

  //---REQUEST TO SERVER FOR TOKEN--//
  setLoad(true);
  try {
    const req = await fetch(
      `https://movieflix-production.up.railway.app/resetPassword/${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(account),
      }
    );
    const loginStatus = await req.json();
    setLoad(false);

    //--IF LOGIN SUCCESSFULLY--//
    if (loginStatus.status === "success") {
      setStatus({ status: "success", message: "Password reset successfully!" });
    } else {
      setStatus({ status: "fail", message: loginStatus.message });
    }
  } catch (err) {
    alert(err);
  }

  //------------------------------//
}
