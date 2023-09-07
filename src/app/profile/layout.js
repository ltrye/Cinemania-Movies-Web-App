"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import "./page.scss";
import { useEffect, useState } from "react";
import checkLogin from "../global-utils/checkLogin";
import { usePathname } from "next/navigation";
import ProfileCard from "./components/ProfileCard";

async function logout() {
  if (process.env.NODE_ENV === "development") Cookies.remove("jwt");
  // console.log(document.cookie);
  else {
    const res = await fetch(
      "https:///movieflix-ljqx.onrender.com/api/v1/user/logout",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );
  }
  window.location.href = "/user/login";
}

export default function Layout({ children }) {
  const [isLogged, setIsLogged] = useState({ status: undefined });
  useEffect(() => {
    //--FETCH USER DATA IF JWT VALID--//
    async function checkUserExist() {
      if (process.env.NODE_ENV === "development" && !Cookies.get("jwt"))
        return setIsLogged({ status: "fail" });
      const currentUser = await checkLogin();
      console.log(currentUser);
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
    <>
      {isLogged.status === "success" && (
        <ProfilePage children={children} data={isLogged} />
      )}
      {isLogged.status === "fail" && <Blank />}
    </>
  );
}

function ProfilePage({ data, children }) {
  const path = usePathname();

  return (
    <>
      <section className="profile-panel">
        <section className="profile-grid-container">
          {children}
          {path === "/profile" && <ProfileCard data={data} />}

          <div className="profile-line" />
          <div className="profile-picture">
            <Image alt="profile-picture" src={"/" + data.photo} fill />
          </div>
          <ul className="profile-navigation">
            <Link href="/profile">
              <button
                className={`profile-button ${path === "/profile" && "active"}`}
              >
                Personal info
              </button>
            </Link>
            <Link href="/profile/save">
              <button
                className={`profile-button ${
                  path === "/profile/save" && "active"
                }`}
              >
                Save list
              </button>
            </Link>
            <Link
              style={data.premium ? { pointerEvents: "none" } : {}}
              href="/premium"
            >
              <div className={`profile-button ${data.premium && "gold"}`}>
                {data.premium ? "Premium account" : "Upgrade to premium"}
              </div>
            </Link>
            <button onClick={logout} className="profile-button">
              Log out
            </button>
          </ul>
        </section>
      </section>
    </>
  );
}

function Blank() {
  return (
    <>
      <section className="profile-redirect">
        <Link href="/user/login">Login or create an account now</Link>
      </section>
    </>
  );
}
