import Image from "next/image";
import { AiFillCaretDown } from "react-icons/ai";
export default function FilmPanel() {
  return (
    <>
      <div className="series-section-title">
        Series
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
            {[...Array(15)].map((el, index) => {
              return (
                <>
                  <div className="film-panel-image">
                    <Image fill src="/poster-demo.jpg" />
                  </div>
                </>
              );
            })}
          </section>
          <div className="all-film-paging"></div>
        </section>
        {/* //--BANG XEP HANG--// */}
        <section className="ranking">
          <div>Bang xep hang</div>
        </section>
      </section>
    </>
  );
}
