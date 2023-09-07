import "./style/page.scss";
import Image from "next/image";
import PayButton from "@/app/global-utils/stripe";
export default function Premium() {
  return (
    <>
      <section className="product-container">
        <section className="product-description">
          <Image
            alt="product-preview"
            priority
            src="/bggrad.jpg"
            fill
            className="product-bg"
          />
          GOI PREMIUM CINEMANIA 1 THANG
          <div className="product-info">
            Chi tiet: <br />
            - Chat luong hon netflix
            <br />
            - Khong gioi han luu phim <br />
            - Bao hanh den chet <br />
            <span className="product-price"> 10.000$ / day</span>
          </div>
          <PayButton />
        </section>
        <div className="product-image">
          <Image priority alt="product" src="/loginbg.jpg" fill />
        </div>
      </section>
    </>
  );
}
