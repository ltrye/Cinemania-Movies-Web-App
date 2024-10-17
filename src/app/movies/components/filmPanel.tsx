import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";

function Film({ name, slug }) {
  return (
    <article className="film-el">
      <Link prefetch={false} href={`/title/${slug}`}>
        <div className="film-panel-image">
          <Image alt="film" fill src="/poster-demo.jpg" />
        </div>

        <div>{name}</div>
      </Link>
    </article>
  );
}

export default function FilmPanel({ pageNumber, filmList }) {
  return (
    <>
      <div className="series-section-title">
        {"Series - " + "page " + pageNumber}
        <hr style={{ margin: "1rem 0" }} />
      </div>

      <section className="film-panel">
        <section className="all-film">
          <section className="advance-sort">
            <div className="sort-flex-container">
              <div>Bộ lọc nâng cao</div>
              <div className="sort-el">
                Thể loại
                <AiFillCaretDown />
              </div>
              <div className="sort-el">
                Năm ra mắt
                <AiFillCaretDown />
              </div>
              <div className="sort-el">
                Quốc gia
                <AiFillCaretDown />
              </div>
              <button className="sort-el submit">
                {"Sort " + "  " + " >>"}
              </button>
            </div>
            <hr></hr>
          </section>

          <div className="film-order">
            <span style={{ marginRight: "2rem" }}>Sap xep</span>
            <span className="order-option">Ngay ra mat</span>
            <span className="order-option">Cao den thap</span>
          </div>
          <section className="all-film-container">
            {filmList.map((el, index) => {
              return (
                <>
                  <Film name={el.name} slug={el.slug} />
                </>
              );
            })}
          </section>
          <div className="all-film-paging">
            {[...Array(3)].map((el, index) => {
              return (
                <Link
                  key={index}
                  href={`/movies/${index === 0 ? "" : `page/${index + 1}`}`}
                  style={{
                    backgroundColor: `${
                      index === pageNumber - 1 && "var(--green-pallete)"
                    }`,
                  }}
                ></Link>
              );
            })}
          </div>
        </section>
        {/* //--BANG XEP HANG--// */}
        <section className="ranking">
          <div>Bang xep hang</div>
        </section>
      </section>
    </>
  );
}
