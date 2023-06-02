"use client";
import Link from "next/link";
import { useState } from "react";

export default function PassChange() {
  const [isLoad, setLoad] = useState(false);
  const [status, setStatus] = useState({ status: null, message: null });

  return (
    <>
      <form onSubmit={(e) => ReAuth(e, setLoad, setStatus)}>
        <span className="title login-title">PASSWORD RECOVERY</span>
        <section className="login-input-group">
          <input placeholder="Email" className="login-input username"></input>
        </section>

        <button
          disabled={isLoad && true}
          className="login-submit"
          type="submit"
        >
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

async function ReAuth(e, setLoad, setStatus) {
  e.preventDefault();
  setStatus({ status: null, message: null });
  //---USER INPUT----//
  console.log(e.currentTarget);
  const account = {
    email: e.currentTarget.children[1].children[0].value,
  };

  //---REQUEST TO SERVER FOR TOKEN--//
  setLoad(true);
  try {
    const req = await fetch(
      "https://movieflix-production.up.railway.app/api/v1/user/forgotPassword",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify(account),
      }
    );
    const loginStatus = await req.json();
    setLoad(false);

    //--IF LOGIN SUCCESSFULLY--//
    if (loginStatus.status === "success") {
      setStatus({ status: "success", message: "Verification mail sent!" });
      //--IF LOGIN FAIL--------//
    } else {
      setStatus({ status: "fail", message: loginStatus.message });
    }
  } catch (err) {
    alert(err);
  }

  //------------------------------//
}
