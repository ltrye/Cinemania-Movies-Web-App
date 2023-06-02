import Link from "next/link";
import "./page.scss";
import Image from "next/image";

export default function Result({ searchParams }) {
  const { status } = searchParams;
  if (status === "success")
    return (
      <section className="result-card">
        <section className="result-info">
          <h1 className="title result-title">
            THANK YOU FOR YOUR SUBSCRIPTION!
          </h1>
          <span className="useFont result-text">
            Product name: 1 month Premium{" "}
          </span>
          <span className="useFont result-text">Expired date: </span>
          <Link href="/">
            <button className="result-button">Continue</button>
          </Link>
        </section>
        <section className="result-image">
          <Image fill src="/ava-demo.jpg" />
        </section>
      </section>
    );
  else if (status === "fail")
    return (
      <section className="result-card">
        <h1 className="title result-title">
          SUBSCRIPTION FAIL! TRY AGAIN LATER.
        </h1>
        <Link href="/profile/premium">
          <button className="result-button">RETRY </button>
        </Link>
      </section>
    );
}
