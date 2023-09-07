export default async function requestSearch(input) {
  const params = input.value;

  const searchRes = await fetch(
    `https://movieflix-ljqx.onrender.com/api/v1/film/search?search=${params}`,
    {
      method: "GET",
    }
  );
  return searchRes.json();
}
