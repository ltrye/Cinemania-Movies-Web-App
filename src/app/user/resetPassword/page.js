"use client";
import Link from "next/link";
import { useState } from "react";

export default function PassChange({ searchParams }) {
  const [isLoad, setLoad] = useState(false);
  const [status, setStatus] = useState({ status: null, message: null });
  console.log(status);
  return (
    <>
      <form
        onSubmit={(e) =>
          updatePassword(e, setLoad, setStatus, searchParams.token)
        }
      >
        <span className="title login-title">PASSWORD RECOVERY</span>
        <section className="login-input-group">
          <input
            placeholder="New password"
            className="login-input username"
          ></input>
          <input
            placeholder="ConfirmPassword"
            className="login-input username"
          ></input>
        </section>

        <button
          disabled={searchParams.token ? false : true}
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
            {status.message || "Error! Try again later"}
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
      `https:///movieflix-ljqx.onrender.com/resetPassword/${token}`,
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
