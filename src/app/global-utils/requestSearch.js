export default async function requestSearch(input) {
  const params = input.value;

  const searchRes = await fetch(
    `${process.env.BACKEND}film/search?search=${params}`,
    {
      method: "GET",
    }
  );
  return searchRes.json();
}
