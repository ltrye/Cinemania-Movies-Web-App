import Image from "next/image";
import Cookies from "js-cookie";
export default async function SaveList({ id }) {
  const res = await getList();
  const list = res.doc.film;
  console.log(list);
  return (
    <>
      <section className="profile-save-container">
        {list.map((el) => {
          return (
            <div className="save-element">
              <div className="save-image">
                <Image href={el.poster} />
              </div>
              <div className="save-description">{el.name}</div>
            </div>
          );
        })}
      </section>
    </>
  );
}

async function getList() {
  const list = await fetch(
    "https://movieflix-production.up.railway.app/api/v1/save/mySave",
    {
      headers:
        process.env.NODE_ENV === "development"
          ? {
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmMyZTQ3MWJiMWY3NDBkMDQyMWU0MSIsImlhdCI6MTY4NjQ5NTQ4MSwiZXhwIjoxNjkxNjc5NDgxfQ.EOKNcfJ9ebl0WymeRlZTtqni50VX941Grie_Abyn62I"}`,
            }
          : {},
      cache: "no-cache",
      method: "GET",
      credentials: "include",
      mode: "cors",
    }
  );
  return list.json();
}
