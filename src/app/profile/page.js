"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import "./page.scss";
import { useEffect, useState } from "react";

export default async function Page() {
  const [isLogged, setIsLogged] = useState(null);
  useEffect(() => {
    async function check() {
      console.log(document.cookie);
      const currentUser = await checkLoggin();
      console.log(currentUser.status);
      if (currentUser.status === "fail") setIsLogged("fail");
      else setIsLogged("success");
    }
    check();
  });
  return (
    <>
      {isLogged === "success" && <ProfilePage />}
      {isLogged === "fail" && <Blank />}
    </>
  );
}

async function checkLoggin() {
  const res = await fetch(
    "https://movieflix-production.up.railway.app/api/v1/user/me",
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  if (!res.ok) console.log("Error checking user! Try again later");
  return res.json();
}

function ProfilePage() {
  return (
    <>
      <section className="profile-panel">
        <div className="profile-picture">
          {/* <Image src="/ava-demo.jpg" fill /> */}
        </div>
        <section className="profile-info title">RAC HMM</section>
        <Link href="/profile/premium">
          <div className="profile-logout profile-premium">
            Upgrade to premium
          </div>
        </Link>
        <div
          onClick={async () => {
            // Cookies.remove("jwt");
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
