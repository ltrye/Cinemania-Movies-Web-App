"use client";
import "./style/page.scss";

import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

function checkRoute(path) {
  switch (path) {
    case "/user/login":
      return "login";
    case "/user/signup":
      return "signup";
    case "/user/reauth":
      return "reauth";
  }
}
export default function Layout({ children }) {
  const path = usePathname();
  const option = checkRoute(path);
  console.log(path);

  return (
    <div className="login-background">
      <section
        className={`login-section ${option === "signup" && "extend"}  ${
          option === "reauth" && "shrink"
        }`}
      >
        {children}
      </section>
    </div>
  );
}
