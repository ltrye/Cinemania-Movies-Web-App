import Image from "next/image";

export default function SaveList({ id }) {
  console.log(id);
  return (
    <>
      <section className="profile-save-container">
        {[...Array(6)].map((el) => {
          return (
            <div className="save-element">
              <div className="save-image">
                <Image />
              </div>
              <div className="save-description"></div>
            </div>
          );
        })}
      </section>
    </>
  );
}
