"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import "./page.scss";
import { useEffect, useState } from "react";
import checkLogin from "../global-utils/checkLogin";

export default async function Page() {
  const [isLogged, setIsLogged] = useState({ status: undefined });
  useEffect(() => {
    //--FETCH USER DATA IF JWT VALID--//
    async function check() {
      if (process.env.NODE_ENV === "development" && !Cookies.get("jwt"))
        return setIsLogged({ status: "fail" });
      const currentUser = await checkLogin();
      console.log(currentUser);
      if (currentUser.status === "fail") setIsLogged({ status: "fail" });
      else if (currentUser.status === "success")
        setIsLogged({
          status: "success",
          name: currentUser.data.name,
          email: currentUser.data.email,
          premium: currentUser.data.premium,
        });
    }
    check();
  }, []);
  return (
    <>
      {isLogged.status === "success" && <ProfilePage data={isLogged} />}
      {isLogged.status === "fail" && <Blank />}
    </>
  );
}

function ProfilePage({ data }) {
  return (
    <>
      <section className="profile-panel">
        <div className="profile-picture">
          <Image alt="profile-picture" src="/ava-demo.jpg" fill />
        </div>
        <section className="profile-info title">
          {data.name}
          <br />
          {data.email}
        </section>

        <Link
          style={data.premium ? { pointerEvents: "none" } : {}}
          href="/profile/premium"
        >
          <div className="profile-logout profile-premium">
            {data.premium ? "Premium account" : "Upgrade to premium"}
          </div>
        </Link>
        <div
          onClick={async () => {
            if (process.env.NODE_ENV === "development") Cookies.remove("jwt");
            // console.log(document.cookie);
            const res = await fetch(
              "https://movieflix-production.up.railway.app/api/v1/user/logout",
              {
                method: "GET",
                credentials: "include",
                mode: "cors",
              }
            );
            window.location.href = "user/login";
          }}
          className="profile-logout"
        >
          Log out
        </div>
      </section>
    </>
  );
}

function Blank() {
  return (
    <>
      <section>
        <Link href="/user/login">
          <button className="profile-logout profile-redirect">
            Login or create an account now
          </button>
        </Link>
      </section>
    </>
  );
}
