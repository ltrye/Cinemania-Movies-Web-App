import "./style/page.scss";
import Image from "next/image";
import PayButton from "@/app/global-utils/stripe";
export default function Premium() {
  return (
    <>
      <section className="product-container">
        <section className="product-description">
          <Image priority src="/bggrad.jpg" fill className="product-bg" />
          GOI PREMIUM CINEMANIA 1 THANG
          <div className="product-info">
            Chi tiet: <br />
            - Khong quang cao
            <br />
            - Free hong ming <br />
            - Bao hanh tron doi <br />
            <span className="product-price"> 10.000 vnd / thang</span>
          </div>
          <PayButton />
        </section>
        <div className="product-image">
          <Image priority alt="product" src="/ava-demo.jpg" fill />
        </div>
      </section>
    </>
  );
}
