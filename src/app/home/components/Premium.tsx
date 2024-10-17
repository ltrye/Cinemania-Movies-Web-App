import Link from "next/link";

export default function Premium() {
  return (
    <>
      <section className="premium-holder">
        <div className="filter" />
        <span className="premium-text">
          Remove all ads for only <span className="highlight"> $1 </span>/
          month! Limited deal
          <span className="highlight"> 00:30:00 </span> left
        </span>
        <Link href="/profile/premium">
          <button className="premium-button">Purchase</button>
        </Link>
        <button className="premium-button">Learn more</button>
      </section>
    </>
  );
}
