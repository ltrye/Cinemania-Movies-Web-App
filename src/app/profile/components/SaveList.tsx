import Image from "next/image";

export default function SaveList({ id }) {
  return (
    <>
      <section className="profile-save-container">
        {[...Array(6)].map((el, index) => {
          return (
            <div key={index} className="save-element">
              <div className="save-image">
                <Image src="" alt="save image" />
              </div>
              <div className="save-description"></div>
            </div>
          );
        })}
      </section>
    </>
  );
}
