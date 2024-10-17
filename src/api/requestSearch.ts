import { BACKEND } from "@/constant/AppConstant";

export default async function requestSearch(input) {
  const params = input.value;

  const searchRes = await fetch(
    `${BACKEND}/film/search?search=${params}`,
    {
      method: "GET",
    }
  );
  return searchRes.json();
}
