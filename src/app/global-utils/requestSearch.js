export default async function requestSearch(e) {
  e.preventDefault();
  const params = e.currentTarget.children[0].value;
  const searchRes = await fetch(
    `https://movieflix-production.up.railway.app/api/v1/film/search?search=${params}`,
    {
      method: "GET",
    }
  );
  return searchRes.json();
}
