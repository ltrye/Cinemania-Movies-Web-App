"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import "./page.scss";
import { useEffect, useState } from "react";
import getUserInfo from "../../api/checkLogin";
import { usePathname } from "next/navigation";
import ProfileCard from "./components/ProfileCard";
import { useUserData } from "@/hook/useUserData";
import { logOut } from "@/api/UserAPI";
import LoadScreen from "../global-components/LoadScreen";

export default function Layout({ children }) {
  const [isLogged, setIsLogged] = useState({ status: undefined });
  const { userData, loading } = useUserData();

  return (
    <>
      {userData && (
        <ProfilePage data={isLogged} user={userData}>
          {children}
        </ProfilePage>
      )}
      {!userData && !loading && <Blank />}
      {loading && <LoadScreen />}
    </>
  );
}

function ProfilePage({ data, children, user }) {
  const path = usePathname();

  return (
    <>
      <section className="profile-panel">
        <section className="profile-grid-container">
          {children}
          {path === "/profile" && <ProfileCard data={user} />}

          <div className="profile-line" />
          <div className="profile-picture">
            <Image alt="profile-picture" src={"/demo-image.jpg"} fill />
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
              style={user.premium ? { pointerEvents: "none" } : {}}
              href="/premium"
            >
              <div className={`profile-button ${user.premium && "gold"}`}>
                {user.premium ? "Premium account" : "Upgrade to premium"}
              </div>
            </Link>
            <button onClick={logOut} className="profile-button">
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
